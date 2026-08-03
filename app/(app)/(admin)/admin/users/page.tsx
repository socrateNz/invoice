import { getAllUsers } from "@/lib/actions/admin";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Utilisateurs</h1>
        <p className="text-gray-500">Gérer les utilisateurs du système</p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">Utilisateur</TableHead>
              <TableHead className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">Rôle Système</TableHead>
              <TableHead className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">Organisations</TableHead>
              <TableHead className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">Date de création</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{user.name || "Sans nom"}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge variant={user.systemRole === "SUPERADMIN" ? "secondary" : "success"}>
                    {user.systemRole}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-500">{user._count.memberships}</TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-500">
                  {format(new Date(user.createdAt), "dd MMM yyyy", { locale: fr })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
