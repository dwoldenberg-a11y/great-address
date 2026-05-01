"use client";

import { useActionState } from "react";
import { signIn } from "../actions";

const inputClass =
  "w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-tertiary transition-all duration-200";

export default function LoginForm({ initialError }: { initialError?: string }) {
  const [state, formAction, pending] = useActionState(signIn, {
    error: initialError,
  });

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-text-secondary mb-2"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-text-secondary mb-2"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-bg hover:bg-accent-dim disabled:opacity-50 transition-colors"
      >
        {pending ? "Signing in..." : "Sign In"}
      </button>
      {state?.error && (
        <p className="text-sm text-red-400 text-center">{state.error}</p>
      )}
    </form>
  );
}
