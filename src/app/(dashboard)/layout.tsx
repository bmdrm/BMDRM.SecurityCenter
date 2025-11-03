import { Navigation } from "@/components/Navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="md:ml-64 pt-16 md:pt-0">
        <div className="min-h-screen">{children}</div>
      </main>
    </div>
  );
}
