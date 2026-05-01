"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { setStatus, updateDomain } from "./actions";

export type AdminDomain = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  askingPrice: number | null;
  status: "visible" | "hidden" | "sold";
};

const inputClass =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-tertiary";

export default function AdminDomainRow({ domain }: { domain: AdminDomain }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  function quickSetStatus(s: AdminDomain["status"]) {
    startTransition(async () => {
      await setStatus(domain.id, s);
    });
  }

  if (editing) {
    return (
      <form
        action={async (formData) => {
          startTransition(async () => {
            await updateDomain(formData);
            setEditing(false);
          });
        }}
        className="grid gap-3 px-5 py-4 md:grid-cols-[1fr_140px_120px_140px_120px] md:items-center"
      >
        <input type="hidden" name="id" value={domain.id} />
        <div>
          <p className="text-base font-semibold">{domain.name}</p>
          <textarea
            name="description"
            rows={2}
            placeholder="Description (optional)"
            defaultValue={domain.description}
            className={`${inputClass} mt-2`}
          />
        </div>
        <input
          name="category"
          defaultValue={domain.category}
          className={inputClass}
        />
        <input
          name="askingPrice"
          type="number"
          min={0}
          step="1"
          inputMode="numeric"
          placeholder="(blank = offer)"
          defaultValue={domain.askingPrice ?? ""}
          className={`${inputClass} font-mono`}
        />
        <select
          name="status"
          defaultValue={domain.status}
          className={inputClass}
        >
          <option value="visible">Visible</option>
          <option value="hidden">Hidden</option>
          <option value="sold">Sold</option>
        </select>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-text-secondary hover:text-text"
            disabled={pending}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-bg hover:bg-accent-dim disabled:opacity-50"
          >
            {pending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="grid gap-2 px-5 py-4 md:grid-cols-[1fr_140px_120px_140px_120px] md:items-center md:gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Link
            href={`/domain/${domain.slug}`}
            target="_blank"
            className="text-base font-semibold hover:text-accent transition-colors"
          >
            {domain.name}
          </Link>
        </div>
        {domain.description && (
          <p className="text-xs text-text-tertiary mt-1 line-clamp-1">
            {domain.description}
          </p>
        )}
      </div>
      <div className="text-sm text-text-secondary">{domain.category}</div>
      <div className="text-sm font-mono">
        {domain.askingPrice === null ? (
          <span className="text-text-tertiary">Make offer</span>
        ) : (
          <span className="text-accent">
            ${domain.askingPrice.toLocaleString()}
          </span>
        )}
      </div>
      <div>
        <StatusBadge status={domain.status} />
      </div>
      <div className="flex justify-start md:justify-end gap-1.5 flex-wrap">
        <button
          onClick={() => setEditing(true)}
          className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-text-secondary hover:text-text hover:border-border-hover"
        >
          Edit
        </button>
        {domain.status !== "hidden" && (
          <button
            onClick={() => quickSetStatus("hidden")}
            disabled={pending}
            className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-text-secondary hover:text-text hover:border-border-hover disabled:opacity-50"
          >
            Hide
          </button>
        )}
        {domain.status === "hidden" && (
          <button
            onClick={() => quickSetStatus("visible")}
            disabled={pending}
            className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-text-secondary hover:text-text hover:border-border-hover disabled:opacity-50"
          >
            Show
          </button>
        )}
        {domain.status !== "sold" && (
          <button
            onClick={() => quickSetStatus("sold")}
            disabled={pending}
            className="rounded-md border border-red-500/30 bg-red-500/5 px-2.5 py-1 text-xs font-medium text-red-400 hover:bg-red-500/10 disabled:opacity-50"
          >
            Mark sold
          </button>
        )}
        {domain.status === "sold" && (
          <button
            onClick={() => quickSetStatus("visible")}
            disabled={pending}
            className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-text-secondary hover:text-text hover:border-border-hover disabled:opacity-50"
          >
            Unsell
          </button>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: AdminDomain["status"] }) {
  const styles: Record<AdminDomain["status"], string> = {
    visible: "border-accent/30 bg-accent/10 text-accent",
    hidden: "border-border bg-bg-elevated text-text-tertiary",
    sold: "border-red-500/30 bg-red-500/10 text-red-400",
  };
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${styles[status]}`}
    >
      {status}
    </span>
  );
}
