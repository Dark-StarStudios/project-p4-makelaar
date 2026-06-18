"use client";

import { useEffect, useMemo, useState } from "react";
import { LogOut } from "lucide-react";
import { deleteListing, deleteMessage, deleteUser, getCurrentUser, getListings, getMessages, getUsers, logoutUser, type AppListing, type AppMessage, type AppUser } from "@/lib/payloadClient";

export function AdminDashboard() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<AppUser[]>([]);
  const [listings, setListings] = useState<AppListing[]>([]);
  const [messages, setMessages] = useState<AppMessage[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [listingSearch, setListingSearch] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  async function load() {
    try {
      const current = await getCurrentUser();
      if (!current || current.role !== "admin") {
        window.location.href = "/admin-login";
        return;
      }
      const [nextUsers, nextListings, nextMessages] = await Promise.all([getUsers(), getListings(), getMessages()]);
      setUsers(nextUsers);
      setListings(nextListings);
      setMessages(nextMessages);
      setReady(true);
    } catch {
      setError("De database is niet bereikbaar. Controleer PostgreSQL en probeer het opnieuw.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const filteredUsers = useMemo(() => users.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(userSearch.toLowerCase())), [users, userSearch]);
  const filteredListings = useMemo(() => listings.filter((listing) => `${listing.title} ${listing.city} ${listing.address}`.toLowerCase().includes(listingSearch.toLowerCase())), [listings, listingSearch]);
  const filteredMessages = useMemo(() => messages.filter((message) => `${message.name} ${message.email} ${message.body}`.toLowerCase().includes(messageSearch.toLowerCase())), [messages, messageSearch]);

  async function removeListing(id: string) {
    await deleteListing(id);
    setListings((current) => current.filter((listing) => listing.id !== id));
  }

  async function deleteSelectedUsers() {
    await Promise.all(selectedUsers.map(deleteUser));
    setUsers((current) => current.filter((user) => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
  }

  async function deleteSelectedMessages() {
    await Promise.all(selectedMessages.map(deleteMessage));
    setMessages((current) => current.filter((message) => !selectedMessages.includes(message.id)));
    setSelectedMessages([]);
  }

  if (error) return <section className="container py-10 text-red-600">{error}</section>;
  if (!ready) return <section className="container py-10">Admin wordt geladen...</section>;

  const fieldBase =
    "h-[40px] rounded-md bg-white text-black shadow-sm outline-none transition focus:ring-2 focus:ring-black/20";

  return (
    <section className="container py-8">
      <div className="mb-4 flex items-center gap-4">
        <h1 className="text-xl">Gebruikers</h1>
        <input className={`${fieldBase} px-4`} value={userSearch} onChange={(event) => setUserSearch(event.target.value)} placeholder="Zoek..." />
        <button className="btn btn-danger ml-auto" type="button" onClick={deleteSelectedUsers}>Verwijderen</button>
        <button className="btn" type="button" onClick={async () => { await logoutUser(); window.location.href = "/admin-login"; }}><LogOut className="h-4 w-4" />Uitloggen</button>
      </div>
      <div className="card overflow-hidden p-5">
        <table className="w-full text-left text-sm">
          <thead><tr><th className="py-3">Naam</th><th>Email</th><th>Geregistreerd</th><th /></tr></thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t border-clay/50">
                <td className="py-3">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
                <td className="text-right"><input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={(event) => setSelectedUsers(event.target.checked ? [...selectedUsers, user.id] : selectedUsers.filter((id) => id !== user.id))} /></td>
              </tr>
            ))}
            {filteredUsers.length === 0 ? <tr><td className="py-6" colSpan={4}>Geen gebruikers gevonden.</td></tr> : null}
          </tbody>
        </table>
      </div>

      <div className="mb-4 mt-10 flex items-center gap-4">
        <h2 className="text-xl">Woningen</h2>
        <input className={`${fieldBase} px-4`} value={listingSearch} onChange={(event) => setListingSearch(event.target.value)} placeholder="Zoek..." />
        <a href="/admin/woningen/nieuw" className="btn ml-auto">Woning toevoegen</a>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {filteredListings.map((listing) => (
          <article key={listing.id} className="bg-white p-4 shadow-soft rounded-md">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={listing.image} alt={listing.title} className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-3">{listing.title}</h3>
            <p className="text-sm">{listing.city}</p>
            <p className="text-sm">{listing.price}</p>
            <button type="button" onClick={() => removeListing(listing.id)} className="btn btn-danger mt-3 w-full">Delete Woning</button>
            <a href={`/admin/woningen/bewerk?id=${listing.id}`} className="btn mt-2 w-full">Update Woning</a>
          </article>
        ))}
        {filteredListings.length === 0 ? <p>Geen woningen gevonden.</p> : null}
      </div>

      <div className="mb-4 mt-10 flex items-center gap-4">
        <h2 className="text-xl">Emails</h2>
        <input className={`${fieldBase} px-4`} value={messageSearch} onChange={(event) => setMessageSearch(event.target.value)} placeholder="Zoek..." />
        <button className="btn btn-danger ml-auto" type="button" onClick={deleteSelectedMessages}>Verwijderen</button>
      </div>
      <div className="card min-h-56 overflow-hidden p-5">
        <table className="w-full text-left text-sm">
          <thead><tr><th className="py-3">Naam</th><th>Email</th><th>Gekregen</th><th /><th /></tr></thead>
          <tbody>
            {filteredMessages.map((message) => (
              <tr key={message.id} className="border-t border-clay/50">
                <td className="py-3">{message.name}</td>
                <td>{message.email}</td>
                <td>{message.createdAt}</td>
                <td><a className="btn h-8 min-h-0 px-5 py-1" href={`/admin/emails/1?id=${message.id}`}>Lezen</a></td>
                <td className="text-right"><input type="checkbox" checked={selectedMessages.includes(message.id)} onChange={(event) => setSelectedMessages(event.target.checked ? [...selectedMessages, message.id] : selectedMessages.filter((id) => id !== message.id))} /></td>
              </tr>
            ))}
            {filteredMessages.length === 0 ? <tr><td className="py-6" colSpan={5}>Nog geen e-mails ontvangen.</td></tr> : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
