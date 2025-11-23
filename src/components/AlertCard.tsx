import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  type: "success" | "warning" | "info";
  message: string;
  timestamp: string;
}

const alertStyles = {
  success: {
    bg: "bg-primary/10 border-primary/20",
    icon: CheckCircle,
    iconColor: "text-primary",
  },
  warning: {
    bg: "bg-energy/10 border-energy/20",
    icon: AlertCircle,
    iconColor: "text-energy",
  },
  info: {
    bg: "bg-water/10 border-water/20",
    icon: Info,
    iconColor: "text-water",
  },
};

export const AlertCard = ({ type, message, timestamp }: AlertCardProps) => {
  const style = alertStyles[type];
  const Icon = style.icon;
  
  return (
    <div className={cn("glass-card rounded-lg p-4 border transition-smooth", style.bg)}>
      <div className="flex items-start gap-3">
        <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", style.iconColor)} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{message}</p>
          <p className="text-xs text-muted-foreground mt-1">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};
