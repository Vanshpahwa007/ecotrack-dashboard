import { useState, useEffect } from "react";
import { 
  Zap, 
  Droplets, 
  Trash2, 
  Wind, 
  LayoutDashboard, 
  Play, 
  Pause,
  Leaf,
  Sun,
  DollarSign,
  TrendingUp,
  Gauge,
  CloudRain,
  Thermometer,
  Droplet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricCard } from "@/components/MetricCard";
import { BuildingCard } from "@/components/BuildingCard";
import { AlertCard } from "@/components/AlertCard";
import { DetailCard } from "@/components/DetailCard";
import { SensorList } from "@/components/SensorList";
import { cn } from "@/lib/utils";

interface DashboardData {
  energy: { usage: number; savings: number; solar: number; cost: number };
  water: { consumption: number; savings: number; flow: number; rainwater: number };
  waste: { total: number; recycling: number; binLevel: number };
  air: { quality: number; co2: number; temperature: number; humidity: number };
  buildings: Array<{
    name: string;
    energy: string;
    occupancy: number;
    temperature: number;
    status: "optimal" | "warning" | "critical";
  }>;
}

const Index = () => {
  const [isLive, setIsLive] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [data, setData] = useState<DashboardData>({
    energy: { usage: 850, savings: 23, solar: 145, cost: 12500 },
    water: { consumption: 1250, savings: 18, flow: 85, rainwater: 2800 },
    waste: { total: 68, recycling: 45, binLevel: 62 },
    air: { quality: 90, co2: 410, temperature: 23, humidity: 52 },
    buildings: [
      { name: "Academic Block A", energy: "185 kWh", occupancy: 78, temperature: 23, status: "optimal" },
      { name: "Library", energy: "142 kWh", occupancy: 62, temperature: 22, status: "optimal" },
      { name: "Hostel Complex", energy: "298 kWh", occupancy: 91, temperature: 24, status: "warning" },
      { name: "Lab Building", energy: "225 kWh", occupancy: 55, temperature: 21, status: "optimal" },
    ],
  });

  const sustainabilityScore = Math.round(
    (data.energy.savings + data.water.savings + data.waste.recycling + data.air.quality) / 4
  );

  // Smooth data fluctuation
  const fluctuate = (current: number, min: number, max: number, step: number = 2) => {
    const change = (Math.random() - 0.5) * step;
    const newValue = current + change;
    return Math.max(min, Math.min(max, newValue));
  };

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setData((prev) => ({
        energy: {
          usage: fluctuate(prev.energy.usage, 750, 950, 5),
          savings: fluctuate(prev.energy.savings, 20, 26, 0.5),
          solar: fluctuate(prev.energy.solar, 120, 170, 3),
          cost: fluctuate(prev.energy.cost, 11500, 13500, 100),
        },
        water: {
          consumption: fluctuate(prev.water.consumption, 1100, 1400, 8),
          savings: fluctuate(prev.water.savings, 15, 22, 0.5),
          flow: fluctuate(prev.water.flow, 75, 95, 2),
          rainwater: fluctuate(prev.water.rainwater, 2500, 3200, 50),
        },
        waste: {
          total: fluctuate(prev.waste.total, 60, 75, 1),
          recycling: fluctuate(prev.waste.recycling, 40, 50, 0.5),
          binLevel: fluctuate(prev.waste.binLevel, 50, 85, 2),
        },
        air: {
          quality: fluctuate(prev.air.quality, 85, 95, 1),
          co2: fluctuate(prev.air.co2, 380, 450, 3),
          temperature: fluctuate(prev.air.temperature, 20, 26, 0.5),
          humidity: fluctuate(prev.air.humidity, 40, 60, 1),
        },
        buildings: prev.buildings.map((building) => ({
          ...building,
          occupancy: Math.round(fluctuate(building.occupancy, 50, 95, 2)),
          temperature: Math.round(fluctuate(building.temperature, 20, 25, 0.5)),
        })),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const alerts = [
    { type: "success" as const, message: "System online - All sensors operational", timestamp: "Just now" },
    ...(data.waste.binLevel > 75
      ? [{ type: "warning" as const, message: `Waste bin level high: ${Math.round(data.waste.binLevel)}%`, timestamp: "2 min ago" }]
      : []),
    ...(data.air.co2 > 430
      ? [{ type: "warning" as const, message: `CO2 levels elevated: ${Math.round(data.air.co2)} ppm`, timestamp: "5 min ago" }]
      : []),
    { type: "info" as const, message: "Solar generation optimal for afternoon peak", timestamp: "10 min ago" },
  ];

  const energySensors = [
    { name: "ACS712 Current Sensor", status: "active" as const },
    { name: "ZMPT101B Voltage Sensor", status: "active" as const },
    { name: "PZEM-004T Power Meter", status: "active" as const },
  ];

  const waterSensors = [
    { name: "YF-S201 Flow Sensor", status: "active" as const },
    { name: "HC-SR04 Ultrasonic (Tank)", status: "active" as const },
    { name: "TDS Meter", status: "active" as const },
  ];

  const wasteSensors = [
    { name: "HC-SR04 Ultrasonic (Bins)", status: "active" as const },
    { name: "HX711 Load Cell", status: "active" as const },
    { name: "IR Motion Sensors", status: "active" as const },
  ];

  const airSensors = [
    { name: "DHT22 Temp/Humidity", status: "active" as const },
    { name: "MQ-135 Air Quality", status: "active" as const },
    { name: "MH-Z19 CO2 Sensor", status: "active" as const },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-emerald-glow/5 to-background">
      {/* Header */}
      <header className="glass-card border-b sticky top-0 z-50 backdrop-blur-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-emerald flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">EcoTrack Smart Campus</h1>
                <p className="text-sm text-muted-foreground">Real-time Sustainability Monitoring</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Sustainability Score</p>
                <p className="text-3xl font-bold text-primary animate-pulse-slow">{sustainabilityScore}%</p>
              </div>
              
              <Button
                onClick={() => setIsLive(!isLive)}
                variant={isLive ? "default" : "outline"}
                size="lg"
                className="transition-smooth"
              >
                {isLive ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="glass-card p-1 h-auto">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="energy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Zap className="w-4 h-4 mr-2" />
              Energy
            </TabsTrigger>
            <TabsTrigger value="water" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Droplets className="w-4 h-4 mr-2" />
              Water
            </TabsTrigger>
            <TabsTrigger value="waste" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Trash2 className="w-4 h-4 mr-2" />
              Waste
            </TabsTrigger>
            <TabsTrigger value="air" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Wind className="w-4 h-4 mr-2" />
              Air Quality
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                icon={Zap}
                title="Energy Usage"
                value={`${Math.round(data.energy.usage)} kWh`}
                subtitle={`${data.energy.savings.toFixed(1)}% savings`}
                color="energy"
                trend="down"
              />
              <MetricCard
                icon={Droplets}
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
                subtitle={`${data.waste.recycling.toFixed(1)}% recycled`}
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
              <h2 className="text-2xl font-bold text-foreground mb-6">Building Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.buildings.map((building, index) => (
                  <BuildingCard key={index} {...building} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">System Alerts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {alerts.map((alert, index) => (
                  <AlertCard key={index} {...alert} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Energy Tab */}
          <TabsContent value="energy" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DetailCard
                icon={Zap}
                title="Current Usage"
                value={`${Math.round(data.energy.usage)} kWh`}
                subtitle={`${data.energy.savings.toFixed(1)}% below baseline`}
              />
              <DetailCard
                icon={Sun}
                title="Solar Generation"
                value={`${Math.round(data.energy.solar)} kWh`}
                subtitle="Contributing to campus grid"
              />
              <DetailCard
                icon={DollarSign}
                title="Cost Savings"
                value={`₹${Math.round(data.energy.cost)}`}
                subtitle="This month vs last month"
              />
            </div>
            
            <SensorList title="ESP32 Energy Sensors" sensors={energySensors} />
          </TabsContent>

          {/* Water Tab */}
          <TabsContent value="water" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DetailCard
                icon={Droplets}
                title="Daily Consumption"
                value={`${Math.round(data.water.consumption)} L`}
                subtitle={`${data.water.savings.toFixed(1)}% reduction`}
              />
              <DetailCard
                icon={TrendingUp}
                title="Flow Rate"
                value={`${Math.round(data.water.flow)} L/min`}
                subtitle="Current campus average"
              />
              <DetailCard
                icon={CloudRain}
                title="Rainwater Harvested"
                value={`${Math.round(data.water.rainwater)} L`}
                subtitle="This month"
              />
            </div>
            
            <SensorList title="ESP32 Water Sensors" sensors={waterSensors} />
          </TabsContent>

          {/* Waste Tab */}
          <TabsContent value="waste" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DetailCard
                icon={Trash2}
                title="Total Waste"
                value={`${Math.round(data.waste.total)} kg`}
                subtitle="Daily collection"
              />
              <DetailCard
                icon={Leaf}
                title="Recycled"
                value={`${data.waste.recycling.toFixed(1)}%`}
                subtitle="Of total waste"
              />
              <DetailCard
                icon={Gauge}
                title="Bin Level"
                value={`${Math.round(data.waste.binLevel)}%`}
                subtitle={data.waste.binLevel > 75 ? "Collection needed soon" : "Normal levels"}
              />
            </div>
            
            <SensorList title="ESP32 Waste Sensors" sensors={wasteSensors} />
          </TabsContent>

          {/* Air Quality Tab */}
          <TabsContent value="air" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DetailCard
                icon={Wind}
                title="Air Quality Index"
                value={`${Math.round(data.air.quality)}`}
                subtitle="Good air quality"
              />
              <DetailCard
                icon={Leaf}
                title="CO2 Level"
                value={`${Math.round(data.air.co2)} ppm`}
                subtitle={data.air.co2 > 430 ? "Slightly elevated" : "Normal range"}
              />
              <DetailCard
                icon={Thermometer}
                title="Temperature"
                value={`${data.air.temperature.toFixed(1)}°C`}
                subtitle="Campus average"
              />
              <DetailCard
                icon={Droplet}
                title="Humidity"
                value={`${Math.round(data.air.humidity)}%`}
                subtitle="Comfortable range"
              />
            </div>
            
            <SensorList title="ESP32 Air Quality Sensors" sensors={airSensors} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
