import { Suspense } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import WelcomeContent from "@/components/WelcomeContent";

export default async function WelcomePage({ searchParams }) {
  const { next = "/" } = await searchParams;
  const cookieStore = await cookies();
  const hasConsent = cookieStore.has("cookie_consent");

  if (hasConsent) {
    redirect(next);
  }

  async function saveConsent(value) {
    "use server";
    const store = await cookies();
    store.set("cookie_consent", value, {
      path: "/",
      maxAge: 60 * 60 * 24 * 3,
      sameSite: "lax",
    });
    redirect(next);
  }

  return (
    <Suspense>
      <WelcomeContent saveConsent={saveConsent} />
    </Suspense>
  );
}
