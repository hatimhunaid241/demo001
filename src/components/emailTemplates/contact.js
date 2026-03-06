// Royal Chess Design — Email Templates
// Inline styles required for broad email client compatibility

const LOGO_URL = "https://exyrxjlxax0fnljb.public.blob.vercel-storage.com/email_logo.png";

const brand = {
  bg: "#FAFAF8",
  surface: "#FFFFFF",
  charcoal: "#1A1A1A",
  gold: "#181985",
  textSecondary: "#555555",
  textMuted: "#888888",
  border: "#E8E8E3",
  fontSerif: "Georgia, 'Times New Roman', serif",
};

const styles = {
  outer: {
    backgroundColor: brand.bg,
    padding: "48px 24px",
  },
  card: {
    backgroundColor: brand.surface,
    maxWidth: "600px",
    margin: "0 auto",
    border: `1px solid ${brand.border}`,
  },
  header: {
    backgroundColor: brand.charcoal,
    padding: "40px 48px 36px",
    textAlign: "center",
  },
  logo: {
    display: "block",
    margin: "0 auto 20px",
  },
  dividerTop: {
    width: "40px",
    height: "1px",
    backgroundColor: "rgba(255,255,255,0.15)",
    border: "none",
    margin: "0 auto 20px",
  },
  wordmark: {
    color: "#FAFAF8",
    fontFamily: brand.fontSerif,
    fontSize: "11px",
    letterSpacing: "0.6em",
    textTransform: "uppercase",
    margin: "0 0 16px",
  },
  dividerGold: {
    width: "50px",
    height: "1px",
    backgroundColor: brand.gold,
    border: "none",
    margin: "0 auto",
  },
  body_: {
    padding: "48px 48px 40px",
  },
  eyebrow: {
    color: brand.gold,
    fontFamily: brand.fontSerif,
    fontSize: "11px",
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    margin: "0 0 16px",
  },
  heading: {
    color: brand.charcoal,
    fontFamily: brand.fontSerif,
    fontSize: "26px",
    fontWeight: "normal",
    letterSpacing: "0.08em",
    margin: "0 0 36px",
    lineHeight: "1.3",
  },
  fieldLabel: {
    color: brand.textMuted,
    fontFamily: brand.fontSerif,
    fontSize: "10px",
    letterSpacing: "0.2em",
    textTransform: "titlecase",
    margin: "0 0 6px",
    display: "block",
  },
  fieldValue: {
    color: brand.charcoal,
    fontFamily: brand.fontSerif,
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "0 0 28px",
  },
  messageBox: {
    backgroundColor: brand.bg,
    borderLeft: `2px solid ${brand.gold}`,
    padding: "14px 18px",
    margin: "0 0 28px",
  },
  messageText: {
    color: brand.textSecondary,
    fontFamily: brand.fontSerif,
    fontSize: "15px",
    lineHeight: "1.8",
    margin: 0,
    fontStyle: "italic",
  },
  signoff: {
    borderTop: `1px solid ${brand.border}`,
    marginTop: "36px",
    paddingTop: "28px",
  },
  footer: {
    backgroundColor: brand.bg,
    borderTop: `1px solid ${brand.border}`,
    padding: "24px 48px",
    textAlign: "center",
  },
  footerText: {
    color: brand.textMuted,
    fontFamily: brand.fontSerif,
    fontSize: "11px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    margin: 0,
    lineHeight: "1.8",
  },
  link: {
    color: brand.gold,
    textDecoration: "none",
  },
};

function EmailHeader() {
  return (
    <div style={{ padding: "32px 40px 0" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_URL}
        alt="Royal Chess Design"
        style={{ display: "block", width: "100%", maxWidth: "400px" }}
      />
    </div>
  );
}

// ─── Notification to the atelier ────────────────────────────────────────────
export function ContactHatim({ name, email, phone, subject, message }) {
  return (
    <div style={styles.outer}>
      <div style={styles.card}>
        <EmailHeader />

        <div style={styles.body_}>
          <p style={styles.eyebrow}>New Enquiry</p>
          <h1 style={styles.heading}>A Message Has Arrived</h1>

          <p style={styles.fieldLabel}>From</p>
          <p style={styles.fieldValue}>{name}</p>

          <p style={styles.fieldLabel}>Email</p>
          <p style={styles.fieldValue}>
            <a href={`mailto:${email}`} style={styles.link}>{email}</a>
          </p>

          {phone && (
            <>
              <p style={styles.fieldLabel}>Phone</p>
              <p style={styles.fieldValue}>{phone}</p>
            </>
          )}

          {subject && (
            <>
              <p style={styles.fieldLabel}>Subject</p>
              <p style={styles.fieldValue}>{subject}</p>
            </>
          )}

          <p style={styles.fieldLabel}>Message</p>
          <div style={styles.messageBox}>
            <p style={styles.messageText}>{message}</p>
          </div>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Royal Chess Design &nbsp;·&nbsp;{" "}
            <a href="mailto:info@royalchessdesign.com" style={styles.link}>
              info@royalchessdesign.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Confirmation to the enquirer ────────────────────────────────────────────
export function ContactClient({ name, message }) {
  return (
    <div style={styles.outer}>
      <div style={styles.card}>
        <EmailHeader />

        <div style={styles.body_}>
          <p style={styles.eyebrow}>Thank You</p>
          <h1 style={styles.heading}>Your Enquiry Has Been Received</h1>

          <p style={{ ...styles.fieldValue, marginBottom: "8px" }}>Dear {name},</p>

          <p style={{ ...styles.messageText, fontStyle: "normal", marginBottom: "8px", color: brand.textSecondary }}>
            Thank you for your message and for showing interest in Royal Chess Design. <br />
          </p>
          <p style={{ ...styles.messageText, fontStyle: "normal", marginBottom: "32px", color: brand.textSecondary }}>
            Your enquiry will receive my personal attention, and I will respond to you shortly. <br />
          </p>

          <p style={styles.fieldLabel}>A copy of your message:</p>
          <div style={styles.messageBox}>
            <p style={styles.messageText}>{message}</p>
          </div>

          <p style={{ ...styles.messageText, fontStyle: "normal", color: brand.textSecondary }}>
            I look forward to beginning a meaningful conversation with you.
          </p>

          <div style={styles.signoff}>
            <p style={{ ...styles.fieldValue, marginBottom: "4px" }}>With kind regards,</p>
            <p style={{ fontFamily: brand.fontSerif, fontSize: "17px", color: brand.charcoal, margin: "0 0 4px", letterSpacing: "0.05em" }}>
              David de Jong
            </p>
            <p style={{ fontFamily: brand.fontSerif, fontSize: "11px", color: brand.textMuted, margin: 0, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              Royal Chess Design
            </p>
          </div>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Royal Chess Design &nbsp;·&nbsp;{" "}
            <a href="https://royalchessdesign.com" style={styles.link}>
              royalchessdesign.com
            </a>
          </p>
          <p style={{ ...styles.footerText, fontSize: "10px", marginTop: "8px", letterSpacing: "0.05em", textTransform: "none" }}>
            You are receiving this email because you submitted an enquiry through our website.
          </p>
        </div>
      </div>
    </div>
  );
}
