import { ListingForm } from "@/components/ListingForm";
import { PageShell } from "@/components/PageShell";

export default function EditHousePage() {
  return (
    <PageShell footer={false}>
      <section className="container flex min-h-[760px] justify-center py-20">
        <ListingForm mode="edit" />
      </section>
    </PageShell>
  );
}
