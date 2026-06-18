import { AdminDashboard } from "@/components/AdminDashboard";
import { PageShell } from "@/components/PageShell";

export default function AdminPage() {
  return (
    <PageShell footer={false}>
      <AdminDashboard />
    </PageShell>
  );
}
