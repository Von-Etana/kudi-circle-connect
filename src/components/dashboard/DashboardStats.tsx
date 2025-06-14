
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Users, Wallet, Group } from "lucide-react";

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-emerald-800">Total Balance</CardTitle>
          <Wallet className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-900">₦45,250</div>
          <p className="text-xs text-emerald-600">
            +₦2,350 from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-amber-100 bg-gradient-to-br from-amber-50 to-yellow-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-amber-800">Active Ajo</CardTitle>
          <Coins className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-900">3</div>
          <p className="text-xs text-amber-600">
            Next payout in 5 days
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-800">Groups</CardTitle>
          <Group className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">7</div>
          <p className="text-xs text-blue-600">
            2 new invitations
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-800">Trust Score</CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-900">95%</div>
          <p className="text-xs text-purple-600">
            Excellent rating
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
