"use client";

import { useState } from "react";

export default function OfferForm({ domainName }: { domainName: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
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
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-4 text-center text-sm text-emerald-700 dark:text-emerald-300">
        Thank you! We&apos;ll review your offer and respond within 48 hours.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="offer-name" className="block text-sm font-medium mb-1">
          Full Name
        </label>
        <input
          id="offer-name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div>
        <label htmlFor="offer-email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="offer-email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div>
        <label htmlFor="offer-amount" className="block text-sm font-medium mb-1">
          Offer Amount (USD)
        </label>
        <input
          id="offer-amount"
          name="offer"
          type="text"
          required
          placeholder="$5,000"
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div>
        <label htmlFor="offer-message" className="block text-sm font-medium mb-1">
          Message (optional)
        </label>
        <textarea
          id="offer-message"
          name="message"
          rows={3}
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
      >
        {status === "sending" ? "Submitting..." : "Submit Offer"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-500 text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
