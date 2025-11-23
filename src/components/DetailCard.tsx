import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DetailCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  subtitle: string;
  color?: string;
}

export const DetailCard = ({ icon: Icon, title, value, subtitle, color = "primary" }: DetailCardProps) => {
  return (
    <div className="glass-card rounded-xl p-6 transition-smooth hover:shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", `bg-${color}/10`)}>
          <Icon className={cn("w-5 h-5", `text-${color}`)} />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      
      <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
};
