import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      memberships: {
        include: { organization: true },
        take: 1,
      },
    },
  });

  const organizationName = user?.memberships[0]?.organization.name;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AppHeader
        organizationName={organizationName}
        userName={session.user.name}
        isSuperAdmin={session.user.systemRole === "SUPERADMIN"}
      />
      {children}
    </div>
  );
}
