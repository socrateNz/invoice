import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText, Clock } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { StatCard } from "@/components/StatCard";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { VariantProps } from "class-variance-authority";

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Brouillon",
  VALIDATED: "Validé",
  ARCHIVED: "Archivé",
};

const STATUS_VARIANTS: Record<string, BadgeVariant> = {
  DRAFT: "warning",
  VALIDATED: "success",
  ARCHIVED: "outline",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      memberships: {
        include: { organization: true },
      },
    },
  });

  const organizationId = user?.memberships[0]?.organizationId;

  const documents = organizationId
    ? await prisma.document.findMany({
      where: { organizationId },
      include: {
        auditLogs: {
          include: { user: true },
          orderBy: { timestamp: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    })
    : [];

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez les documents de votre organisation
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard icon={FileText} label="Total Documents" value={documents.length} iconClassName="bg-blue-50 text-blue-600" />
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Documents récents</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">Type & Numéro</TableHead>
              <TableHead className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">Statut</TableHead>
              <TableHead className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">Dernière activité</TableHead>
              <TableHead className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  Aucun document trouvé. Créez-en un nouveau !
                </TableCell>
              </TableRow>
            ) : (
              documents.map((doc) => {
                const lastLog = doc.auditLogs[0];
                return (
                  <TableRow key={doc.id}>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.type}</p>
                          <p className="text-xs text-gray-500">{doc.numero || "Sans numéro"}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge variant={STATUS_VARIANTS[doc.status] || "outline"}>
                        {STATUS_LABELS[doc.status] || doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {lastLog ? (
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-900">
                            {lastLog.action === "CREATED" ? "Créé par" : "Modifié par"} {lastLog.user.name}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {format(new Date(lastLog.timestamp), "dd MMM yyyy à HH:mm", { locale: fr })}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Inconnue</span>
                      )}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <Link
                        href={`/editor?id=${doc.id}`}
                        className="text-primary hover:opacity-80 bg-primary/5 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Ouvrir
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
