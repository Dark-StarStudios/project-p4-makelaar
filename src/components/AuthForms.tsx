"use client";

import { useState } from "react";
import { loginUser, registerAdmin, registerUser } from "@/lib/payloadClient";

export function LoginForm() {
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await loginUser(String(form.get("email") || "").trim().toLowerCase(), String(form.get("password") || ""));
      window.location.href = "/account";
    } catch {
      setError("E-mail of wachtwoord klopt niet, of PostgreSQL/Payload is niet bereikbaar.");
    }
  }

  return (
    <form className="space-y-3 text-left" onSubmit={onSubmit}>
      <input className="field" name="email" placeholder="Email" type="email" required />
      <input className="field" name="password" placeholder="Wachtwoord" type="password" required />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button className="btn w-full" type="submit">Inloggen</button>
      <p className="text-center text-sm"><a className="text-blue-600" href="/registreren">wachtwoord vergeten?</a></p>
      <p className="pt-5 text-center text-neutral-600">Heb u nog geen account? <a className="text-blue-600" href="/registreren">Registreren</a></p>
    </form>
  );
}

export function RegisterForm() {
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const repeat = String(form.get("repeat") || "");
    if (password !== repeat) {
      setError("Wachtwoorden zijn niet hetzelfde.");
      return;
    }
    try {
      const email = String(form.get("email") || "").trim().toLowerCase();
      await registerUser({ email, name: String(form.get("name") || "").trim(), password });
      await loginUser(email, password);
      window.location.href = "/account";
    } catch {
      setError("Registreren lukt niet. Controleer PostgreSQL/Payload of gebruik een ander e-mailadres.");
    }
  }

  return (
    <form className="space-y-3 text-left" onSubmit={onSubmit}>
      <input className="field" name="email" placeholder="Email" type="email" required />
      <input className="field" name="name" placeholder="Naam" required />
      <input className="field" name="password" placeholder="Wachtwoord" type="password" required />
      <input className="field" name="repeat" placeholder="Herhaal wachtwoord" type="password" required />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button className="btn w-full" type="submit">Registreren</button>
      <p className="text-center text-neutral-600">Heb u wel een account? <a className="text-blue-600" href="/login">Inloggen</a></p>
    </form>
  );
}

export function AdminLoginForm() {
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const user = await loginUser(String(form.get("email") || "").trim().toLowerCase(), String(form.get("password") || ""));
      if (user.role !== "admin") {
        setError("Dit account is geen admin.");
        return;
      }
      window.location.href = "/admin";
    } catch {
      setError("Admin login mislukt. Controleer PostgreSQL/Payload en je admin account.");
    }
  }

  return (
    <form className="space-y-3 text-left" onSubmit={onSubmit}>
      <input className="field" name="email" placeholder="Email" type="email" required />
      <input className="field" name="password" placeholder="Wachtwoord" type="password" required />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button className="btn w-full" type="submit">Inloggen</button>
      <p className="text-center text-sm"><a className="text-blue-600" href="/admin/registreren">Admin account aanmaken</a></p>
    </form>
  );
}

export function AdminRegisterForm() {
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const adminKey = String(form.get("adminKey") || "");
    const password = String(form.get("password") || "");
    const repeat = String(form.get("repeat") || "");
    if (password !== repeat) {
      setError("Wachtwoorden zijn niet hetzelfde.");
      return;
    }
    try {
      const email = String(form.get("email") || "").trim().toLowerCase();
      await registerAdmin({ email, name: String(form.get("name") || "").trim(), password, adminKey });
      await loginUser(email, password);
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Admin registreren lukt niet. Controleer PostgreSQL/Payload of gebruik een ander e-mailadres.");
    }
  }

  return (
    <form className="space-y-3 text-left" onSubmit={onSubmit}>
      <input className="field" name="email" placeholder="Email" type="email" required />
      <input className="field" name="name" placeholder="Naam" required />
      <input className="field" name="password" placeholder="Wachtwoord" type="password" required />
      <input className="field" name="repeat" placeholder="Herhaal wachtwoord" type="password" required />
      <input className="field" name="adminKey" placeholder="Admin key" required />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button className="btn w-full" type="submit">Registreren</button>
      <p className="text-center text-neutral-600">Heb u wel een account? <a className="text-blue-600" href="/admin-login">Inloggen</a></p>
    </form>
  );
}
