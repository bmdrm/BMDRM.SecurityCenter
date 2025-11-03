import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMDRM Security Center - Login",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
