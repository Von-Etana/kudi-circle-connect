
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Coins, Wallet } from "lucide-react";

const actions = [
  {
    icon: Plus,
    label: "Create Group",
    description: "Start a new community circle",
    color: "bg-emerald-500 hover:bg-emerald-600"
  },
  {
    icon: Coins,
    label: "Join Ajo",
    description: "Find rotating savings groups",
    color: "bg-amber-500 hover:bg-amber-600"
  },
  {
    icon: Users,
    label: "Invite Members",
    description: "Add friends to your groups",
    color: "bg-blue-500 hover:bg-blue-600"
  },
  {
    icon: Wallet,
    label: "Fund Wallet",
    description: "Add money to your account",
    color: "bg-purple-500 hover:bg-purple-600"
  }
];

export const QuickActions = () => {
  return (
    <Card className="border-emerald-100">
      <CardHeader>
        <CardTitle className="text-emerald-800">Quick Actions</CardTitle>
        <CardDescription>
          Common tasks and shortcuts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`h-auto p-4 flex flex-col items-center space-y-2 border-gray-200 hover:shadow-md transition-all duration-200 ${action.color} hover:text-white group`}
            >
              <action.icon className="w-6 h-6 text-gray-600 group-hover:text-white" />
              <div className="text-center">
                <p className="font-medium text-sm text-gray-900 group-hover:text-white">{action.label}</p>
                <p className="text-xs text-gray-500 group-hover:text-white/80">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
