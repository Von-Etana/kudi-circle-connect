import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Target, Calendar, Shield, AlertTriangle } from "lucide-react";
import { KYCVerificationModal } from "./KYCVerificationModal";

interface CreateCampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateCampaignModal = ({ open, onOpenChange }: CreateCampaignModalProps) => {
  const { toast } = useToast();
  const [isKYCVerified, setIsKYCVerified] = useState(false); // In real app, this would come from user context
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: "",
    category: "",
    duration: "",
    imageUrl: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateCampaign = () => {
    if (!isKYCVerified) {
      setShowKYCModal(true);
      return;
    }

    // Proceed with campaign creation if KYC is verified
    handleSubmit(new Event('submit') as any);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.goalAmount || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Campaign Created!",
      description: `Your campaign "${formData.title}" has been created successfully and is pending approval.`,
    });

    // Reset form
    setFormData({
      title: "",
      description: "",
      goalAmount: "",
      category: "",
      duration: "",
      imageUrl: ""
    });

    onOpenChange(false);
  };

  const handleKYCComplete = () => {
    setIsKYCVerified(true);
    toast({
      title: "KYC Verification Submitted",
      description: "You can now create campaigns. Your verification is under review.",
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>
              Launch a crowdfunding campaign to raise money for your cause
            </DialogDescription>
          </DialogHeader>

          {!isKYCVerified && (
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-amber-800">KYC Verification Required</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    You need to complete KYC verification before creating campaigns to prevent fraud and ensure trust.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Campaign Title *</Label>
              <Input
                id="title"
                placeholder="Enter your campaign title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your campaign, why you need funding, and how the money will be used..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="goalAmount">Goal Amount (₦) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="goalAmount"
                    type="number"
                    placeholder="500000"
                    value={formData.goalAmount}
                    onChange={(e) => handleInputChange("goalAmount", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="charity">Charity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Campaign Duration</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="120">120 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Campaign Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                />
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h4 className="font-medium text-emerald-800 mb-2">Campaign Guidelines</h4>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• Be honest and transparent about your needs</li>
                <li>• Provide clear information about how funds will be used</li>
                <li>• Keep supporters updated on your progress</li>
                <li>• All campaigns are subject to approval</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleCreateCampaign}
                className={isKYCVerified ? "bg-emerald-600 hover:bg-emerald-700" : "bg-amber-600 hover:bg-amber-700"}
              >
                {isKYCVerified ? (
                  <>
                    <Target className="w-4 h-4 mr-2" />
                    Create Campaign
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Verify KYC & Create
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <KYCVerificationModal
        open={showKYCModal}
        onOpenChange={setShowKYCModal}
        onVerificationComplete={handleKYCComplete}
      />
    </>
  );
};
