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

type RotationType = "" | "random" | "fixed";
type AmountType = "" | "fixed" | "not-fixed";

const durationOptions = [
  { label: "3 months", value: "3" },
  { label: "6 months", value: "6" },
  { label: "9 months", value: "9" },
  { label: "12 months", value: "12" },
  { label: "18 months", value: "18" },
  { label: "24 months", value: "24" },
];

export const CreateGroupModal = ({ open, onOpenChange }: CreateGroupModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    rotationType: "" as RotationType,
    amount: "",
    amountType: "" as AmountType,
    frequency: "",
    duration: "",
    customDuration: "",
    description: "",
    maxMembers: "",
  });

  const [showCustomDuration, setShowCustomDuration] = useState(false);

  const handleSelectDuration = (value: string) => {
    if (value === "custom") {
      setShowCustomDuration(true);
      setFormData((prev) => ({ ...prev, duration: "", customDuration: "" }));
    } else {
      setShowCustomDuration(false);
      setFormData((prev) => ({ ...prev, duration: value, customDuration: "" }));
    }
  };

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
      rotationType: "",
      amount: "",
      amountType: "",
      frequency: "",
      duration: "",
      customDuration: "",
      description: "",
      maxMembers: "",
    });
    setShowCustomDuration(false);
    onOpenChange(false);
  };

  // Determine UI states
  const isAjo = formData.type === "ajo";
  const isOtherGroup = !!formData.type && formData.type !== "ajo";

  // For duration: If user selects "custom", allow custom input, else use defined durations
  const selectedDuration = showCustomDuration
    ? formData.customDuration
    : formData.duration;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-w-[96vw]">
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
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="groupType">Group Type *</Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  type: value,
                  // Reset type-specific fields on change
                  rotationType: "",
                  amountType: "",
                }))
              }
            >
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

          {/* Ajo-specific option */}
          {isAjo && (
            <div className="space-y-2">
              <Label htmlFor="rotationType">How should receivers be chosen?</Label>
              <Select
                value={formData.rotationType}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, rotationType: val as RotationType }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose rotation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Random Selection</SelectItem>
                  <SelectItem value="fixed">Fixed Rotation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Other group types: Fixed/Not Fixed contribution option */}
          {isOtherGroup && (
            <div className="space-y-2">
              <Label htmlFor="amountType">Contribution Amount Type</Label>
              <Select
                value={formData.amountType}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, amountType: val as AmountType }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Fixed or Not Fixed?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                  <SelectItem value="not-fixed">Not Fixed (Open Contribution)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">
                Contribution Amount (₦) *
                {isOtherGroup && formData.amountType === "not-fixed" && " (Minimum)"}
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder={isOtherGroup && formData.amountType === "not-fixed" ? "e.g., 1000 minimum" : "e.g., 10000"}
                value={formData.amount}
                onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                required
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, frequency: value }))
                }
              >
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

          {/* Duration selection with pre-defined options and a custom input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (months)</Label>
              <Select
                value={showCustomDuration ? "custom" : formData.duration}
                onValueChange={handleSelectDuration}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Other (custom)</SelectItem>
                </SelectContent>
              </Select>
              {showCustomDuration && (
                <Input
                  className="mt-2"
                  id="customDuration"
                  type="number"
                  min={1}
                  value={formData.customDuration}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customDuration: e.target.value }))}
                  placeholder="Enter months"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxMembers">Max Members</Label>
              <Input
                id="maxMembers"
                type="number"
                placeholder="e.g., 10"
                value={formData.maxMembers}
                onChange={(e) => setFormData((prev) => ({ ...prev, maxMembers: e.target.value }))}
                min={2}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the purpose and rules of your group..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-2 pt-4">
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
