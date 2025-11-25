import { useState, useEffect } from "react";
import { Wind, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DetailCard } from "@/components/DetailCard";
import { SensorList } from "@/components/SensorList";
import { useNavigate } from "react-router-dom";

interface AirData {
  quality: number;
  co2: number;
  temp: number;
  humidity: number;
}

export default function AirQuality() {
  const navigate = useNavigate();
  const [data, setData] = useState<AirData>({
    quality: 92,
    co2: 410,
    temp: 23,
    humidity: 52,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        quality: Math.max(85, Math.min(95, prev.quality + (Math.random() - 0.5) * 2)),
        co2: Math.max(380, Math.min(450, prev.co2 + (Math.random() - 0.5) * 10)),
        temp: Math.max(20, Math.min(26, prev.temp + (Math.random() - 0.5) * 1)),
        humidity: Math.max(40, Math.min(60, prev.humidity + (Math.random() - 0.5) * 3)),
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
            <Wind className="h-8 w-8 text-air" />
            Air Quality Monitoring
          </h1>
          <p className="text-muted-foreground">Real-time environmental monitoring</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <DetailCard
          icon={Wind}
          title="Air Quality Index"
          value={`${Math.round(data.quality)}`}
          subtitle="Excellent"
        />
        <DetailCard
          icon={Wind}
          title="CO2 Level"
          value={`${Math.round(data.co2)} ppm`}
          subtitle="Normal range"
        />
        <DetailCard
          icon={Wind}
          title="Temperature"
          value={`${data.temp.toFixed(1)}°C`}
          subtitle="Comfortable"
        />
        <DetailCard
          icon={Wind}
          title="Humidity"
          value={`${Math.round(data.humidity)}%`}
          subtitle="Optimal"
        />
      </div>

      <SensorList
        title="Air Quality Sensors"
        sensors={[
          { name: "DHT22 Temp/Humidity", status: "active" as const },
          { name: "MQ-135 Air Quality", status: "active" as const },
          { name: "MH-Z19 CO2 Sensor", status: "active" as const },
        ]}
      />
    </div>
  );
}
