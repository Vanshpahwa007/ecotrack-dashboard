import { useState, useEffect } from "react";
import { Zap, Droplet, Trash2, Wind, Leaf, Play, Pause, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/MetricCard";
import { BuildingCard } from "@/components/BuildingCard";
import { AlertCard } from "@/components/AlertCard";
import { useHostel } from "@/contexts/HostelContext";
import { BuildingEditDialog } from "@/components/BuildingEditDialog";
import type { Building } from "@/contexts/HostelContext";

interface SensorData {
  energy: { usage: number; savings: number; solar: number; cost: number };
  water: { consumption: number; savings: number; flow: number; rainwater: number };
  waste: { total: number; recycled: number; binLevel: number };
  air: { quality: number; co2: number; temp: number; humidity: number };
}

export default function Dashboard() {
  const { config, buildings, addBuilding, updateBuilding, deleteBuilding } = useHostel();
  const [isLive, setIsLive] = useState(true);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState<SensorData>({
    energy: { usage: 850, savings: 23, solar: 320, cost: 1250 },
    water: { consumption: 1250, savings: 18, flow: 45, rainwater: 280 },
    waste: { total: 68, recycled: 45, binLevel: 65 },
    air: { quality: 92, co2: 410, temp: 23, humidity: 52 },
  });

  const sustainabilityScore = Math.round(
    (data.energy.savings + data.water.savings + data.waste.recycled + (data.air.quality - 10)) / 4
  );

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setData((prev) => ({
        energy: {
          usage: Math.max(750, Math.min(950, prev.energy.usage + (Math.random() - 0.5) * 20)),
          savings: Math.max(20, Math.min(26, prev.energy.savings + (Math.random() - 0.5) * 2)),
          solar: Math.max(280, Math.min(360, prev.energy.solar + (Math.random() - 0.5) * 15)),
          cost: Math.max(1100, Math.min(1400, prev.energy.cost + (Math.random() - 0.5) * 30)),
        },
        water: {
          consumption: Math.max(1100, Math.min(1400, prev.water.consumption + (Math.random() - 0.5) * 30)),
          savings: Math.max(15, Math.min(22, prev.water.savings + (Math.random() - 0.5) * 2)),
          flow: Math.max(40, Math.min(50, prev.water.flow + (Math.random() - 0.5) * 3)),
          rainwater: Math.max(250, Math.min(320, prev.water.rainwater + (Math.random() - 0.5) * 10)),
        },
        waste: {
          total: Math.max(60, Math.min(75, prev.waste.total + (Math.random() - 0.5) * 3)),
          recycled: Math.max(40, Math.min(50, prev.waste.recycled + (Math.random() - 0.5) * 2)),
          binLevel: Math.max(50, Math.min(85, prev.waste.binLevel + (Math.random() - 0.5) * 5)),
        },
        air: {
          quality: Math.max(85, Math.min(95, prev.air.quality + (Math.random() - 0.5) * 2)),
          co2: Math.max(380, Math.min(450, prev.air.co2 + (Math.random() - 0.5) * 10)),
          temp: Math.max(20, Math.min(26, prev.air.temp + (Math.random() - 0.5) * 1)),
          humidity: Math.max(40, Math.min(60, prev.air.humidity + (Math.random() - 0.5) * 3)),
        },
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const alerts = [
    { type: "success" as const, message: "System running optimally", timestamp: new Date().toLocaleTimeString() },
    ...(data.waste.binLevel > 75 ? [{ type: "warning" as const, message: "Waste bin level high", timestamp: new Date().toLocaleTimeString() }] : []),
    ...(data.air.co2 > 430 ? [{ type: "warning" as const, message: "CO2 levels elevated", timestamp: new Date().toLocaleTimeString() }] : []),
  ];

  const handleAddBuilding = () => {
    const newBuilding: Building = {
      id: Date.now().toString(),
      name: `Building ${buildings.length + 1}`,
      energy: Math.round(data.energy.usage * 0.25),
      occupancy: 50,
      temperature: data.air.temp,
      status: "optimal",
      microcontroller: "Not Connected"
    };
    addBuilding(newBuilding);
  };

  const handleEditBuilding = (building: Building) => {
    setSelectedBuilding(building);
    setIsDialogOpen(true);
  };

  const handleSaveBuilding = (updates: Partial<Building>) => {
    if (selectedBuilding) {
      updateBuilding(selectedBuilding.id, updates);
    }
    setIsDialogOpen(false);
    setSelectedBuilding(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Campus Dashboard</h1>
          <p className="text-muted-foreground">
            Monitoring {config.totalBuildings} buildings across {config.totalHostels} hostels
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={isLive ? "default" : "outline"}
            size="sm"
            onClick={() => setIsLive(!isLive)}
            className="hover-scale"
          >
            {isLive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isLive ? "Pause" : "Resume"}
          </Button>
          <Badge variant="secondary" className="text-lg px-4 py-2 animate-scale-in">
            <Leaf className="h-4 w-4 mr-2" />
            Sustainability Score: {sustainabilityScore}%
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={Zap}
          title="Energy Usage"
          value={`${Math.round(data.energy.usage)} kWh`}
          subtitle={`${data.energy.savings.toFixed(1)}% savings`}
          color="energy"
          trend="down"
        />
        <MetricCard
          icon={Droplet}
          title="Water Consumption"
          value={`${Math.round(data.water.consumption)} L`}
          subtitle={`${data.water.savings.toFixed(1)}% savings`}
          color="water"
          trend="down"
        />
        <MetricCard
          icon={Trash2}
          title="Waste Generated"
          value={`${Math.round(data.waste.total)} kg`}
          subtitle={`${data.waste.recycled.toFixed(1)}% recycled`}
          color="waste"
          trend="up"
        />
        <MetricCard
          icon={Wind}
          title="Air Quality"
          value={`${Math.round(data.air.quality)}`}
          subtitle={`${Math.round(data.air.co2)} ppm CO2`}
          color="air"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Building Performance</h2>
          <Button onClick={handleAddBuilding} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Building
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {buildings.map((building) => (
            <BuildingCard 
              key={building.id}
              name={building.name}
              energy={`${Math.round(building.energy)} kWh`}
              occupancy={building.occupancy}
              temperature={building.temperature}
              status={building.status}
              onClick={() => handleEditBuilding(building)}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">System Alerts</h2>
        <div className="space-y-2">
          {alerts.map((alert, i) => (
            <AlertCard key={i} {...alert} />
          ))}
        </div>
      </div>

      <BuildingEditDialog
        building={selectedBuilding}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveBuilding}
        onDelete={() => {
          if (selectedBuilding) {
            deleteBuilding(selectedBuilding.id);
            setIsDialogOpen(false);
            setSelectedBuilding(null);
          }
        }}
      />
    </div>
  );
}
