import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { type, numero, data } = await request.json();

    if (!type || !data) {
      return NextResponse.json(
        { error: "Le type et les données sont obligatoires." },
        { status: 400 }
      );
    }

    const document = await prisma.document.create({
      data: {
        type,
        numero,
        data,
        status: "DRAFT",
        organizationId: (session.user as any).organizationId,
        createdById: session.user.id!,
      },
    });

    // Création de l'audit log
    await prisma.auditLog.create({
      data: {
        action: "CREATED",
        documentId: document.id,
        userId: session.user.id!,
      },
    });

    return NextResponse.json({ document }, { status: 201 });
  } catch (error) {
    console.error("[DOCUMENT_POST]", error);
    return NextResponse.json(
      { error: "Erreur lors de la sauvegarde du document." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const whereClause: any = {
      organizationId: (session.user as any).organizationId,
    };

    if (type) {
      whereClause.type = type;
    }

    const documents = await prisma.document.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ documents });
  } catch (error) {
    console.error("[DOCUMENT_GET]", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des documents." },
      { status: 500 }
    );
  }
}
