
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAjoGroups } from "@/hooks/useAjoGroups";
import { useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAjoGroupModal({ open, onOpenChange }: Props) {
  const { toast } = useToast();
  const { createAjoGroup } = useAjoGroups();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.amount || !formData.frequency) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createAjoGroup({
        name: formData.name,
        contribution_amount: parseFloat(formData.amount),
        frequency: formData.frequency,
        description: formData.description || null,
        max_members: formData.maxMembers ? parseInt(formData.maxMembers) : 10
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
    } catch (error) {
      console.error('Error creating Ajo group:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full px-2 sm:px-8">
        <DialogHeader>
          <DialogTitle>Create Ajo Group</DialogTitle>
          <DialogDescription>
            Set up a new Ajo (rotating savings) group for your circle.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Group Name *</Label>
            <Input
              id="name"
              required
              placeholder="e.g., Family Circle"
              value={formData.name}
              onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="amount">Contribution Amount (₦) *</Label>
            <Input
              id="amount"
              type="number"
              required
              min={0}
              placeholder="e.g., 5000"
              value={formData.amount}
              onChange={e => setFormData(f => ({ ...f, amount: e.target.value }))}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="rotationType">Rotation Type</Label>
            <Select
              value={formData.rotationType}
              onValueChange={val => setFormData(f => ({ ...f, rotationType: val }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose rotation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="random">Random</SelectItem>
                <SelectItem value="fixed">Fixed Order</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="frequency">Frequency</Label>
            <Select
              value={formData.frequency}
              onValueChange={val => setFormData(f => ({ ...f, frequency: val }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                {frequencies.map(opt =>
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="duration">Duration</Label>
            <Select
              value={formData.duration}
              onValueChange={val => setFormData(f => ({ ...f, duration: val }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {durations.map(opt =>
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="maxMembers">Max Members</Label>
            <Input
              id="maxMembers"
              type="number"
              min={2}
              placeholder="e.g., 8"
              value={formData.maxMembers}
              onChange={e => setFormData(f => ({ ...f, maxMembers: e.target.value }))}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe group rules or purpose..."
              value={formData.description}
              onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full"
            />
          </div>
          <div className="flex flex-col xs:flex-row gap-2 pt-2">
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 flex-1 w-full" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Ajo"}
            </Button>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)} className="flex-1 w-full">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

