
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Shield, Upload, AlertTriangle } from "lucide-react";

interface KYCVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerificationComplete: () => void;
}

export const KYCVerificationModal = ({ open, onOpenChange, onVerificationComplete }: KYCVerificationModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    idType: "",
    idNumber: "",
    phoneNumber: "",
    address: "",
    bankAccountNumber: "",
    bankName: "",
    bvn: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.idType || !formData.idNumber || !formData.phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields for KYC verification.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "KYC Verification Submitted!",
      description: "Your documents are under review. You'll be notified within 24-48 hours.",
    });

    // Reset form
    setFormData({
      fullName: "",
      dateOfBirth: "",
      idType: "",
      idNumber: "",
      phoneNumber: "",
      address: "",
      bankAccountNumber: "",
      bankName: "",
      bvn: ""
    });

    onVerificationComplete();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            KYC Verification Required
          </DialogTitle>
          <DialogDescription>
            Complete KYC verification to create campaigns and prevent fraud
          </DialogDescription>
        </DialogHeader>

        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800">Why KYC is Required</h4>
              <p className="text-sm text-amber-700 mt-1">
                KYC verification helps us prevent fraud, ensure campaign authenticity, and build trust within our community.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="idType">ID Type *</Label>
              <Select value={formData.idType} onValueChange={(value) => handleInputChange("idType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nin">National ID (NIN)</SelectItem>
                  <SelectItem value="passport">International Passport</SelectItem>
                  <SelectItem value="drivers">Driver's License</SelectItem>
                  <SelectItem value="voters">Voter's Card</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber">ID Number *</Label>
              <Input
                id="idNumber"
                placeholder="Enter ID number"
                value={formData.idNumber}
                onChange={(e) => handleInputChange("idNumber", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                placeholder="+234 xxx xxx xxxx"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bvn">BVN</Label>
              <Input
                id="bvn"
                placeholder="Bank Verification Number"
                value={formData.bvn}
                onChange={(e) => handleInputChange("bvn", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Enter your full address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                placeholder="Your bank name"
                value={formData.bankName}
                onChange={(e) => handleInputChange("bankName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankAccountNumber">Account Number</Label>
              <Input
                id="bankAccountNumber"
                placeholder="Bank account number"
                value={formData.bankAccountNumber}
                onChange={(e) => handleInputChange("bankAccountNumber", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Upload ID Document</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                Click to upload or drag and drop your ID document
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG or PDF (max. 5MB)
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">Verification Process</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Your information is encrypted and securely stored</li>
              <li>• Verification typically takes 24-48 hours</li>
              <li>• You'll receive email notifications about status updates</li>
              <li>• KYC is required only once for campaign creation</li>
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
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Shield className="w-4 h-4 mr-2" />
              Submit for Verification
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
