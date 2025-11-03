import "../globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMDRM Security Center - Login",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  );
}
