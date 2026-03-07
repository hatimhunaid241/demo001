"use server";

import sql from "@/lib/db";
import { Resend } from "resend";
import { SubscriptionConfirmation, SubscriptionWelcome } from "@/components/emailTemplates/newsletter";
import { BASE_URL } from "@/config/site";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "Royal Chess Design Newsletter <newsletter@royalchessdesign.com>";

// ── Subscribe ────────────────────────────────────────────────────────────────
// Called from footer form via useActionState
export async function subscribe(prevState, formData) {
  const raw = typeof formData === "string" ? formData : formData.get("email");
  const email = (raw ?? "").trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  // Check existing subscriber
  const [existing] = await sql`
    SELECT id, status FROM "Subscriber" WHERE email = ${email} LIMIT 1
  `;

  if (existing) {
    if (existing.status === "active") {
      return { error: "This email address is already subscribed to our newsletter." };
    }
    if (existing.status === "pending") {
      // Delete stale pending row and re-insert to get a fresh confirmation link
      await sql`DELETE FROM "Subscriber" WHERE id = ${existing.id}`;
      const [{ id: newId }] = await sql`
        INSERT INTO "Subscriber" (email) VALUES (${email}) RETURNING id
      `;
      await sendConfirmationEmail(email, newId);
      return { success: true };
    }
    // Was unsubscribed — reactivate as pending
    await sql`
      UPDATE "Subscriber" SET status = 'pending', "subscribedAt" = NULL
      WHERE id = ${existing.id}
    `;
    await sendConfirmationEmail(email, existing.id);
    return { success: true };
  }

  // New subscriber
  const [{ id }] = await sql`
    INSERT INTO "Subscriber" (email) VALUES (${email}) RETURNING id
  `;

  await sendConfirmationEmail(email, id);
  return { success: true };
}

async function sendConfirmationEmail(email, id) {
  const confirmUrl = `${BASE_URL}/subscription/confirm?id=${id}`;
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Confirm Your Subscription — Royal Chess Design",
    react: SubscriptionConfirmation({ email, confirmUrl }),
  });
}

// ── Confirm ──────────────────────────────────────────────────────────────────
export async function confirmSubscription(id) {
  if (!id) return { error: "Invalid link." };

  const [subscriber] = await sql`
    SELECT id, email, status FROM "Subscriber" WHERE id = ${id} LIMIT 1
  `;

  if (!subscriber) return { error: "Subscription not found." };
  if (subscriber.status === "active") return { alreadyConfirmed: true };

  await sql`
    UPDATE "Subscriber"
    SET status = 'active', "subscribedAt" = NOW()
    WHERE id = ${id}
  `;

  // Send welcome email (best-effort)
  try {
    await resend.emails.send({
      from: FROM,
      to: subscriber.email,
      subject: "Welcome to Royal Chess Design",
      react: SubscriptionWelcome({ email: subscriber.email, unsubscribeUrl: `${BASE_URL}/subscription/cancel?id=${id}` }),
    });
  } catch (err) {
    console.error("[newsletter] Welcome email error:", err);
  }

  return { success: true };
}

// ── Unsubscribe ──────────────────────────────────────────────────────────────
export async function unsubscribeUser(id) {
  if (!id) return { error: "Invalid link." };

  const [subscriber] = await sql`
    SELECT id, status FROM "Subscriber" WHERE id = ${id} LIMIT 1
  `;

  if (!subscriber) return { error: "Subscription not found." };
  if (subscriber.status === "unsubscribed") return { alreadyUnsubscribed: true };

  await sql`
    UPDATE "Subscriber" SET status = 'unsubscribed' WHERE id = ${id}
  `;

  return { success: true };
}
