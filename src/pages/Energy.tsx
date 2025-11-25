import { useState, useEffect } from "react";
import { Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DetailCard } from "@/components/DetailCard";
import { SensorList } from "@/components/SensorList";
import { useNavigate } from "react-router-dom";

interface EnergyData {
  usage: number;
  savings: number;
  solar: number;
  cost: number;
}

export default function Energy() {
  const navigate = useNavigate();
  const [data, setData] = useState<EnergyData>({
    usage: 850,
    savings: 23,
    solar: 320,
    cost: 1250,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        usage: Math.max(750, Math.min(950, prev.usage + (Math.random() - 0.5) * 20)),
        savings: Math.max(20, Math.min(26, prev.savings + (Math.random() - 0.5) * 2)),
        solar: Math.max(280, Math.min(360, prev.solar + (Math.random() - 0.5) * 15)),
        cost: Math.max(1100, Math.min(1400, prev.cost + (Math.random() - 0.5) * 30)),
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
            <Zap className="h-8 w-8 text-energy" />
            Energy Management
          </h1>
          <p className="text-muted-foreground">Monitor and optimize energy consumption</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <DetailCard
          icon={Zap}
          title="Current Usage"
          value={`${Math.round(data.usage)} kWh`}
          subtitle="Real-time consumption"
        />
        <DetailCard
          icon={Zap}
          title="Solar Generation"
          value={`${Math.round(data.solar)} kWh`}
          subtitle="Renewable energy"
        />
        <DetailCard
          icon={Zap}
          title="Cost Savings"
          value={`₹${Math.round(data.cost)}`}
          subtitle="Monthly savings"
        />
      </div>

      <SensorList
        title="Energy Sensors"
        sensors={[
          { name: "ACS712 Current Sensor", status: "active" as const },
          { name: "ZMPT101B Voltage Sensor", status: "active" as const },
          { name: "PZEM-004T Power Meter", status: "active" as const },
        ]}
      />
    </div>
  );
}
