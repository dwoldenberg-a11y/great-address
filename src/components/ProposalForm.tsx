"use client";

import { useState } from "react";

export default function ProposalForm({ domainName }: { domainName: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      domain: domainName,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      plan: (form.elements.namedItem("plan") as HTMLTextAreaElement).value,
      equityRange: (form.elements.namedItem("equity") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/submit-proposal", {
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
        Thank you! We&apos;ll review your proposal and be in touch soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="proposal-name" className="block text-sm font-medium mb-1">
          Full Name
        </label>
        <input
          id="proposal-name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div>
        <label htmlFor="proposal-email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="proposal-email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div>
        <label htmlFor="proposal-company" className="block text-sm font-medium mb-1">
          Company / Project Name
        </label>
        <input
          id="proposal-company"
          name="company"
          type="text"
          required
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div>
        <label htmlFor="proposal-plan" className="block text-sm font-medium mb-1">
          Business Plan Summary
        </label>
        <textarea
          id="proposal-plan"
          name="plan"
          rows={5}
          required
          placeholder="Describe your vision, target market, revenue model, and team..."
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div>
        <label htmlFor="proposal-equity" className="block text-sm font-medium mb-1">
          Proposed Equity Range
        </label>
        <input
          id="proposal-equity"
          name="equity"
          type="text"
          required
          placeholder="e.g. 5-10%"
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-zinc-900 dark:bg-white dark:text-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 transition-colors"
      >
        {status === "sending" ? "Submitting..." : "Submit Proposal"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-500 text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
