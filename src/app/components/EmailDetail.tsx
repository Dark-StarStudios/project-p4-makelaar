"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, Mail, Reply, UserRound, UsersRound } from "lucide-react";
import { deleteMessage, getCurrentUser, getMessageById, getMessages, type AppMessage } from "@/lib/payloadClient";

export function EmailDetail() {
  const [message, setMessage] = useState<AppMessage | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const current = await getCurrentUser();
        if (!current || current.role !== "admin") {
          window.location.href = "/admin-login";
          return;
        }
        const id = new URLSearchParams(window.location.search).get("id");
        if (id) setMessage(await getMessageById(id));
        else setMessage((await getMessages())[0] || null);
      } catch {
        setError("De database is niet bereikbaar. Controleer PostgreSQL en probeer het opnieuw.");
      }
    }
    void load();
  }, []);

  async function removeMessage() {
    if (!message) return;
    await deleteMessage(message.id);
    window.location.href = "/admin";
  }

  if (error) return <section className="container py-16 text-red-600">{error}</section>;

  if (!message) {
    return (
      <section className="container flex min-h-[500px] items-center justify-center">
        <div className="card p-8 text-center">
          <p>Geen e-mail gevonden.</p>
          <a className="btn mt-5" href="/admin">Ga terug</a>
        </div>
      </section>
    );
  }

  return (
    <section className="container flex min-h-[760px] items-start justify-center py-20">
      <article className="card w-full max-w-5xl p-12">
        <div className="mb-8 flex flex-wrap items-center gap-6">
          <h1 className="mr-auto text-3xl">{message.subject}</h1>
          <a className="btn" href="/admin"><ArrowLeft className="h-4 w-4" />Ga terug</a>
          <button className="btn btn-danger" type="button" onClick={removeMessage}><Mail className="h-4 w-4" />Verwijder e-mail</button>
        </div>
        <dl className="space-y-4 text-2xl text-neutral-600">
          <div className="flex gap-5"><dt className="flex min-w-36 items-center gap-3"><UserRound className="h-6 w-6" />Van:</dt><dd>{message.name} &lt;{message.email}&gt;</dd></div>
          <div className="flex gap-5"><dt className="flex min-w-36 items-center gap-3"><UsersRound className="h-6 w-6" />Naar:</dt><dd>Info@Jouwwoning.nl</dd></div>
          <div className="flex gap-5"><dt className="flex min-w-36 items-center gap-3"><CalendarDays className="h-6 w-6" />Datum:</dt><dd>{message.createdAt}</dd></div>
        </dl>
        <div className="mt-14 whitespace-pre-wrap text-2xl leading-relaxed">{message.body}</div>
        <a className="btn mt-16" href={`mailto:${message.email}?subject=Re: ${message.subject}`}><Reply className="h-4 w-4" />Beantwoorden</a>
      </article>
    </section>
  );
}
