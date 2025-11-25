import { Building2, Users, Thermometer } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BuildingCardProps {
  name: string;
  energy: string;
  occupancy: number;
  temperature: number;
  status: "optimal" | "warning" | "critical";
  onClick?: () => void;
}

const statusColors = {
  optimal: "bg-primary/10 text-primary border-primary/20",
  warning: "bg-energy/10 text-energy border-energy/20",
  critical: "bg-destructive/10 text-destructive border-destructive/20",
};

export const BuildingCard = ({ name, energy, occupancy, temperature, status, onClick }: BuildingCardProps) => {
  return (
    <div 
      className="glass-card rounded-xl p-5 transition-smooth hover:shadow-xl cursor-pointer hover-scale" 
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <h4 className="font-semibold text-foreground">{name}</h4>
        </div>
        <Badge className={statusColors[status]} variant="outline">
          {status}
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Energy</span>
          <span className="font-semibold text-foreground">{energy}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Occupancy</span>
          </div>
          <span className="font-semibold text-foreground">{occupancy}%</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Temperature</span>
          </div>
          <span className="font-semibold text-foreground">{temperature}°C</span>
        </div>
      </div>
    </div>
  );
};
