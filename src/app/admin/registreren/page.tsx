import { AdminRegisterForm } from "@/components/AuthForms";
import { FormCard } from "@/components/FormCard";
import { PageShell } from "@/components/PageShell";

export default function AdminRegisterPage() {
  return (
    <PageShell footer={false}>
      <FormCard title="Account aanmaken">
        <AdminRegisterForm />
      </FormCard>
    </PageShell>
  );
}
