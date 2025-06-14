
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Coins, User, Settings as SettingsIcon, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import * as React from "react";

interface DashboardHeaderProps {
  onTabChange?: (tab: string) => void;
  notifications?: React.ReactNode; // Pass a notifications dropdown here
}

export const DashboardHeader = ({ onTabChange, notifications }: DashboardHeaderProps) => {
  // Responsive handling for header actions
  return (
    <header className="bg-white border-b border-emerald-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 gap-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kudi Circle</h1>
              <p className="text-sm text-emerald-600">Community Financial Management</p>
            </div>
          </div>
          <div className="flex items-center gap-1 xs:gap-2 sm:gap-4">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 hidden xs:inline-flex">
              ₦45,250 Total Balance
            </Badge>
            <Button variant="outline" size="sm" className="hidden xs:flex">
              <Users className="w-4 h-4 mr-2" />
              My Groups
            </Button>
            {/* Notification Bell */}
            <div className="relative">
              {notifications}
            </div>
            {/* Profile and Settings Icon Buttons */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Profile"
              onClick={() => onTabChange && onTabChange("profile")}
              className="rounded-full"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm">AJ</AvatarFallback>
              </Avatar>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Settings"
              onClick={() => onTabChange && onTabChange("settings")}
              className="rounded-full"
            >
              <SettingsIcon className="w-6 h-6 text-emerald-700" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
