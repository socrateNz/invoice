import { getSystemMetrics } from "@/lib/actions/admin";
import { Users, Building2, FileText } from "lucide-react";
import { StatCard } from "@/components/StatCard";

export default async function AdminDashboard() {
  const metrics = await getSystemMetrics();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vue d'ensemble du système</h1>
        <p className="text-gray-500">Statistiques globales de l'application</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={Users} label="Utilisateurs totaux" value={metrics.totalUsers} iconClassName="bg-blue-100 text-blue-600" />
        <StatCard icon={Building2} label="Organisations" value={metrics.totalOrgs} iconClassName="bg-indigo-100 text-indigo-600" />
        <StatCard icon={FileText} label="Documents générés" value={metrics.totalDocs} iconClassName="bg-green-100 text-green-600" />
      </div>
    </div>
  );
}
