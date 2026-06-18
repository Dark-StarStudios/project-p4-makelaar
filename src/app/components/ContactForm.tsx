"use client";

import { useState } from "react";
import { createMessage } from "@/lib/payloadClient";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim().toLowerCase();
    const phone = String(form.get("phone") || "").trim();
    const body = String(form.get("body") || "").trim();

    if (!name || !email || !body) {
      setSent(false);
      setError("Vul naam, e-mail en bericht in.");
      return;
    }

    try {
      setSending(true);
      setError("");
      setSent(false);
      await createMessage({
        name,
        email,
        phone,
        subject: "Contactformulier",
        body
      });
      formElement.reset();
      setSent(true);
    } catch (err) {
      setSent(false);
      setError(err instanceof Error ? err.message : "De database is niet bereikbaar. Controleer PostgreSQL en probeer het opnieuw.");
    } finally {
      setSending(false);
    }
  }
  const fieldBase =
    "h-[40px] rounded-md bg-white text-black shadow-sm outline-none transition focus:ring-2 focus:ring-black/20 px-4";

  return (
    <form className="w-full max-w-md space-y-3 grid" onSubmit={onSubmit}>
      <input className={fieldBase} name="name" placeholder="Naam" required />
      <input className={fieldBase} name="email" placeholder="E-mail" type="email" required />
      <input className={fieldBase} name="phone" placeholder="Telefoonnummer" />
      <textarea className={fieldBase} name="body" placeholder="Bericht" required />
      {sent ? <p className="rounded border border-green-700/30 bg-green-50 px-3 py-2 text-sm text-green-800">Bericht verstuurd. Je bericht staat nu in de admin pagina bij Emails.</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button className="btn w-full disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={sending}>
        {sending ? "Versturen..." : "Versturen"}
      </button>
    </form>
  );
}
