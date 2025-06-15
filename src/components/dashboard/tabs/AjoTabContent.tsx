import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Group, 
  Plus, 
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";
import { CreateAjoGroupModal } from "../modals/CreateAjoGroupModal";
import { AjoDetailsModal } from "../modals/AjoDetailsModal";

export const AjoTabContent = () => {
  const { toast } = useToast();
  const [showCreate, setShowCreate] = useState(false);
  const [detailsGroup, setDetailsGroup] = useState<any>(null);

  const ajoGroups = [
    {
      id: 1,
      name: "Family Circle Ajo",
      amount: 5000,
      frequency: "Weekly",
      members: 8,
      currentRound: 3,
      totalRounds: 8,
      nextPayout: "March 15, 2024",
      yourTurn: false,
      status: "active",
      progress: 37.5,
      collected: 15000,
      totalExpected: 40000
    },
    {
      id: 2,
      name: "Office Colleagues",
      amount: 20000,
      frequency: "Monthly",
      members: 12,
      currentRound: 6,
      totalRounds: 12,
      nextPayout: "August 2024",
      yourTurn: true,
      status: "active",
      progress: 50,
      collected: 120000,
      totalExpected: 240000
    },
    {
      id: 3,
      name: "University Friends",
      amount: 10000,
      frequency: "Bi-weekly",
      members: 6,
      currentRound: 6,
      totalRounds: 6,
      nextPayout: "Completed",
      yourTurn: false,
      status: "completed",
      progress: 100,
      collected: 60000,
      totalExpected: 60000
    }
  ];

  const handleCreateGroup = () => setShowCreate(true);

  const handleJoinGroup = (groupName: string) => {
    toast({
      title: "Joined Group",
      description: `You've successfully joined ${groupName}!`,
    });
  };

  const handleMakeContribution = (groupName: string, amount: number) => {
    toast({
      title: "Contribution Made",
      description: `₦${amount.toLocaleString()} contributed to ${groupName}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-emerald-800">Thrift Contributions (Ajo)</h2>
          <p className="text-gray-600">Rotating savings with your community groups</p>
        </div>
        <Button 
          onClick={handleCreateGroup}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Ajo
        </Button>
      </div>

      <CreateAjoGroupModal open={showCreate} onOpenChange={setShowCreate} />

      <div className="grid gap-6">
        {ajoGroups.map((group) => (
          <Card key={group.id} className={`border-emerald-100 ${
            group.yourTurn ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200' : 
            group.status === 'completed' ? 'bg-gray-50 border-gray-200' :
            'bg-gradient-to-r from-emerald-50 to-green-50'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className={`${
                    group.yourTurn ? 'text-amber-800' : 
                    group.status === 'completed' ? 'text-gray-700' :
                    'text-emerald-800'
                  }`}>
                    {group.name}
                  </CardTitle>
                  <CardDescription>
                    {group.frequency} ₦{group.amount.toLocaleString()} contribution
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {group.yourTurn && (
                    <Badge className="bg-amber-100 text-amber-800">Your Turn!</Badge>
                  )}
                  <Badge className={
                    group.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                    'bg-emerald-100 text-emerald-700'
                  }>
                    {group.status === 'completed' ? 'Completed' : 'Active'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>{group.members} members</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Round {group.currentRound}/{group.totalRounds}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span>₦{group.collected.toLocaleString()} collected</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{group.nextPayout}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{group.progress}%</span>
                </div>
                <Progress value={group.progress} className="h-2" />
              </div>

              <div className="flex space-x-2">
                {group.status === 'active' && (
                  <>
                    <Button 
                      size="sm" 
                      onClick={() => handleMakeContribution(group.name, group.amount)}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      <DollarSign className="w-4 h-4 mr-1" />
                      Contribute
                    </Button>
                    <Button variant="outline" size="sm"
                      onClick={() => setDetailsGroup(group)}
                    >
                      View Details
                    </Button>
                  </>
                )}
                {group.status === 'completed' && (
                  <Button variant="outline" size="sm"
                    onClick={() => setDetailsGroup(group)}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    View Summary
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <AjoDetailsModal open={!!detailsGroup} group={detailsGroup} onOpenChange={open => !open && setDetailsGroup(null)} />
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-emerald-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-lg font-semibold">₦195,000</p>
                <p className="text-xs text-gray-600">Total Saved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-emerald-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Group className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-lg font-semibold">3</p>
                <p className="text-xs text-gray-600">Active Groups</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-emerald-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-lg font-semibold">5 days</p>
                <p className="text-xs text-gray-600">Next Payout</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
