export function HeroTitle({ title }: { title: string }) {
  return (
    <section className="image-band">
      <div className="container flex min-h-40 items-center justify-center py-10">
        <h1 className="hero-title text-center drop-shadow-sm">{title}</h1>
      </div>
    </section>
  );
}
