import { HeroTitle } from "@/components/HeroTitle";
import { PageShell } from "@/components/PageShell";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <PageShell>
      <HeroTitle title="Contact" />
      <section className="container flex min-h-[470px] justify-center py-16">
        <ContactForm />
      </section>
    </PageShell>
  );
}
