
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreateCampaignModal } from "../modals/CreateCampaignModal";
import { Share2, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CrowdfundingTabContent = () => {
  const [createCampaignOpen, setCreateCampaignOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleShareCampaign = async (campaignId: string, campaignTitle: string) => {
    const shareUrl = `${window.location.origin}/campaign/${campaignId}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(campaignId);
      setTimeout(() => setCopiedId(null), 2000);
      
      toast({
        title: "Link Copied!",
        description: `Share link for "${campaignTitle}" has been copied to clipboard.`,
      });
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Could not copy link to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card className="border-emerald-100">
        <CardHeader>
          <CardTitle className="text-emerald-800">Active Campaigns</CardTitle>
          <CardDescription>
            Support community causes and personal fundraising
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-blue-800">Medical Treatment for Mrs. Adebayo</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShareCampaign("med-001", "Medical Treatment for Mrs. Adebayo")}
                    className="h-8 w-8 p-0"
                  >
                    {copiedId === "med-001" ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Share2 className="h-4 w-4 text-blue-600" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-3">Goal: ₦500,000</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">Raised:</span>
                  <span className="font-semibold text-blue-700">₦325,000 (65%)</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2 mb-3">
                  <div className="bg-blue-500 h-2 rounded-full w-2/3"></div>
                </div>
                <div className="flex justify-between items-center">
                  <Badge className="bg-blue-100 text-blue-700">Medical</Badge>
                  <Badge className="bg-green-100 text-green-700">KYC Verified</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-purple-800">Community Hall Renovation</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShareCampaign("comm-001", "Community Hall Renovation")}
                    className="h-8 w-8 p-0"
                  >
                    {copiedId === "comm-001" ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Share2 className="h-4 w-4 text-purple-600" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-3">Goal: ₦2,000,000</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">Raised:</span>
                  <span className="font-semibold text-purple-700">₦850,000 (43%)</span>
                </div>
                <div className="w-full bg-purple-100 rounded-full h-2 mb-3">
                  <div className="bg-purple-500 h-2 rounded-full w-2/5"></div>
                </div>
                <div className="flex justify-between items-center">
                  <Badge className="bg-purple-100 text-purple-700">Community</Badge>
                  <Badge className="bg-green-100 text-green-700">KYC Verified</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Button 
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
            onClick={() => setCreateCampaignOpen(true)}
          >
            Create New Campaign
          </Button>
        </CardContent>
      </Card>

      <CreateCampaignModal 
        open={createCampaignOpen} 
        onOpenChange={setCreateCampaignOpen} 
      />
    </>
  );
};
