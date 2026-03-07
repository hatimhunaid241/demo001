"use server";

import sql from "@/lib/db";
import { auth } from "@/auth";
import { Resend } from "resend";
import { NewsletterEmail } from "@/components/emailTemplates/newsletter";
import { BASE_URL } from "@/config/site";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "Royal Chess Design Newsletter <newsletter@royalchessdesign.com>";

export async function sendNewsletter(prevState, formData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const subject = formData.get("subject")?.trim();
  const type = formData.get("type") || "Showcase";
  const intro = formData.get("intro")?.trim() || "";
  const chessSetIds = formData.getAll("chessSetIds");
  const recipientIds = formData.getAll("recipientIds");

  if (!subject) return { error: "Subject is required." };
  if (chessSetIds.length === 0) return { error: "Select at least one chess set." };
  if (recipientIds.length === 0) return { error: "Select at least one recipient." };

  // Fetch selected chess sets
  const chessSets = await sql`
    SELECT id, name, slug, image, description
    FROM "ChessSet"
    WHERE id = ANY(${chessSetIds})
    ORDER BY "order", "createdAt"
  `;

  // Fetch selected subscribers
  const subscribers = await sql`
    SELECT id, email FROM "Subscriber"
    WHERE id = ANY(${recipientIds}) AND status = 'active'
  `;

  if (subscribers.length === 0) {
    return { error: "No active subscribers found in your selection." };
  }

  let sent = 0;
  const errors = [];

  for (const sub of subscribers) {
    try {
      const unsubscribeUrl = `${BASE_URL}/subscription/cancel?id=${sub.id}`;
      await resend.emails.send({
        from: FROM,
        to: sub.email,
        subject,
        react: NewsletterEmail({ type, subject, intro, chessSets, unsubscribeUrl }),
      });
      sent++;
    } catch (err) {
      errors.push(sub.email);
      console.error(`[newsletter] Failed to send to ${sub.email}:`, err);
    }
  }

  return {
    success: true,
    sent,
    total: subscribers.length,
    errors,
  };
}
