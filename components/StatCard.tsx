import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  /** Tailwind bg + text classes for the icon chip, e.g. "bg-blue-50 text-blue-600". */
  iconClassName?: string;
  className?: string;
}

export function StatCard({ icon: Icon, label, value, iconClassName = "bg-blue-50 text-blue-600", className }: StatCardProps) {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className={cn("p-3 rounded-lg", iconClassName)}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
