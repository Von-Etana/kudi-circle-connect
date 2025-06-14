
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardStats } from "./DashboardStats";
import { RecentTransactions } from "./RecentTransactions";
import { ActiveGroups } from "./ActiveGroups";
import { QuickActions } from "./QuickActions";
import { AjoTabContent } from "./tabs/AjoTabContent";
import { DuesTabContent } from "./tabs/DuesTabContent";
import { CrowdfundingTabContent } from "./tabs/CrowdfundingTabContent";
import { GroupManagementTab } from "./tabs/GroupManagementTab";
import { Settings } from "./Settings";
import { UserProfile } from "./UserProfile";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Pass onTabChange handler to DashboardHeader so it can set tabs */}
      <DashboardHeader onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Responsive tab list */}
          <TabsList
            className="
              flex sm:grid w-full max-w-full sm:max-w-3xl mx-auto
              overflow-x-auto sm:overflow-visible
              gap-1 sm:gap-0
              sm:grid-cols-5
              bg-white border border-emerald-100
              rounded-md
              p-1
              mb-2
              scrollbar-thin scrollbar-thumb-emerald-100 scrollbar-track-transparent
            "
          >
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-xs sm:text-sm flex-1 min-w-[80px]">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="ajo" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-xs sm:text-sm flex-1 min-w-[80px]">
              Ajo
            </TabsTrigger>
            <TabsTrigger value="dues" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-xs sm:text-sm flex-1 min-w-[80px]">
              Dues
            </TabsTrigger>
            <TabsTrigger value="crowd" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-xs sm:text-sm flex-1 min-w-[80px]">
              Crowdfunding
            </TabsTrigger>
            <TabsTrigger value="management" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-xs sm:text-sm flex-1 min-w-[80px]">
              Management
            </TabsTrigger>
            {/* Removed Profile and Settings tabs from here; they are now in header */}
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
            <AjoTabContent />
          </TabsContent>

          <TabsContent value="dues" className="space-y-6">
            <DuesTabContent />
          </TabsContent>

          <TabsContent value="crowd" className="space-y-6">
            <CrowdfundingTabContent />
          </TabsContent>

          <TabsContent value="management" className="space-y-6">
            <GroupManagementTab />
          </TabsContent>

          {/* These two remain for tab functionality, but triggers now in header */}
          <TabsContent value="profile" className="space-y-6">
            <UserProfile />
          </TabsContent>
          <TabsContent value="settings" className="space-y-6">
            <Settings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
