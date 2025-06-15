import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";
import { useState } from "react";
import { CreateCommunityDuesModal } from "../modals/CreateCommunityDuesModal";
import { PayDuesModal } from "../modals/PayDuesModal";

export const DuesTabContent = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showPay, setShowPay] = useState(false);

  return (
    <Card className="border-emerald-100">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-emerald-800">Community Dues</CardTitle>
            <CardDescription>
              Track and manage your group dues and payments
            </CardDescription>
          </div>
          <Button
            className="bg-emerald-100/90 text-emerald-700 hover:bg-emerald-200"
            onClick={() => setShowCreate(true)}
            size="sm"
          >
            + Create Dues
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
            <div>
              <h3 className="font-semibold text-red-800">Estate Security Dues</h3>
              <p className="text-sm text-red-600">₦15,000 - Due: March 10, 2024</p>
            </div>
            <Badge variant="destructive">Overdue</Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <div>
              <h3 className="font-semibold text-emerald-800">Alumni Association</h3>
              <p className="text-sm text-emerald-600">₦5,000 - Due: March 20, 2024</p>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700">Upcoming</Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-800">Church Building Fund</h3>
              <p className="text-sm text-gray-600">₦10,000 - Paid: February 28, 2024</p>
            </div>
            <Badge variant="outline">Paid</Badge>
          </div>
        </div>
        
        <Button
          className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setShowPay(true)}
        >
          <Wallet className="w-4 h-4 mr-2" />
          Pay Outstanding Dues
        </Button>
      </CardContent>
      <CreateCommunityDuesModal open={showCreate} onOpenChange={setShowCreate} />
      <PayDuesModal open={showPay} onOpenChange={setShowPay} duesTitle="Estate Security Dues" amount={15000} />
    </Card>
  );
};
