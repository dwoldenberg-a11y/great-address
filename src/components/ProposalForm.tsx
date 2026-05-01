"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-tertiary transition-all duration-200";

export default function ProposalForm({ domainName }: { domainName: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      type: "business_plan",
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
      <div className="text-center py-6">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent mb-3">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-base font-semibold mb-1">Proposal submitted</h3>
        <p className="text-sm text-text-secondary">We&apos;ll review your plan and be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="prop-name" className="block text-sm font-medium text-text-secondary mb-2">
          Full Name
        </label>
        <input id="prop-name" name="name" type="text" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="prop-email" className="block text-sm font-medium text-text-secondary mb-2">
          Email
        </label>
        <input id="prop-email" name="email" type="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="prop-company" className="block text-sm font-medium text-text-secondary mb-2">
          Company / Project Name
        </label>
        <input id="prop-company" name="company" type="text" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="prop-plan" className="block text-sm font-medium text-text-secondary mb-2">
          Business Plan Summary
        </label>
        <textarea
          id="prop-plan"
          name="plan"
          rows={5}
          required
          placeholder="Describe your vision, target market, revenue model, and team..."
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="prop-equity" className="block text-sm font-medium text-text-secondary mb-2">
          Proposed Equity Range
        </label>
        <input id="prop-equity" name="equity" type="text" required placeholder="e.g. 5-10%" className={inputClass} />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl border border-accent/30 bg-accent/5 px-5 py-3 text-sm font-semibold text-accent hover:bg-accent/10 disabled:opacity-50 transition-colors"
      >
        {status === "sending" ? "Submitting..." : "Submit Proposal"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-400 text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
