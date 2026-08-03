import { ReactNode } from "react";
import { AdminTabs } from "@/components/AdminTabs";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminTabs />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>
    </>
  );
}
