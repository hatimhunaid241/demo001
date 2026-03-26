// Royal Chess Design — Shared Email Template Primitives
// Inline styles required for broad email client compatibility

// export const LOGO_URL = "https://exyrxjlxax0fnljb.public.blob.vercel-storage.com/email_logo.png";
export const LOGO_URL = "https://raw.githubusercontent.com/hatimhunaid241/demo001/refs/heads/main/public/email_logo.png";

export const brand = {
  bg: "#FAFAF8",
  surface: "#FFFFFF",
  charcoal: "#1A1A1A",
  gold: "#181985",
  textSecondary: "#555555",
  textMuted: "#888888",
  border: "#E8E8E3",
  fontSerif: "Georgia, 'Times New Roman', serif",
};

// Shared layout & typographic tokens
export const t = {
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
  body: {
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
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: brand.border,
    border: "none",
    margin: "36px 0",
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
  footerNote: {
    color: brand.textMuted,
    fontFamily: brand.fontSerif,
    fontSize: "10px",
    letterSpacing: "0.05em",
    margin: "8px 0 0",
    lineHeight: "1.6",
  },
  link: {
    color: brand.gold,
    textDecoration: "none",
  },
};

// ── Shared components ─────────────────────────────────────────────────────────

export function EmailHeader() {
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

/** Outer wrapper: cream background + white card + logo header */
export function EmailWrapper({ children }) {
  return (
    <div style={t.outer}>
      <div style={t.card}>
        <EmailHeader />
        {children}
      </div>
    </div>
  );
}

/** Body padding container */
export function EmailBody({ children }) {
  return <div style={t.body}>{children}</div>;
}

export function Eyebrow({ children }) {
  return <p style={t.eyebrow}>{children}</p>;
}

export function Heading({ children }) {
  return <h1 style={t.heading}>{children}</h1>;
}

// ── Contact-specific styles ───────────────────────────────────────────────────
export const contact = {
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
};

// ── Newsletter-specific styles ────────────────────────────────────────────────
export const newsletter = {
  bodyText: {
    color: brand.textSecondary,
    fontFamily: brand.fontSerif,
    fontSize: "15px",
    lineHeight: "1.8",
    margin: "0 0 32px",
  },
  btn: {
    display: "inline-block",
    backgroundColor: brand.charcoal,
    color: "#FAFAF8",
    fontFamily: brand.fontSerif,
    fontSize: "11px",
    letterSpacing: "0.35em",
    textTransform: "uppercase",
    textDecoration: "none",
    padding: "14px 32px",
  },
  btnGold: {
    display: "inline-block",
    backgroundColor: brand.gold,
    color: "#FAFAF8",
    fontFamily: brand.fontSerif,
    fontSize: "11px",
    letterSpacing: "0.35em",
    textTransform: "uppercase",
    textDecoration: "none",
    padding: "12px 28px",
  },
  chessSetCard: {
    marginBottom: "36px",
    borderBottom: `1px solid ${brand.border}`,
    paddingBottom: "36px",
  },
  chessSetImg: {
    display: "block",
    width: "100%",
    objectFit: "contain",
    marginBottom: "20px",
  },
  chessSetName: {
    color: brand.charcoal,
    fontFamily: brand.fontSerif,
    fontSize: "20px",
    fontWeight: "normal",
    letterSpacing: "0.1em",
    margin: "0 0 10px",
  },
  chessSetDesc: {
    color: brand.textSecondary,
    fontFamily: brand.fontSerif,
    fontSize: "14px",
    lineHeight: "1.7",
    margin: "0 0 20px",
  },
};

/**
 * Standard footer with brand line + optional secondary note.
 * @param {string}           href      – href for the main footer anchor
 * @param {string}           linkLabel – visible text for that anchor
 * @param {React.ReactNode}  [note]    – optional second line (pass a <p> with t.footerNote style)
 */
export function EmailFooter({ href, linkLabel, note }) {
  return (
    <div style={t.footer}>
      <p style={t.footerText}>
        Royal Chess Design &nbsp;·&nbsp;{" "}
        <a href={href} style={t.link}>{linkLabel}</a>
      </p>
      {note}
    </div>
  );
}
