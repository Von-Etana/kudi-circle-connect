
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface CreateGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateGroupModal = ({ open, onOpenChange }: CreateGroupModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    amount: "",
    frequency: "",
    duration: "",
    description: "",
    maxMembers: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.type || !formData.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Group Created Successfully!",
      description: `${formData.name} has been created. You can now invite members.`,
    });
    
    setFormData({
      name: "",
      type: "",
      amount: "",
      frequency: "",
      duration: "",
      description: "",
      maxMembers: ""
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
          <DialogDescription>
            Set up a new community savings group or organization
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="groupName">Group Name *</Label>
            <Input
              id="groupName"
              placeholder="e.g., Friends Circle"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="groupType">Group Type *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select group type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ajo">Ajo (Rotating Savings)</SelectItem>
                <SelectItem value="community">Community Dues</SelectItem>
                <SelectItem value="crowdfunding">Crowdfunding</SelectItem>
                <SelectItem value="investment">Investment Club</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Contribution Amount (₦) *</Label>
              <Input
                id="amount"
                type="number"
                placeholder="e.g., 10000"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select value={formData.frequency} onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (months)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="e.g., 12"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxMembers">Max Members</Label>
              <Input
                id="maxMembers"
                type="number"
                placeholder="e.g., 10"
                value={formData.maxMembers}
                onChange={(e) => setFormData(prev => ({ ...prev, maxMembers: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the purpose and rules of your group..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 flex-1">
              Create Group
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
