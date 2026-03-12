import { Suspense } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getSiteContent } from "@/lib/site-content";
import WelcomeContent from "@/components/site/WelcomeContent";

export default async function WelcomePage({ searchParams }) {
  const { next = "/" } = await searchParams;
  const cookieStore = await cookies();
  const hasConsent = cookieStore.has("cookie_consent");

  if (hasConsent) {
    redirect(next);
  }

  const content = await getSiteContent("welcome");

  async function saveConsent(value) {
    "use server";
    const store = await cookies();
    store.set("cookie_consent", value, {
      path: "/",
      maxAge: 60 * 60 * 24 * 1,
      sameSite: "lax",
    });
    redirect(next);
  }

  return (
    <Suspense>
      <WelcomeContent saveConsent={saveConsent} content={content} />
    </Suspense>
  );
}
