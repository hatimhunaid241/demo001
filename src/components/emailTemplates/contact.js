// Royal Chess Design — Email Templates
// Inline styles required for broad email client compatibility

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
  body: {
    backgroundColor: brand.bg,
    margin: 0,
    padding: 0,
    fontFamily: brand.fontSerif,
  },
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
    padding: "40px 48px",
    textAlign: "center",
  },
  wordmark: {
    color: "#FAFAF8",
    fontFamily: brand.fontSerif,
    fontSize: "11px",
    letterSpacing: "0.5em",
    textTransform: "uppercase",
    margin: 0,
  },
  divider: {
    width: "60px",
    height: "1px",
    backgroundColor: brand.gold,
    border: "none",
    margin: "16px auto 0",
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
    margin: "0 0 20px",
  },
  heading: {
    color: brand.charcoal,
    fontFamily: brand.fontSerif,
    fontSize: "26px",
    fontWeight: "normal",
    letterSpacing: "0.1em",
    margin: "0 0 32px",
    lineHeight: "1.3",
  },
  fieldLabel: {
    color: brand.textMuted,
    fontFamily: brand.fontSerif,
    fontSize: "10px",
    letterSpacing: "0.35em",
    textTransform: "uppercase",
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
    border: `1px solid ${brand.border}`,
    padding: "24px 28px",
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
  footer: {
    borderTop: `1px solid ${brand.border}`,
    padding: "28px 48px",
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

// ─── Notification to the atelier ────────────────────────────────────────────
export function ContactHatim({ name, email, phone, subject, message }) {
  return (
    <div style={styles.outer}>
      <div style={styles.card}>
            {/* Header */}
            <div style={styles.header}>
              <p style={styles.wordmark}>Royal Chess Design</p>
              <div style={styles.divider} />
            </div>

            {/* Body */}
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

            {/* Footer */}
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
            {/* Header */}
            <div style={styles.header}>
              <p style={styles.wordmark}>Royal Chess Design</p>
              <div style={styles.divider} />
            </div>

            {/* Body */}
            <div style={styles.body_}>
              <p style={styles.eyebrow}>Thank You</p>
              <h1 style={styles.heading}>Your Enquiry Has Been Received</h1>

              <p style={{ ...styles.fieldValue, marginBottom: "32px" }}>
                Dear {name},
              </p>

              <p style={{ ...styles.messageText, fontStyle: "normal", marginBottom: "24px" }}>
                Thank you for reaching out to Royal Chess Design. We have received your message
                and David de Jong will give it his personal attention. We endeavour to respond
                within two business days.
              </p>

              <p style={styles.fieldLabel}>Your message</p>
              <div style={styles.messageBox}>
                <p style={styles.messageText}>{message}</p>
              </div>

              <p style={{ ...styles.messageText, fontStyle: "normal", marginTop: "16px" }}>
                We look forward to beginning a meaningful conversation with you.
              </p>

              <p style={{ ...styles.fieldValue, marginTop: "32px", marginBottom: 0 }}>
                With regards,
                <br />
                <span style={{ color: brand.gold, letterSpacing: "0.05em" }}>
                  David de Jong
                </span>
                <br />
                <span style={{ color: brand.textMuted, fontSize: "13px" }}>
                  Royal Chess Design
                </span>
              </p>
            </div>

            {/* Footer */}
            <div style={styles.footer}>
              <p style={styles.footerText}>
                Royal Chess Design &nbsp;·&nbsp;{" "}
                <a href="https://royalchessdesign.com" style={styles.link}>
                  royalchessdesign.com
                </a>
              </p>
              <p
                style={{
                  ...styles.footerText,
                  fontSize: "10px",
                  color: brand.textMuted,
                  marginTop: "8px",
                  letterSpacing: "0.1em",
                  textTransform: "none",
                }}>
                You are receiving this email because you submitted an enquiry through our website.
              </p>
            </div>
          </div>
        </div>
  );
}
