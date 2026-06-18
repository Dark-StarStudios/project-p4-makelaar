import { Footer } from "./Footer";
import { Header } from "./Header";

export function PageShell({ children, footer = true }: { children: React.ReactNode; footer?: boolean }) {
  return (
    <div className="page-frame">
      <Header />
      <main>{children}</main>
      {footer ? <Footer /> : null}
    </div>
  );
}
