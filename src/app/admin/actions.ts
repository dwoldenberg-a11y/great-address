"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";

export async function signIn(_prev: { error?: string } | null, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password required." };
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail && email.toLowerCase() !== adminEmail.toLowerCase()) {
    return { error: "Not authorized." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

type DomainStatus = "visible" | "hidden" | "sold";

export async function updateDomain(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const priceRaw = String(formData.get("askingPrice") ?? "").trim();
  const status = String(formData.get("status") ?? "visible") as DomainStatus;
  const description = String(formData.get("description") ?? "");
  const category = String(formData.get("category") ?? "General");

  if (!["visible", "hidden", "sold"].includes(status)) return;

  const askingPrice = priceRaw === "" ? null : Number(priceRaw);
  if (askingPrice !== null && (Number.isNaN(askingPrice) || askingPrice < 0)) {
    return;
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("domains")
    .update({
      asking_price: askingPrice,
      status,
      description,
      category,
    })
    .eq("id", id);

  if (error) {
    console.error("updateDomain error", error);
    return;
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/domain/[slug]`, "page");
}

export async function setStatus(id: string, status: DomainStatus) {
  await requireAdmin();
  if (!["visible", "hidden", "sold"].includes(status)) return;

  const supabase = await createClient();
  const { error } = await supabase
    .from("domains")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("setStatus error", error);
    return;
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/domain/[slug]`, "page");
}
