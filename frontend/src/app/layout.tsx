import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI E-Commerce Platform",
  description: "Smart shopping with AI-powered recommendations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
