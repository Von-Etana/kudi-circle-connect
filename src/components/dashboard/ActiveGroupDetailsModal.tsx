
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Coins } from "lucide-react";

type Group = {
  id: number;
  name: string;
  type: string;
  members: number;
  role: string;
  nextEvent: string;
  status: string;
};

interface ActiveGroupDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: Group | null;
}

export function ActiveGroupDetailsModal({ open, onOpenChange, group }: ActiveGroupDetailsModalProps) {
  if (!group) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-emerald-800">{group.name}</DialogTitle>
          <DialogDescription>
            Detailed information about this group.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{group.members} members</span>
            </div>
            <div className="flex items-center space-x-1">
              <Coins className="w-4 h-4" />
              <span>Type: {group.type}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{group.nextEvent}</span>
            </div>
          </div>
          <div>
            <Badge className="bg-emerald-100 text-emerald-700">{group.role}</Badge>
            <Badge className={group.status === 'active' ? "bg-green-100 text-green-700 ml-2" : "bg-gray-100 text-gray-700 ml-2"}>
              {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
            </Badge>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
