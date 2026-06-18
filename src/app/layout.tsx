import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jouw Woning",
  description: "Makelaar website voor Jouw Woning"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
