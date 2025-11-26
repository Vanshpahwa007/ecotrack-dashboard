import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Home, DoorOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useHostel } from '@/contexts/HostelContext';
import { useToast } from '@/hooks/use-toast';

export default function Setup() {
  const [hostels, setHostels] = useState('');
  const [rooms, setRooms] = useState('');
  const [buildings, setBuildings] = useState('');
  const navigate = useNavigate();
  const { setConfig } = useHostel();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const hostelCount = parseInt(hostels);
    const roomCount = parseInt(rooms);
    const buildingCount = parseInt(buildings);

    if (!hostelCount || !roomCount || !buildingCount || hostelCount < 1 || roomCount < 1 || buildingCount < 1) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter valid numbers for all fields',
        variant: 'destructive',
      });
      return;
    }

    setConfig({
      totalHostels: hostelCount,
      totalRooms: roomCount,
      totalBuildings: buildingCount,
      isConfigured: true,
    });

    toast({
      title: 'Setup Complete',
      description: 'Your campus configuration has been saved',
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      <Card className="w-full max-w-md animate-fade-in backdrop-blur-sm bg-background/95 border-border/50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
            <Building2 className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Welcome to EcoTrack</CardTitle>
          <CardDescription>Configure your smart campus settings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="hostels" className="flex items-center gap-2">
                <Home className="h-4 w-4 text-primary" />
                Number of Hostels
              </Label>
              <Input
                id="hostels"
                type="number"
                min="1"
                placeholder="e.g., 5"
                value={hostels}
                onChange={(e) => setHostels(e.target.value)}
                required
                className="transition-all hover:border-primary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="buildings" className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-secondary" />
                Number of Buildings
              </Label>
              <Input
                id="buildings"
                type="number"
                min="1"
                placeholder="e.g., 4"
                value={buildings}
                onChange={(e) => setBuildings(e.target.value)}
                required
                className="transition-all hover:border-secondary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rooms" className="flex items-center gap-2">
                <DoorOpen className="h-4 w-4 text-accent" />
                Total Number of Rooms
              </Label>
              <Input
                id="rooms"
                type="number"
                min="1"
                placeholder="e.g., 200"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                required
                className="transition-all hover:border-accent/50"
              />
            </div>

            <Button type="submit" className="w-full hover-scale">
              Complete Setup
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
