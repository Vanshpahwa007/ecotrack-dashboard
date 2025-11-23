import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Cpu, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Settings() {
  const [isConnected, setIsConnected] = useState(false);
  const [port, setPort] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const { toast } = useToast();

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`].slice(-10));
  };

  const connectESP32 = async () => {
    try {
      if (!('serial' in navigator)) {
        toast({
          title: 'Not Supported',
          description: 'Web Serial API is not supported in this browser. Use Chrome/Edge.',
          variant: 'destructive',
        });
        return;
      }

      const selectedPort = await (navigator as any).serial.requestPort();
      await selectedPort.open({ baudRate: 115200 });
      
      setPort(selectedPort);
      setIsConnected(true);
      addLog('ESP32 connected successfully');
      
      toast({
        title: 'Connected',
        description: 'ESP32 microcontroller connected successfully',
      });

      // Read data from ESP32
      const reader = selectedPort.readable.getReader();
      const decoder = new TextDecoder();
      
      const readLoop = async () => {
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const text = decoder.decode(value);
            addLog(`Received: ${text.trim()}`);
          }
        } catch (error) {
          addLog(`Read error: ${error}`);
        } finally {
          reader.releaseLock();
        }
      };

      readLoop();

    } catch (error) {
      addLog(`Connection error: ${error}`);
      toast({
        title: 'Connection Failed',
        description: 'Failed to connect to ESP32. Make sure it is plugged in.',
        variant: 'destructive',
      });
    }
  };

  const disconnectESP32 = async () => {
    if (port) {
      try {
        await port.close();
        setPort(null);
        setIsConnected(false);
        addLog('ESP32 disconnected');
        
        toast({
          title: 'Disconnected',
          description: 'ESP32 microcontroller disconnected',
        });
      } catch (error) {
        addLog(`Disconnect error: ${error}`);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (port) {
        port.close();
      }
    };
  }, [port]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your ESP32 microcontroller connections</p>
      </div>

      <Card className="backdrop-blur-sm bg-card/95 border-border/50 hover-scale">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                ESP32 Connection
              </CardTitle>
              <CardDescription>Connect your ESP32 microcontroller via USB</CardDescription>
            </div>
            <Badge variant={isConnected ? 'default' : 'secondary'} className="animate-fade-in">
              {isConnected ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3 mr-1" />
                  Disconnected
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Make sure your ESP32 is connected via USB and you're using Chrome or Edge browser.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            {!isConnected ? (
              <Button onClick={connectESP32} className="hover-scale">
                <Wifi className="mr-2 h-4 w-4" />
                Connect ESP32
              </Button>
            ) : (
              <Button onClick={disconnectESP32} variant="destructive" className="hover-scale">
                <WifiOff className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            )}
          </div>

          {logs.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Connection Logs</h3>
              <div className="bg-muted rounded-lg p-4 max-h-48 overflow-y-auto font-mono text-xs space-y-1">
                {logs.map((log, i) => (
                  <div key={i} className="text-muted-foreground animate-fade-in">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="backdrop-blur-sm bg-card/95 border-border/50">
        <CardHeader>
          <CardTitle>Sensor Configuration</CardTitle>
          <CardDescription>ESP32 sensor specifications and wiring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Energy Sensors</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• ACS712 - Current Sensor</li>
                <li>• ZMPT101B - Voltage Sensor</li>
                <li>• PZEM-004T - Power Meter</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Water Sensors</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• YF-S201 - Flow Sensor</li>
                <li>• HC-SR04 - Level Sensor</li>
                <li>• TDS Meter - Quality Sensor</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Air Quality</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• DHT22 - Temp/Humidity</li>
                <li>• MQ-135 - Air Quality</li>
                <li>• MH-Z19 - CO2 Sensor</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Waste Management</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• HC-SR04 - Bin Level</li>
                <li>• HX711 - Load Cell</li>
                <li>• IR Sensors - Detection</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
