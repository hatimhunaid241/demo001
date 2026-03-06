"use server";

import { ContactClient, ContactHatim } from "@/components/emailTemplates/contact";
import { sendContactMessageValidation } from "@/lib/contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactMessage(state, formData) {
    // Honeypot fields (should be empty if human)
    const honeypotName = formData.get("name");
    const honeypotEmail = formData.get("email");
    const honeypotMessage = formData.get("message");
    if (honeypotName || honeypotEmail || honeypotMessage) {
        return {};
    }

    // Timer field (elapsed time in seconds)
    const elapsedRaw = formData.get("elapsed");
    const elapsed = typeof elapsedRaw === "string" ? parseFloat(elapsedRaw) : null;
    if (!elapsed || (!isNaN(elapsed) && elapsed < 2)) {
        return {};
    }

    // Real fields (obfuscated names)
    const eman = formData.get("eman");
    const liame = formData.get("liame");
    const egassem = formData.get("egassem");
    const phone = formData.get("phone") || "";
    const subject = formData.get("subject") || "";

    const validatedFields = sendContactMessageValidation.safeParse({
        name: eman,
        email: liame,
        message: egassem,
    });
    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        return {
            errors: {
                name: fieldErrors.name,
                email: fieldErrors.email,
                message: fieldErrors.message,
            },
        };
    }
    const { name, email, message } = validatedFields.data;
    console.log("[contact] Validation passed", { name, email });

    console.log("[contact] Attempting to send emails", { name, email, subject });
    console.log("[contact] RESEND_API_KEY present:", !!process.env.RESEND_API_KEY);

    try {
        const r1 = await resend.emails.send({
            from: "info@royalchessdesign.com",
            to: "motleydesign@gmail.com",
            subject: subject ? `Enquiry: ${subject}` : "New Enquiry — Royal Chess Design",
            react: ContactHatim({ name, email, phone, subject, message }),
        });
        console.log("[contact] Atelier email result:", JSON.stringify(r1));

        const r2 = await resend.emails.send({
            from: "info@royalchessdesign.com",
            to: email,
            subject: "Thank You for Your Enquiry — Royal Chess Design",
            react: ContactClient({ name, email, message }),
        });
        console.log("[contact] Client email result:", JSON.stringify(r2));

        return { success: true, message: "Your enquiry has been received. We will be in touch shortly." };
    } catch (err) {
        console.error("[contact] Email send error:", err);
        return { success: false, message: "Something went wrong. Please try again later." };
    }
}