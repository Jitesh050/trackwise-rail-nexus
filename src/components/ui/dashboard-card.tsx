
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function DashboardCard({
  title,
  description,
  icon: Icon,
  badge,
  badgeVariant = "default",
  className,
  children,
  onClick
}: DashboardCardProps) {
  return (
    <Card 
      className={cn(
        "transition-all duration-200 hover:shadow-md cursor-pointer group",
        "border-border/50 hover:border-border",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              {description && (
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
          {badge && (
            <Badge variant={badgeVariant} className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      {children && (
        <CardContent className="pt-0">
          {children}
        </CardContent>
      )}
    </Card>
  );
}
