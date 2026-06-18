export function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="container flex min-h-[720px] items-start justify-center pt-28">
      <div className="w-full max-w-md text-center">
        <h1 className="mb-3 text-xl">{title}</h1>
        <div className="space-y-3 text-left">{children}</div>
      </div>
    </section>
  );
}
