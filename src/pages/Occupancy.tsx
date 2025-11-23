import { useState } from 'react';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useHostel } from '@/contexts/HostelContext';
import { useToast } from '@/hooks/use-toast';

export default function Occupancy() {
  const { config, rooms, addRoom, updateRoom, deleteRoom } = useHostel();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    number: '',
    building: '',
    hostel: '',
    capacity: '',
    occupied: '',
    occupants: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const roomData = {
      id: editingRoom || `room-${Date.now()}`,
      number: formData.number,
      building: formData.building,
      hostel: formData.hostel,
      capacity: parseInt(formData.capacity),
      occupied: parseInt(formData.occupied),
      occupants: formData.occupants.split(',').map(s => s.trim()).filter(Boolean),
    };

    if (editingRoom) {
      updateRoom(editingRoom, roomData);
      toast({ title: 'Room Updated', description: 'Room information updated successfully' });
    } else {
      addRoom(roomData);
      toast({ title: 'Room Added', description: 'New room added successfully' });
    }

    setIsDialogOpen(false);
    setEditingRoom(null);
    setFormData({ number: '', building: '', hostel: '', capacity: '', occupied: '', occupants: '' });
  };

  const handleEdit = (room: any) => {
    setEditingRoom(room.id);
    setFormData({
      number: room.number,
      building: room.building,
      hostel: room.hostel,
      capacity: room.capacity.toString(),
      occupied: room.occupied.toString(),
      occupants: room.occupants.join(', '),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteRoom(id);
    toast({ title: 'Room Deleted', description: 'Room removed successfully' });
  };

  const occupancyRate = rooms.length > 0
    ? Math.round((rooms.reduce((acc, r) => acc + r.occupied, 0) / rooms.reduce((acc, r) => acc + r.capacity, 0)) * 100)
    : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Occupancy Management</h1>
          <p className="text-muted-foreground">Manage rooms and student allocation</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="hover-scale" onClick={() => {
              setEditingRoom(null);
              setFormData({ number: '', building: '', hostel: '', capacity: '', occupied: '', occupants: '' });
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRoom ? 'Edit Room' : 'Add New Room'}</DialogTitle>
              <DialogDescription>Enter room details and occupant information</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="number">Room Number</Label>
                    <Input
                      id="number"
                      value={formData.number}
                      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="building">Building</Label>
                    <Input
                      id="building"
                      value={formData.building}
                      onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hostel">Hostel Name</Label>
                  <Input
                    id="hostel"
                    value={formData.hostel}
                    onChange={(e) => setFormData({ ...formData, hostel: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      min="1"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupied">Occupied</Label>
                    <Input
                      id="occupied"
                      type="number"
                      min="0"
                      value={formData.occupied}
                      onChange={(e) => setFormData({ ...formData, occupied: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupants">Occupants (comma-separated)</Label>
                  <Input
                    id="occupants"
                    placeholder="John Doe, Jane Smith"
                    value={formData.occupants}
                    onChange={(e) => setFormData({ ...formData, occupants: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingRoom ? 'Update' : 'Add'} Room</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="backdrop-blur-sm bg-card/95 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rooms.length}/{config.totalRooms}</div>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-card/95 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-card/95 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Occupants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rooms.reduce((acc, r) => acc + r.occupied, 0)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <Card key={room.id} className="backdrop-blur-sm bg-card/95 border-border/50 hover-scale">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Room {room.number}
                  </CardTitle>
                  <CardDescription>{room.building} - {room.hostel}</CardDescription>
                </div>
                <Badge variant={room.occupied >= room.capacity ? 'destructive' : 'default'}>
                  {room.occupied}/{room.capacity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {room.occupants.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium mb-1">Occupants:</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {room.occupants.map((occupant, i) => (
                      <div key={i}>• {occupant}</div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(room)} className="flex-1">
                  <Pencil className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(room.id)} className="flex-1">
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {rooms.length === 0 && (
        <Card className="backdrop-blur-sm bg-card/95 border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No rooms added yet</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Room
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
