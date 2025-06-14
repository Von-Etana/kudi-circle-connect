
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Coins } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <header className="bg-white border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kudi Circle</h1>
              <p className="text-sm text-emerald-600">Community Financial Management</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              ₦45,250 Total Balance
            </Badge>
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              My Groups
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
