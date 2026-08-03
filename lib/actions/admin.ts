"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// Check if user is superadmin
async function checkSuperAdmin() {
  const session = await auth();
  if (!session || session.user.systemRole !== "SUPERADMIN") {
    throw new Error("Unauthorized");
  }
}

export async function getSystemMetrics() {
  await checkSuperAdmin();
  
  const totalUsers = await prisma.user.count();
  const totalOrgs = await prisma.organization.count();
  const totalDocs = await prisma.document.count();
  
  return {
    totalUsers,
    totalOrgs,
    totalDocs
  };
}

export async function getAllUsers() {
  await checkSuperAdmin();
  
  return await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      systemRole: true,
      createdAt: true,
      _count: {
        select: { memberships: true }
      }
    }
  });
}

export async function getAllOrganizations() {
  await checkSuperAdmin();
  
  return await prisma.organization.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { members: true, documents: true }
      }
    }
  });
}

export async function makeSuperAdmin(userId: string) {
  await checkSuperAdmin();
  
  return await prisma.user.update({
    where: { id: userId },
    data: { systemRole: "SUPERADMIN" }
  });
}

export async function removeSuperAdmin(userId: string) {
  await checkSuperAdmin();
  
  return await prisma.user.update({
    where: { id: userId },
    data: { systemRole: "USER" }
  });
}
