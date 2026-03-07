// Royal Chess Design — Contact Email Templates
// Inline styles required for broad email client compatibility

import { brand, t, contact, EmailWrapper, EmailBody, EmailFooter, Eyebrow, Heading } from "./shared";

// ─── Notification to the atelier ────────────────────────────────────────────
export function ContactHatim({ name, email, phone, subject, message }) {
  return (
    <EmailWrapper>
      <EmailBody>
        <Eyebrow>New Enquiry</Eyebrow>
        <Heading>A Message Has Arrived</Heading>

        <p style={contact.fieldLabel}>From</p>
        <p style={contact.fieldValue}>{name}</p>

        <p style={contact.fieldLabel}>Email</p>
        <p style={contact.fieldValue}>
          <a href={`mailto:${email}`} style={t.link}>{email}</a>
        </p>

        {phone && (
          <>
            <p style={contact.fieldLabel}>Phone</p>
            <p style={contact.fieldValue}>{phone}</p>
          </>
        )}

        {subject && (
          <>
            <p style={contact.fieldLabel}>Subject</p>
            <p style={contact.fieldValue}>{subject}</p>
          </>
        )}

        <p style={contact.fieldLabel}>Message</p>
        <div style={contact.messageBox}>
          <p style={contact.messageText}>{message}</p>
        </div>
      </EmailBody>
      <EmailFooter
        href="mailto:info@royalchessdesign.com"
        linkLabel="info@royalchessdesign.com"
      />
    </EmailWrapper>
  );
}

// ─── Confirmation to the enquirer ────────────────────────────────────────────
export function ContactClient({ name, message }) {
  return (
    <EmailWrapper>
      <EmailBody>
        <Eyebrow>Thank You</Eyebrow>
        <Heading>Your Enquiry Has Been Received</Heading>

        <p style={{ ...contact.fieldValue, marginBottom: "8px" }}>Dear {name},</p>

        <p style={{ ...contact.messageText, fontStyle: "normal", marginBottom: "8px", color: brand.textSecondary }}>
          Thank you for your message and for showing interest in Royal Chess Design. <br />
        </p>
        <p style={{ ...contact.messageText, fontStyle: "normal", marginBottom: "32px", color: brand.textSecondary }}>
          Your enquiry will receive my personal attention, and I will respond to you shortly. <br />
        </p>

        <p style={contact.fieldLabel}>A copy of your message:</p>
        <div style={contact.messageBox}>
          <p style={contact.messageText}>{message}</p>
        </div>

        <p style={{ ...contact.messageText, fontStyle: "normal", color: brand.textSecondary }}>
          I look forward to beginning a meaningful conversation with you.
        </p>

        <div style={contact.signoff}>
          <p style={{ ...contact.fieldValue, marginBottom: "4px" }}>With kind regards,</p>
          <p style={{ fontFamily: brand.fontSerif, fontSize: "17px", color: brand.charcoal, margin: "0 0 4px", letterSpacing: "0.05em" }}>
            David de Jong
          </p>
          <p style={{ fontFamily: brand.fontSerif, fontSize: "11px", color: brand.textMuted, margin: 0, letterSpacing: "0.25em", textTransform: "uppercase" }}>
            Royal Chess Design
          </p>
        </div>
      </EmailBody>
      <EmailFooter
        href="https://royalchessdesign.com"
        linkLabel="royalchessdesign.com"
        note={
          <p style={t.footerNote}>
            You are receiving this email because you submitted an enquiry through our website.
          </p>
        }
      />
    </EmailWrapper>
  );
}
