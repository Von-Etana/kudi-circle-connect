
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Coins, Wallet, Group } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { ActiveGroups } from "@/components/dashboard/ActiveGroups";
import { QuickActions } from "@/components/dashboard/QuickActions";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 bg-white border border-emerald-100">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="ajo" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              Ajo
            </TabsTrigger>
            <TabsTrigger value="dues" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              Dues
            </TabsTrigger>
            <TabsTrigger value="crowd" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
              Crowdfunding
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6">
              <DashboardStats />
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <RecentTransactions />
                </div>
                <div className="space-y-6">
                  <ActiveGroups />
                  <QuickActions />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ajo" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="dues" className="space-y-6">
            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="text-emerald-800">Community Dues</CardTitle>
                <CardDescription>
                  Track and manage your group dues and payments
                </CardDescription>
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
                
                <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700">
                  <Wallet className="w-4 h-4 mr-2" />
                  Pay Outstanding Dues
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crowd" className="space-y-6">
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
                
                <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700">
                  Create New Campaign
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
