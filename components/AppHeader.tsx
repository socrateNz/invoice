"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, LogOut, PlusCircle, Settings, ShieldCheck, ArrowLeft } from "lucide-react";

interface AppHeaderProps {
  organizationName?: string | null;
  userName?: string | null;
  isSuperAdmin: boolean;
}

export function AppHeader({ organizationName, userName, isSuperAdmin }: AppHeaderProps) {
  const pathname = usePathname();
  const inAdmin = pathname?.startsWith("/admin") ?? false;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl text-gray-900">
                {organizationName || "ETARCOS BILL"}
              </span>
            </Link>
            {inAdmin && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Mode Admin
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {inAdmin ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour à l'app
              </Link>
            ) : (
              <>
                <Link
                  href="/editor"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Nouveau Document</span>
                </Link>
                <Link
                  href="/settings/organization"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Paramètres</span>
                </Link>
                {isSuperAdmin && (
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span className="hidden sm:inline">Admin</span>
                  </Link>
                )}
              </>
            )}

            <span className="hidden md:inline text-sm font-medium text-gray-500 pl-2 border-l border-gray-200 ml-1">
              {userName}
            </span>
            <Link
              href="/api/auth/signout"
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Se déconnecter"
            >
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
