
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreateCampaignModal } from "../modals/CreateCampaignModal";

export const CrowdfundingTabContent = () => {
  const [createCampaignOpen, setCreateCampaignOpen] = useState(false);

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
                <h3 className="font-semibold text-blue-800 mb-2">Medical Treatment for Mrs. Adebayo</h3>
                <p className="text-sm text-gray-600 mb-3">Goal: ₦500,000</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">Raised:</span>
                  <span className="font-semibold text-blue-700">₦325,000 (65%)</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2 mb-3">
                  <div className="bg-blue-500 h-2 rounded-full w-2/3"></div>
                </div>
                <Badge className="bg-blue-100 text-blue-700">Medical</Badge>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Community Hall Renovation</h3>
                <p className="text-sm text-gray-600 mb-3">Goal: ₦2,000,000</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">Raised:</span>
                  <span className="font-semibold text-purple-700">₦850,000 (43%)</span>
                </div>
                <div className="w-full bg-purple-100 rounded-full h-2 mb-3">
                  <div className="bg-purple-500 h-2 rounded-full w-2/5"></div>
                </div>
                <Badge className="bg-purple-100 text-purple-700">Community</Badge>
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
