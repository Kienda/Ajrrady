"use client";

import { useRef, useState } from "react";

type Field = {
  label: string;
  name: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
};

type ContactFormProps = {
  fields: Field[];
  submitLabel: string;
  action?: string;
  successMessage?: string;
};

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm({
  fields,
  submitLabel,
  action = "/api/contact",
  successMessage = "Message envoyé avec succès.",
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const body: Record<string, string> = { _honey: String(formData.get("_honey") ?? "") };
    for (const field of fields) {
      body[field.name] = String(formData.get(field.name) ?? "").trim();
    }

    try {
      const res = await fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data: { success?: boolean; error?: string } = await res.json();

      if (!res.ok || data.error) {
        setErrorMsg(data.error ?? "Une erreur est survenue. Veuillez réessayer.");
        setStatus("error");
        return;
      }

      formRef.current?.reset();
      setStatus("success");
    } catch {
      setErrorMsg("Une erreur est survenue. Veuillez réessayer.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-lg border border-ajGreen/30 bg-ajGreen/5 p-8 text-center">
        <div>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ajGreen/15">
            <svg
              className="h-7 w-7 text-ajGreen"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-lg font-bold text-ajGreen">{successMessage}</p>
        </div>
      </div>
    );
  }

  const isLoading = status === "loading";
  const baseInputClass =
    "rounded-md border border-slate-200 px-3 text-base outline-none transition focus:border-ajGreen disabled:bg-slate-50 disabled:opacity-60";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      {/* Honeypot – invisible to users, bots fill it */}
      <input
        type="text"
        name="_honey"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", top: 0, opacity: 0, pointerEvents: "none" }}
      />

      {fields.map((field) => {
        const isRequired = field.required !== false;
        return (
          <label key={field.name} className="grid gap-2">
            <span className="text-sm font-extrabold text-ajPurple">
              {field.label}
              {isRequired && (
                <span aria-hidden className="ml-0.5 text-ajPurple/50"> *</span>
              )}
            </span>
            {field.multiline ? (
              <textarea
                name={field.name}
                required={isRequired}
                disabled={isLoading}
                className={`${baseInputClass} min-h-32 py-3`}
              />
            ) : (
              <input
                name={field.name}
                type={field.type ?? "text"}
                required={isRequired}
                disabled={isLoading}
                className={`${baseInputClass} min-h-11 py-2`}
              />
            )}
          </label>
        );
      })}

      {status === "error" && (
        <p
          role="alert"
          className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ajGreen px-5 py-3 text-sm font-extrabold uppercase text-white transition hover:bg-ajPurple disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Envoi...
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
}
