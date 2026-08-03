import { getAllOrganizations } from "@/lib/actions/admin";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function AdminOrganizationsPage() {
  const organizations = await getAllOrganizations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Organisations</h1>
        <p className="text-gray-500">Gérer les organisations du système</p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">Nom</TableHead>
              <TableHead className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">N° Fiscale / Tax ID</TableHead>
              <TableHead className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">Membres</TableHead>
              <TableHead className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">Documents</TableHead>
              <TableHead className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">Date de création</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell className="px-6 py-4 text-sm font-medium text-gray-900">{org.name}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-500">{org.taxId || "N/A"}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-500">{org._count.members}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-500">{org._count.documents}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-500">
                  {format(new Date(org.createdAt), "dd MMM yyyy", { locale: fr })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
