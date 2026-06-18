import { AccountPanel } from "@/components/AccountPanel";
import { HeroTitle } from "@/components/HeroTitle";
import { PageShell } from "@/components/PageShell";

export default function AccountPage() {
  return (
    <PageShell>
      <HeroTitle title="Account" />
      <AccountPanel />
    </PageShell>
  );
}
