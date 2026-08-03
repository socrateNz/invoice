import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EditorClient from "./editor-client";
import { redirect } from "next/navigation";

export default async function EditorPage() {
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
      }
    }
  });

  const organization = user?.memberships[0]?.organization || null;

  return <EditorClient organization={organization} />;
}
