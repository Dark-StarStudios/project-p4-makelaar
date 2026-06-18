import { FormCard } from "@/components/FormCard";
import { PageShell } from "@/components/PageShell";
import { RegisterForm } from "@/components/AuthForms";

export default function RegisterPage() {
  return (
    <PageShell footer={false}>
      <FormCard title="Account aanmaken">
        <RegisterForm />
      </FormCard>
    </PageShell>
  );
}
