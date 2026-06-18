import { EmailDetail } from "@/components/EmailDetail";
import { PageShell } from "@/components/PageShell";

export default function EmailDetailPage() {
  return (
    <PageShell footer={false}>
      <EmailDetail />
    </PageShell>
  );
}
