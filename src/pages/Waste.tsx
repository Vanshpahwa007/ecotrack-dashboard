import { useState, useEffect } from "react";
import { Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DetailCard } from "@/components/DetailCard";
import { SensorList } from "@/components/SensorList";
import { useNavigate } from "react-router-dom";

interface WasteData {
  total: number;
  recycled: number;
  binLevel: number;
}

export default function Waste() {
  const navigate = useNavigate();
  const [data, setData] = useState<WasteData>({
    total: 68,
    recycled: 45,
    binLevel: 65,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        total: Math.max(60, Math.min(75, prev.total + (Math.random() - 0.5) * 3)),
        recycled: Math.max(40, Math.min(50, prev.recycled + (Math.random() - 0.5) * 2)),
        binLevel: Math.max(50, Math.min(85, prev.binLevel + (Math.random() - 0.5) * 5)),
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
            <Trash2 className="h-8 w-8 text-waste" />
            Waste Management
          </h1>
          <p className="text-muted-foreground">Monitor waste generation and recycling</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <DetailCard
          icon={Trash2}
          title="Total Waste"
          value={`${Math.round(data.total)} kg`}
          subtitle="Generated today"
        />
        <DetailCard
          icon={Trash2}
          title="Recycled"
          value={`${data.recycled.toFixed(1)}%`}
          subtitle="Recycling rate"
        />
        <DetailCard
          icon={Trash2}
          title="Bin Level"
          value={`${Math.round(data.binLevel)}%`}
          subtitle="Capacity used"
        />
      </div>

      <SensorList
        title="Waste Sensors"
        sensors={[
          { name: "HC-SR04 Bin Level Sensor", status: "active" as const },
          { name: "HX711 Load Cell", status: "active" as const },
          { name: "IR Proximity Sensors", status: "active" as const },
        ]}
      />
    </div>
  );
}
