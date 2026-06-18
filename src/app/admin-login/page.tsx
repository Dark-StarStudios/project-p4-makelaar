import { FormCard } from "@/components/FormCard";
import { PageShell } from "@/components/PageShell";
import { AdminLoginForm } from "@/components/AuthForms";

export default function AdminLoginPage() {
  return (
    <PageShell footer={false}>
      <FormCard title="Admin Inloggen">
        <AdminLoginForm />
      </FormCard>
    </PageShell>
  );
}
