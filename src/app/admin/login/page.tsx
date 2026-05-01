import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "./LoginForm";

export const metadata = { title: "Admin Login — Great Address" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/admin");

  const { error } = await searchParams;
  const initialError =
    error === "not-admin" ? "That account is not an admin." : undefined;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="inline-block rounded-full border border-border px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-text-tertiary mb-4">
            Admin
          </span>
          <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
        </div>

        <div className="rounded-2xl border border-border bg-bg-card p-8">
          <LoginForm initialError={initialError} />
        </div>
      </div>
    </div>
  );
}
