import { ListingDetailClient } from "@/components/ListingDetailClient";
import { PageShell } from "@/components/PageShell";

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <PageShell>
      <ListingDetailClient slug={slug} />
    </PageShell>
  );
}
