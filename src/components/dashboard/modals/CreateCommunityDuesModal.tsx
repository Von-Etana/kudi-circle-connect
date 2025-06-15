
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

export function CreateCommunityDuesModal({ open, onOpenChange }: Props) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    frequency: "",
    duration: "",
    description: "",
    deadline: "",
    maxMembers: "",
  });

  const frequencies = [
    { label: "Monthly", value: "monthly" },
    { label: "Quarterly", value: "quarterly" },
    { label: "Yearly", value: "yearly" },
  ];
  const durations = [
    { label: "3 months", value: "3" },
    { label: "6 months", value: "6" },
    { label: "12 months", value: "12" },
    { label: "24 months", value: "24" },
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
      title: "Community Dues Created!",
      description: `${formData.name} dues have been created. You can now invite members or manage payments.`,
    });
    setFormData({
      name: "",
      amount: "",
      frequency: "",
      duration: "",
      description: "",
      deadline: "",
      maxMembers: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Community Dues</DialogTitle>
          <DialogDescription>
            Launch a new community dues collection for your group or association.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Dues Title *</Label>
            <Input
              id="name"
              placeholder="e.g., Estate Security Dues"
              required
              value={formData.name}
              onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount (₦) *</Label>
            <Input
              id="amount"
              type="number"
              required
              min={0}
              placeholder="e.g., 10000"
              value={formData.amount}
              onChange={e => setFormData(f => ({ ...f, amount: e.target.value }))}
            />
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
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={e => setFormData(f => ({ ...f, deadline: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="maxMembers">Max Members</Label>
            <Input
              id="maxMembers"
              type="number"
              min={2}
              placeholder="e.g., 10"
              value={formData.maxMembers}
              onChange={e => setFormData(f => ({ ...f, maxMembers: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the dues and rules..."
              value={formData.description}
              onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
              rows={3}
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button className="bg-emerald-600 hover:bg-emerald-700 flex-1" type="submit">Create Dues</Button>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
