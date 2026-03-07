// Royal Chess Design — Newsletter Email Templates
// Inline styles required for broad email client compatibility

import { BASE_URL } from "@/config/site";
import { t, newsletter, EmailWrapper, EmailBody, EmailFooter, Eyebrow, Heading } from "./shared";

function NewsletterFooterNote({ unsubscribeUrl }) {
  return (
    <p style={t.footerNote}>
      You are receiving this because you subscribed at royalchessdesign.com.{" "}
      <a href={unsubscribeUrl} style={t.link}>Unsubscribe</a>
    </p>
  );
}

// ─── Subscription Confirmation (double opt-in) ────────────────────────────────
export function SubscriptionConfirmation({ email, confirmUrl }) {
  return (
    <EmailWrapper>
      <EmailBody>
        <Eyebrow>Newsletter</Eyebrow>
        <Heading>Please Confirm Your Subscription</Heading>
        <p style={newsletter.bodyText}>
          You have requested to receive updates from Royal Chess Design. To complete your subscription,
          please click the button below to confirm your email address.
        </p>
        <p style={{ textAlign: "center", margin: "0 0 32px" }}>
          <a href={confirmUrl} style={newsletter.btn}>CONFIRM SUBSCRIPTION</a>
        </p>
        <p style={{ ...newsletter.bodyText, fontSize: "13px", marginBottom: "0" }}>
          If you did not sign up, you can safely ignore this email — you will not be subscribed.
        </p>
      </EmailBody>
      <EmailFooter
        href={BASE_URL}
        linkLabel="royalchessdesign.com"
        note={<p style={t.footerNote}>This confirmation email was sent to {email}.</p>}
      />
    </EmailWrapper>
  );
}

// ─── Welcome (after confirming) ───────────────────────────────────────────────
export function SubscriptionWelcome({ unsubscribeUrl }) {
  return (
    <EmailWrapper>
      <EmailBody>
        <Eyebrow>Welcome</Eyebrow>
        <Heading>You Are Now Subscribed</Heading>
        <p style={newsletter.bodyText}>
          Thank you for subscribing to Royal Chess Design. You will receive occasional updates
          featuring new collections, showcases, and exclusive behind-the-scenes insights.
        </p>
        <p style={{ textAlign: "center", margin: "0 0 32px" }}>
          <a href={`${BASE_URL}/portfolio`} style={newsletter.btn}>EXPLORE THE COLLECTION</a>
        </p>
      </EmailBody>
      <EmailFooter
        href={BASE_URL}
        linkLabel="royalchessdesign.com"
        note={<NewsletterFooterNote unsubscribeUrl={unsubscribeUrl} />}
      />
    </EmailWrapper>
  );
}

// ─── Newsletter Email ──────────────────────────────────────────────────────────
const TYPE_LABELS = {
  "New Collection": "New Collection",
  Showcase: "Showcase",
  Reminder: "Reminder",
};

export function NewsletterEmail({ type, subject, intro, chessSets, unsubscribeUrl }) {
  const typeLabel = TYPE_LABELS[type] || type;

  return (
    <EmailWrapper>
      <EmailBody>
        <Eyebrow>{typeLabel}</Eyebrow>
        <Heading>{subject}</Heading>

        {intro && <p style={newsletter.bodyText}>{intro}</p>}

        <hr style={t.divider} />

        {chessSets.map((set, i) => (
          <div key={set.id} style={i === chessSets.length - 1 ? { marginBottom: "36px" } : newsletter.chessSetCard}>
            {set.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={set.image} alt={set.name} style={newsletter.chessSetImg} />
            )}
            <p style={newsletter.chessSetName}>{set.name}</p>
            {set.description && <p style={newsletter.chessSetDesc}>{set.description}</p>}
            <a href={`${BASE_URL}/portfolio/${set.slug}`} style={newsletter.btnGold}>
              VIEW SET
            </a>
          </div>
        ))}

        <hr style={t.divider} />

        <p style={{ ...newsletter.bodyText, marginBottom: "0", textAlign: "center" }}>
          <a href={`${BASE_URL}/portfolio`} style={t.link}>
            Explore the full collection
          </a>
        </p>
      </EmailBody>
      <EmailFooter
        href={BASE_URL}
        linkLabel="royalchessdesign.com"
        note={<NewsletterFooterNote unsubscribeUrl={unsubscribeUrl} />}
      />
    </EmailWrapper>
  );
}
