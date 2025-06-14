
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Coins, Wallet } from "lucide-react";
import { CreateGroupModal } from "./modals/CreateGroupModal";
import { JoinAjoModal } from "./modals/JoinAjoModal";
import { InviteMembersModal } from "./modals/InviteMembersModal";
import { FundWalletModal } from "./modals/FundWalletModal";

const actions = [
  {
    id: "create-group",
    icon: Plus,
    label: "Create Group",
    description: "Start a new community circle",
    color: "bg-emerald-500 hover:bg-emerald-600"
  },
  {
    id: "join-ajo",
    icon: Coins,
    label: "Join Ajo",
    description: "Find rotating savings groups",
    color: "bg-amber-500 hover:bg-amber-600"
  },
  {
    id: "invite-members",
    icon: Users,
    label: "Invite Members",
    description: "Add friends to your groups",
    color: "bg-blue-500 hover:bg-blue-600"
  },
  {
    id: "fund-wallet",
    icon: Wallet,
    label: "Fund Wallet",
    description: "Add money to your account",
    color: "bg-purple-500 hover:bg-purple-600"
  }
];

export const QuickActions = () => {
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const [joinAjoOpen, setJoinAjoOpen] = useState(false);
  const [inviteMembersOpen, setInviteMembersOpen] = useState(false);
  const [fundWalletOpen, setFundWalletOpen] = useState(false);

  const handleActionClick = (actionId: string) => {
    switch (actionId) {
      case "create-group":
        setCreateGroupOpen(true);
        break;
      case "join-ajo":
        setJoinAjoOpen(true);
        break;
      case "invite-members":
        setInviteMembersOpen(true);
        break;
      case "fund-wallet":
        setFundWalletOpen(true);
        break;
    }
  };

  return (
    <>
      <Card className="border-emerald-100">
        <CardHeader>
          <CardTitle className="text-emerald-800">Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {actions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                onClick={() => handleActionClick(action.id)}
                className={`h-auto p-4 flex flex-col items-center space-y-2 border-gray-200 hover:shadow-md transition-all duration-200 ${action.color} hover:text-white group active:scale-95`}
              >
                <action.icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                <div className="text-center">
                  <p className="font-medium text-sm text-gray-900 group-hover:text-white transition-colors">{action.label}</p>
                  <p className="text-xs text-gray-500 group-hover:text-white/80 transition-colors">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <CreateGroupModal open={createGroupOpen} onOpenChange={setCreateGroupOpen} />
      <JoinAjoModal open={joinAjoOpen} onOpenChange={setJoinAjoOpen} />
      <InviteMembersModal open={inviteMembersOpen} onOpenChange={setInviteMembersOpen} />
      <FundWalletModal open={fundWalletOpen} onOpenChange={setFundWalletOpen} />
    </>
  );
};
