"use client";

import { useActionState } from "react";
import { subscribe } from "@/actions/newsletter";

const initialState = null;

export default function SubscribeForm() {
  const [state, action, pending] = useActionState(subscribe, initialState);

  if (state?.success) {
    return (
      <p className="font-(family-name:--font-cormorant) text-[14px] leading-relaxed text-text-muted text-center">
        A confirmation email is on its way — please check your inbox to complete your subscription.
      </p>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <form action={action} className="flex flex-col sm:flex-row gap-0">
        <input
          type="email"
          name="email"
          required
          placeholder="Your email address"
          className="flex-1 bg-transparent border-b border-medium-gray pb-2 pt-1 text-charcoal font-(family-name:--font-cormorant) text-base placeholder:text-text-muted/40 focus:outline-none focus:border-gold transition-colors duration-300 min-w-0"
        />
        <button
          type="submit"
          disabled={pending}
          className="mt-4 sm:mt-0 sm:ml-6 font-(family-name:--font-playfair) text-[10px] tracking-[0.3em] text-charcoal hover:text-gold disabled:opacity-50 transition-colors duration-300 whitespace-nowrap pb-2 pt-1"
        >
          {pending ? "SUBSCRIBING…" : "SUBSCRIBE →"}
        </button>
      </form>

      {state?.error && (
        <p className="font-(family-name:--font-cormorant) text-sm text-red-500 mt-3">{state.error}</p>
      )}

      <p className="font-(family-name:--font-cormorant) text-sm leading-relaxed text-text-muted/60 text-center mt-4">
        By subscribing you agree to receive occasional updates from Royal Chess Design.
        You may unsubscribe at any time.
      </p>
    </div>
  );
}
