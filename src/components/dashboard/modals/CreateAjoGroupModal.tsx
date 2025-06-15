
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAjoGroupModal({ open, onOpenChange }: Props) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    frequency: "",
    duration: "",
    rotationType: "",
    description: "",
    maxMembers: "",
  });

  const frequencies = [
    { label: "Weekly", value: "weekly" },
    { label: "Bi-weekly", value: "bi-weekly" },
    { label: "Monthly", value: "monthly" },
  ];
  const durations = [
    { label: "3 months", value: "3" },
    { label: "6 months", value: "6" },
    { label: "12 months", value: "12" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Ajo Group Created!",
      description: `${formData.name} group has been created. Invite members to start saving together!`,
    });
    setFormData({
      name: "",
      amount: "",
      frequency: "",
      duration: "",
      rotationType: "",
      description: "",
      maxMembers: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Ajo Group</DialogTitle>
          <DialogDescription>
            Set up a new Ajo (rotating savings) group for your circle.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Group Name *</Label>
            <Input
              id="name"
              required
              placeholder="e.g., Family Circle"
              value={formData.name}
              onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="amount">Contribution Amount (₦) *</Label>
            <Input
              id="amount"
              type="number"
              required
              min={0}
              placeholder="e.g., 5000"
              value={formData.amount}
              onChange={e => setFormData(f => ({ ...f, amount: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="rotationType">Rotation Type</Label>
            <Select
              value={formData.rotationType}
              onValueChange={val => setFormData(f => ({ ...f, rotationType: val }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose rotation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="random">Random</SelectItem>
                <SelectItem value="fixed">Fixed Order</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="frequency">Frequency</Label>
            <Select
              value={formData.frequency}
              onValueChange={val => setFormData(f => ({ ...f, frequency: val }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                {frequencies.map(opt =>
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Select
              value={formData.duration}
              onValueChange={val => setFormData(f => ({ ...f, duration: val }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {durations.map(opt =>
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="maxMembers">Max Members</Label>
            <Input
              id="maxMembers"
              type="number"
              min={2}
              placeholder="e.g., 8"
              value={formData.maxMembers}
              onChange={e => setFormData(f => ({ ...f, maxMembers: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe group rules or purpose..."
              value={formData.description}
              onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
              rows={3}
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button className="bg-emerald-600 hover:bg-emerald-700 flex-1" type="submit">Create Ajo</Button>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
