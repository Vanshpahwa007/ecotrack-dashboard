import { useState, useEffect } from "react";
import { Droplet, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DetailCard } from "@/components/DetailCard";
import { SensorList } from "@/components/SensorList";
import { useNavigate } from "react-router-dom";

interface WaterData {
  consumption: number;
  savings: number;
  flow: number;
  rainwater: number;
}

export default function Water() {
  const navigate = useNavigate();
  const [data, setData] = useState<WaterData>({
    consumption: 1250,
    savings: 18,
    flow: 45,
    rainwater: 280,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        consumption: Math.max(1100, Math.min(1400, prev.consumption + (Math.random() - 0.5) * 30)),
        savings: Math.max(15, Math.min(22, prev.savings + (Math.random() - 0.5) * 2)),
        flow: Math.max(40, Math.min(50, prev.flow + (Math.random() - 0.5) * 3)),
        rainwater: Math.max(250, Math.min(320, prev.rainwater + (Math.random() - 0.5) * 10)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/dashboard')}
          className="hover-scale"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Droplet className="h-8 w-8 text-water" />
            Water Management
          </h1>
          <p className="text-muted-foreground">Track water consumption and conservation</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <DetailCard
          icon={Droplet}
          title="Daily Consumption"
          value={`${Math.round(data.consumption)} L`}
          subtitle="Total usage today"
        />
        <DetailCard
          icon={Droplet}
          title="Flow Rate"
          value={`${data.flow.toFixed(1)} L/min`}
          subtitle="Current flow"
        />
        <DetailCard
          icon={Droplet}
          title="Rainwater Harvested"
          value={`${Math.round(data.rainwater)} L`}
          subtitle="Collected today"
        />
      </div>

      <SensorList
        title="Water Sensors"
        sensors={[
          { name: "YF-S201 Flow Sensor", status: "active" as const },
          { name: "HC-SR04 Level Sensor", status: "active" as const },
          { name: "TDS Water Quality Meter", status: "active" as const },
        ]}
      />
    </div>
  );
}
