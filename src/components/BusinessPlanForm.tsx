"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-tertiary transition-all duration-200";

export default function BusinessPlanForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      type: "business_plan",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      domain: (form.elements.namedItem("domain") as HTMLInputElement).value,
      plan: (form.elements.namedItem("plan") as HTMLTextAreaElement).value,
      equityRange: (form.elements.namedItem("equity") as HTMLInputElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/submit-proposal", {
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
      <div className="text-center py-8">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Proposal submitted</h3>
        <p className="text-sm text-text-secondary">
          We&apos;ll review your plan and respond within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bp-name" className="block text-sm font-medium text-text-secondary mb-2">
            Full Name
          </label>
          <input id="bp-name" name="name" type="text" required className={inputClass} placeholder="Jane Smith" />
        </div>
        <div>
          <label htmlFor="bp-email" className="block text-sm font-medium text-text-secondary mb-2">
            Email
          </label>
          <input id="bp-email" name="email" type="email" required className={inputClass} placeholder="jane@company.com" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bp-company" className="block text-sm font-medium text-text-secondary mb-2">
            Company / Project Name
          </label>
          <input id="bp-company" name="company" type="text" required className={inputClass} placeholder="Acme Inc." />
        </div>
        <div>
          <label htmlFor="bp-domain" className="block text-sm font-medium text-text-secondary mb-2">
            Desired Domain
          </label>
          <input id="bp-domain" name="domain" type="text" required className={inputClass} placeholder="example.com" />
        </div>
      </div>

      <div>
        <label htmlFor="bp-plan" className="block text-sm font-medium text-text-secondary mb-2">
          Business Plan Summary
        </label>
        <textarea
          id="bp-plan"
          name="plan"
          rows={6}
          required
          className={inputClass}
          placeholder="Describe your vision, target market, revenue model, competitive advantage, and team background..."
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bp-equity" className="block text-sm font-medium text-text-secondary mb-2">
            Proposed Equity Range
          </label>
          <input id="bp-equity" name="equity" type="text" required className={inputClass} placeholder="e.g. 5-10%" />
        </div>
        <div>
          <label htmlFor="bp-website" className="block text-sm font-medium text-text-secondary mb-2">
            Existing Website / LinkedIn
            <span className="text-text-tertiary font-normal"> (optional)</span>
          </label>
          <input id="bp-website" name="website" type="text" className={inputClass} placeholder="https://..." />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-bg hover:bg-accent-dim disabled:opacity-50 transition-colors"
      >
        {status === "sending" ? "Submitting..." : "Submit Business Plan"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-400 text-center">
          {errorMsg || "Something went wrong. Please try again."}
        </p>
      )}
    </form>
  );
}
