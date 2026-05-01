import { redirect } from "next/navigation";
import { createClient } from "./server";

// Verifies the current request is an authenticated admin.
// Call at the top of every admin server action and admin server component —
// proxy.ts is best-effort, but auth must also be enforced here.
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail && user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
    redirect("/admin/login?error=not-admin");
  }

  return { user, supabase };
}
