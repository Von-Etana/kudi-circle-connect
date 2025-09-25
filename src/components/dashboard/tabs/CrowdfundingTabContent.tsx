
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CreateCampaignModal } from "../modals/CreateCampaignModal";
import { Heart, Users, Copy, Plus, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCampaigns } from "@/hooks/useCampaigns";
import { format } from "date-fns";

export const CrowdfundingTabContent = () => {
  const { toast } = useToast();
  const [createCampaignOpen, setCreateCampaignOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { campaigns, myCampaigns, loading } = useCampaigns();

  const handleShareCampaign = async (campaignId: string, campaignTitle: string) => {
    const shareUrl = `${window.location.origin}/campaigns/${campaignId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(campaignId);
      toast({
        title: "Link Copied!",
        description: `Share link for "${campaignTitle}" copied to clipboard`,
      });
      setTimeout(() => setCopiedId(null), 3000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy link to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-emerald-800">Community Crowdfunding</h2>
          <p className="text-gray-600">Support community causes and raise funds</p>
        </div>
        <Button 
          onClick={() => setCreateCampaignOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-emerald-100">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded animate-pulse" />
                  <div className="h-20 bg-gray-50 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {/* My Campaigns */}
          {myCampaigns.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-emerald-800">My Campaigns</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {myCampaigns.map((campaign) => {
                  const progress = (Number(campaign.current_amount) / Number(campaign.target_amount)) * 100;
                  const daysLeft = campaign.end_date 
                    ? Math.max(0, Math.ceil((new Date(campaign.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
                    : null;

                  return (
                    <Card key={campaign.id} className="border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-purple-100 text-purple-700">{campaign.category}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleShareCampaign(campaign.id, campaign.title)}
                            className="text-purple-600"
                          >
                            {copiedId === campaign.id ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <CardTitle className="text-purple-800">{campaign.title}</CardTitle>
                        <CardDescription>{campaign.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>₦{Number(campaign.current_amount).toLocaleString()} of ₦{Number(campaign.target_amount).toLocaleString()}</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <Badge className={campaign.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}>
                            {campaign.status}
                          </Badge>
                          {daysLeft !== null && (
                            <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}</span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active Community Campaigns */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-emerald-800">Community Campaigns</h3>
            {campaigns.length === 0 ? (
              <Card className="border-emerald-100">
                <CardContent className="p-8 text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Campaigns</h3>
                  <p className="text-gray-600 mb-4">
                    Be the first to create a campaign for your community.
                  </p>
                  <Button onClick={() => setCreateCampaignOpen(true)} className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Campaign
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {campaigns.filter(c => c.created_by !== campaigns[0]?.created_by).map((campaign) => {
                  const progress = (Number(campaign.current_amount) / Number(campaign.target_amount)) * 100;
                  const daysLeft = campaign.end_date 
                    ? Math.max(0, Math.ceil((new Date(campaign.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
                    : null;

                  return (
                    <Card key={campaign.id} className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-emerald-100 text-emerald-700">{campaign.category}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleShareCampaign(campaign.id, campaign.title)}
                            className="text-emerald-600"
                          >
                            {copiedId === campaign.id ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <CardTitle className="text-emerald-800">{campaign.title}</CardTitle>
                        <CardDescription>{campaign.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>₦{Number(campaign.current_amount).toLocaleString()} of ₦{Number(campaign.target_amount).toLocaleString()}</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>Created {format(new Date(campaign.created_at), 'MMM dd')}</span>
                          </div>
                          {daysLeft !== null && (
                            <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}</span>
                          )}
                        </div>

                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                          <Heart className="w-4 h-4 mr-2" />
                          Support Campaign
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      <CreateCampaignModal 
        open={createCampaignOpen} 
        onOpenChange={setCreateCampaignOpen} 
      />
    </div>
  );
};
