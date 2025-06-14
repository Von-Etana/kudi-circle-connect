
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Group } from "lucide-react";

export const AjoTabContent = () => {
  return (
    <Card className="border-emerald-100">
      <CardHeader>
        <CardTitle className="text-emerald-800">Thrift Contributions (Ajo)</CardTitle>
        <CardDescription>
          Rotating savings with your community groups
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-emerald-800 mb-2">Family Circle Ajo</h3>
              <p className="text-sm text-gray-600 mb-3">Weekly ₦5,000 contribution</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500">Next payout:</span>
                <Badge className="bg-emerald-100 text-emerald-700">March 15</Badge>
              </div>
              <div className="w-full bg-emerald-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-3/4"></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-amber-800 mb-2">Office Colleagues</h3>
              <p className="text-sm text-gray-600 mb-3">Monthly ₦20,000 contribution</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500">Your turn:</span>
                <Badge className="bg-amber-100 text-amber-700">August 2024</Badge>
              </div>
              <div className="w-full bg-amber-100 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700">
          <Group className="w-4 h-4 mr-2" />
          Create New Ajo Group
        </Button>
      </CardContent>
    </Card>
  );
};
