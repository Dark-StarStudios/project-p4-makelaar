import { UserRound } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/woningaanbod", label: "Woningaanbod" },
  { href: "/contact", label: "Contact" },
  // { href: "/admin-login", label: "Admin" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-100 bg-white">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Logo />
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[15px]">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </a>
          ))}
        </nav>
        <a href="/account" aria-label="Account" title="Account" className="rounded-full p-2 hover:bg-paper">
          <UserRound className="h-7 w-7" strokeWidth={1.7} />
        </a>
      </div>
    </header>
  );
}
