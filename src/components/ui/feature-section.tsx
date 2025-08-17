
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureSectionProps {
  title: string;
  icon: LucideIcon;
  className?: string;
  children: React.ReactNode;
}

export function FeatureSection({ title, icon: Icon, className, children }: FeatureSectionProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </div>
  );
}
