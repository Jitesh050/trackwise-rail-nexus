
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
        "group transition-all duration-300 hover:shadow-xl cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:-translate-y-1",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {title}
              </CardTitle>
              {description && (
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
          {badge && (
            <Badge 
              variant={badgeVariant} 
              className="text-xs font-medium px-3 py-1 rounded-full"
            >
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      {children && (
        <CardContent className="pt-0">
          <div className="text-sm text-muted-foreground">
            {children}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
