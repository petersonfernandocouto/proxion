import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proxion",
  description: "Ferramenta Preventiva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
