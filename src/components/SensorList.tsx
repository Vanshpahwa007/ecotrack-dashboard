import { Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Sensor {
  name: string;
  status: "active" | "inactive";
}

interface SensorListProps {
  title: string;
  sensors: Sensor[];
}

export const SensorList = ({ title, sensors }: SensorListProps) => {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" />
        {title}
      </h3>
      
      <div className="space-y-3">
        {sensors.map((sensor, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 transition-smooth hover:bg-secondary/50">
            <span className="text-sm font-medium text-foreground">{sensor.name}</span>
            <Badge 
              variant="outline" 
              className={sensor.status === "active" ? "bg-primary/10 text-primary border-primary/20" : ""}
            >
              {sensor.status === "active" ? "Active" : "Inactive"}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
