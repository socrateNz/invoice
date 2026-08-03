"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getOrganizationSettings() {
  const session = await auth();
  
  if (!session?.user?.organizationId) {
    throw new Error("User does not belong to any organization");
  }

  const org = await prisma.organization.findUnique({
    where: { id: session.user.organizationId }
  });

  return org;
}

export async function updateOrganizationSettings(data: {
  name: string;
  slogan?: string;
  email?: string;
  phone?: string;
  location?: string;
  subtitle?: string;
  taxId?: string;
  defaultAddress?: string;
  departments?: string[];
}) {
  const session = await auth();
  
  if (!session?.user?.organizationId) {
    throw new Error("User does not belong to any organization");
  }

  const updatedOrg = await prisma.organization.update({
    where: { id: session.user.organizationId },
    data: {
      name: data.name,
      slogan: data.slogan,
      email: data.email,
      phone: data.phone,
      location: data.location,
      subtitle: data.subtitle,
      taxId: data.taxId,
      defaultAddress: data.defaultAddress,
      departments: data.departments,
    }
  });

  return updatedOrg;
}
