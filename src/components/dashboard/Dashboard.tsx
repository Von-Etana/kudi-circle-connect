import { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardStats } from "./DashboardStats";
import { RecentTransactions } from "./RecentTransactions";
import { ActiveGroups } from "./ActiveGroups";
import { QuickActions } from "./QuickActions";
import { AjoTabContent } from "./tabs/AjoTabContent";
import { DuesTabContent } from "./tabs/DuesTabContent";
// import { GroupManagementTab } from "./tabs/GroupManagementTab"; // management under Dues now
import { Settings } from "./Settings";
import { UserProfile } from "./UserProfile";
import { GroupManagementTab } from "./tabs/GroupManagementTab";
import { NotificationsDropdown, useNotifications } from "./NotificationsDropdown";
import { CrowdfundingTabContent } from "./tabs/CrowdfundingTabContent"; // <-- Added import

// Use a notification context/hook to add notifications from within the dashboard or sections
export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [duesSection, setDuesSection] = useState<"main" | "management">("main");
  const notifications = useNotifications();

  // Simulate live notification when switching to modals/tabs etc.
  const handleActivity = useCallback(
    (desc: string) => {
      notifications.addNotification({
        title: "Activity",
        description: desc,
      });
    },
    [notifications]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* DashboardHeader gets showNotifications prop */}
      <DashboardHeader 
        onTabChange={setActiveTab}
        notifications={<NotificationsDropdown />}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={(val) => {
          setActiveTab(val);
          // Reset dues section when switching
          if (val !== "dues") setDuesSection("main");
        }} className="space-y-6">
          {/* Mobile-responsive, horizontally scrolling tab bar */}
          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-emerald-100 scrollbar-track-transparent">
            <TabsList
              className="
                flex w-max min-w-full mx-auto
                gap-1
                bg-white border border-emerald-100
                rounded-md
                p-1
                mb-2
                overflow-x-auto
                scrollbar-thin scrollbar-thumb-emerald-100 scrollbar-track-transparent
              "
              style={{ WebkitOverflowScrolling: "touch" }}
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
              {/* No management trigger - moved into Dues */}
              {/* No Profile/Settings tabs here */}
            </TabsList>
          </div>

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

          {/* Dues tab with internal "Management" switch/section */}
          <TabsContent value="dues" className="space-y-6">
            {/* Internal switch between Dues and Management */}
            <div className="flex gap-2 mb-4 sm:mb-6">
              <button
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  duesSection === "main"
                    ? "bg-emerald-500 text-white"
                    : "bg-emerald-100 text-emerald-700"
                }`}
                onClick={() => setDuesSection("main")}
              >
                Dues
              </button>
              <button
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  duesSection === "management"
                    ? "bg-emerald-500 text-white"
                    : "bg-emerald-100 text-emerald-700"
                }`}
                onClick={() => setDuesSection("management")}
              >
                Management
              </button>
            </div>
            {duesSection === "main" ? <DuesTabContent groupId="3c3a442a-4a86-4552-95b7-7df9c5cfdc13" /> : <GroupManagementTab groupId="3c3a442a-4a86-4552-95b7-7df9c5cfdc13" />}
          </TabsContent>

          <TabsContent value="crowd" className="space-y-6">
            <CrowdfundingTabContent />
          </TabsContent>

          {/* Hidden Management tab, Profile, Settings — triggers are in header or inside other tabs */}
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
