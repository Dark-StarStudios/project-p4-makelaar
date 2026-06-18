import { FormCard } from "@/components/FormCard";
import { PageShell } from "@/components/PageShell";
import { LoginForm } from "@/components/AuthForms";

export default function LoginPage() {
  return (
    <PageShell footer={false}>
      <FormCard title="Inloggen">
        <LoginForm />
      </FormCard>
    </PageShell>
  );
}
