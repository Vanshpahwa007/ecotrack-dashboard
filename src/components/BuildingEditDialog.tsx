import { useState, useEffect } from "react";
import { Building2, Cpu, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Building } from "@/contexts/HostelContext";

interface BuildingEditDialogProps {
  building: Building | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updates: Partial<Building>) => void;
  onDelete: () => void;
}

export function BuildingEditDialog({
  building,
  open,
  onOpenChange,
  onSave,
  onDelete,
}: BuildingEditDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    microcontroller: "",
    status: "optimal" as "optimal" | "warning" | "critical",
  });

  useEffect(() => {
    if (building) {
      setFormData({
        name: building.name,
        microcontroller: building.microcontroller,
        status: building.status,
      });
    }
  }, [building]);

  const handleSave = () => {
    onSave(formData);
  };

  if (!building) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Edit Building Details
          </DialogTitle>
          <DialogDescription>
            Update building information and microcontroller connection.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Building Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter building name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="microcontroller" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Microcontroller ID
            </Label>
            <Input
              id="microcontroller"
              value={formData.microcontroller}
              onChange={(e) =>
                setFormData({ ...formData, microcontroller: e.target.value })
              }
              placeholder="e.g., ESP32-001"
            />
            <p className="text-xs text-muted-foreground">
              Enter the ESP32 microcontroller ID connected to this building
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "optimal" | "warning" | "critical") =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="optimal">Optimal</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            <h4 className="text-sm font-medium">Current Metrics</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Energy:</span>
                <span className="ml-2 font-medium">{building.energy} kWh</span>
              </div>
              <div>
                <span className="text-muted-foreground">Occupancy:</span>
                <span className="ml-2 font-medium">{building.occupancy}%</span>
              </div>
              <div>
                <span className="text-muted-foreground">Temperature:</span>
                <span className="ml-2 font-medium">{building.temperature}°C</span>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <span className="ml-2 font-medium capitalize">{building.status}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
