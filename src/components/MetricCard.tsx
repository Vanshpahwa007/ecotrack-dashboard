import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  subtitle: string;
  color: "energy" | "water" | "waste" | "air";
  trend?: "up" | "down";
}

const colorClasses = {
  energy: "gradient-energy",
  water: "gradient-water",
  waste: "gradient-waste",
  air: "gradient-air",
};

export const MetricCard = ({ icon: Icon, title, value, subtitle, color, trend }: MetricCardProps) => {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  
  return (
    <div className="glass-card rounded-2xl p-6 transition-smooth hover:scale-105 hover:shadow-2xl">
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", colorClasses[color])}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
      
      <div className="flex items-center gap-2 text-sm">
        {trend && <TrendIcon className="w-4 h-4 text-primary" />}
        <span className="text-muted-foreground">{subtitle}</span>
      </div>
    </div>
  );
};
