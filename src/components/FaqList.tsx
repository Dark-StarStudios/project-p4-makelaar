"use client";

import { ChevronDown, CircleDollarSign, Handshake, Home, MessageCircle, type LucideIcon } from "lucide-react";
import { useState } from "react";

const faqs: [string, string, LucideIcon][] = [
  ["Hoe kan ik een woning kopen?", "Bekijk ons woningaanbod, open een woning die je interessant vindt en klik op reageren. Je kunt ook contact opnemen via het contactformulier.", Home],
  ["Zijn er extra kosten?", "Nee, alle prijzen worden duidelijk weergegeven zonder verborgen kosten. Eventuele kosten worden vooraf met je besproken.", CircleDollarSign],
  ["Hoe snel krijg ik reactie?", "Meestal reageren wij binnen 24 uur op werkdagen. Spoedvragen beantwoorden wij zo snel mogelijk.", MessageCircle],
  ["Kan ik een bezichtiging plannen?", "Ja, dat kan. Neem contact met ons op en wij plannen graag een afspraak met je in.", Handshake]
];

export function FaqList() {
  const [open, setOpen] = useState(0);

  return (
    <section className="container mt-12 space-y-5">
      {faqs.map(([title, body, Icon], index) => (
        <article key={title} className="card p-5">
          <button className="flex w-full cursor-pointer items-center gap-4 text-left" type="button" onClick={() => setOpen(open === index ? -1 : index)}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-honey/35"><Icon className="h-6 w-6" /></span>
            <span className="flex-1">
              <span className="block text-lg font-semibold">{title}</span>
              {open === index ? <span className="mt-1 block text-sm leading-6">{body}</span> : null}
            </span>
            <ChevronDown className={`h-5 w-5 transition ${open === index ? "rotate-180" : ""}`} />
          </button>
        </article>
      ))}
    </section>
  );
}
