"use client";

import { useEffect, useState } from "react";
import { ChevronRight, HelpCircle, KeyRound, Lock, LogOut, Mail, Phone, Shield, UserCog, type LucideIcon } from "lucide-react";
import { getCurrentUser, logoutUser, updateUser, type AppUser } from "@/lib/payloadClient";

const otherRows: [LucideIcon, string, string][] = [
  [HelpCircle, "Help & Support", "We helpen je graag met vragen over je account of woningen."],
  [UserCog, "Gebruikersvoorwaarden", "Lees de voorwaarden voor gebruik van Jouw Woning."],
  [Shield, "Privacybeleid", "Bekijk hoe wij veilig met je gegevens omgaan."]
];

export function AccountPanel() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [editField, setEditField] = useState<"email" | "password" | "phone" | null>(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getCurrentUser()
      .then((current) => {
        if (!current) window.location.href = "/login";
        else setUser(current);
      })
      .catch(() => setError("De database is niet bereikbaar. Controleer PostgreSQL en probeer het opnieuw."));
  }, []);

  if (error) return <section className="container py-16 text-red-600">{error}</section>;
  if (!user) return <section className="container py-16">Je wordt doorgestuurd naar inloggen...</section>;

  const accountRows: [LucideIcon, string, string][] = [
    [Mail, "E-mail adres", user.email],
    [KeyRound, "Wachtwoord", "aanpassen"],
    [Phone, "Telefoonnummer", user.phone || "ontbreekt"]
  ];

  function startEdit(label: string, value: string) {
    const field = label === "E-mail adres" ? "email" : label === "Wachtwoord" ? "password" : "phone";
    setEditField(field);
    setEditValue(field === "password" ? "" : value === "ontbreekt" ? "" : value);
  }

  async function saveAccountInfo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editField || !user) return;
    try {
      const updated = await updateUser(user.id, { [editField]: editValue });
      setUser(updated);
      setEditField(null);
      setEditValue("");
    } catch {
      setError("Opslaan mislukt. Controleer PostgreSQL/Payload.");
    }
  }

  return (
    <section className="container max-w-4xl py-10">
      <h1 className="text-3xl">Mijn account</h1>
      <p className="mt-2">Beheer je gegevens en voorkeuren</p>
      <h2 className="mt-8 text-lg">Account informatie</h2>
      <div className="card mt-3 overflow-hidden">
        {accountRows.map(([Icon, label, value]) => (
          <button key={label} className="flex w-full items-center gap-4 border-b border-clay/50 px-5 py-4 text-left last:border-b-0" type="button" onClick={() => startEdit(label, value)}>
            <Icon className="h-5 w-5 text-neutral-500" />
            <span className="flex-1">{label}</span>
            <span className="text-sm text-neutral-600">{value}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        ))}
      </div>
      {editField ? (
        <form className="card mt-4 grid gap-3 p-5 md:grid-cols-[1fr_auto_auto]" onSubmit={saveAccountInfo}>
          <input className="field" type={editField === "password" ? "password" : editField === "email" ? "email" : "tel"} value={editValue} onChange={(event) => setEditValue(event.target.value)} required />
          <button className="btn" type="submit">Opslaan</button>
          <button className="btn bg-neutral-200" type="button" onClick={() => setEditField(null)}>Annuleren</button>
        </form>
      ) : null}
      <button className="btn mt-5" type="button" onClick={async () => { await logoutUser(); window.location.href = "/login"; }}>
        <LogOut className="h-4 w-4" />
        Uitloggen
      </button>
      {/* <button className="btn ml-3 mt-5" type="button"><Lock className="h-4 w-4" />Beheren</button> */}

      <h2 className="mt-8 text-lg">Overig</h2>
      <div className="card mt-3 overflow-hidden">
        {otherRows.map(([Icon, label, body]) => (
          <div key={label} className="border-b border-clay/50 last:border-b-0">
            <button className="flex w-full items-center gap-4 px-5 py-4 text-left" type="button" onClick={() => setOpenRow(openRow === label ? null : label)}>
              <Icon className="h-5 w-5 text-neutral-500" />
              <span className="flex-1">{label}</span>
              <ChevronRight className={`h-4 w-4 transition ${openRow === label ? "rotate-90" : ""}`} />
            </button>
            {openRow === label ? <p className="px-14 pb-5 text-sm text-neutral-700">{body}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
