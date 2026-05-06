"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-tertiary transition-all duration-200";

export default function OfferForm({ domainName }: { domainName: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      type: "offer",
      domain: domainName,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      offer: (form.elements.namedItem("offer") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/submit-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || `Request failed (${res.status})`);
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center py-6">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent mb-3">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-base font-semibold mb-1">Offer submitted</h3>
        <p className="text-sm text-text-secondary">We&apos;ll respond within 48 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="offer-name" className="block text-sm font-medium text-text-secondary mb-2">
          Full Name
        </label>
        <input id="offer-name" name="name" type="text" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="offer-email" className="block text-sm font-medium text-text-secondary mb-2">
          Email
        </label>
        <input id="offer-email" name="email" type="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="offer-amount" className="block text-sm font-medium text-text-secondary mb-2">
          Offer Amount (USD)
        </label>
        <input id="offer-amount" name="offer" type="text" required placeholder="$5,000" className={inputClass} />
      </div>
      <div>
        <label htmlFor="offer-message" className="block text-sm font-medium text-text-secondary mb-2">
          Message <span className="text-text-tertiary font-normal">(optional)</span>
        </label>
        <textarea id="offer-message" name="message" rows={3} className={inputClass} />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-bg hover:bg-accent-dim disabled:opacity-50 transition-colors"
      >
        {status === "sending" ? "Submitting..." : "Submit Offer"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-400 text-center">
          {errorMsg || "Something went wrong. Please try again."}
        </p>
      )}
    </form>
  );
}
