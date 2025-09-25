import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { useAjoGroups } from "@/hooks/useAjoGroups";
import { format } from "date-fns";

export const AjoTabContent = () => {
  const { toast } = useToast();
  const [showCreate, setShowCreate] = useState(false);
  const [detailsGroup, setDetailsGroup] = useState<any>(null);
  const { myGroups, loading } = useAjoGroups();

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

      {loading ? (
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-emerald-100">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded animate-pulse" />
                  <div className="h-20 bg-gray-50 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6">
          {myGroups.length === 0 ? (
            <Card className="border-emerald-100">
              <CardContent className="p-8 text-center">
                <Group className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Ajo Groups Yet</h3>
                <p className="text-gray-600 mb-4">
                  Create your first Ajo group or join existing ones to start saving together.
                </p>
                <Button onClick={handleCreateGroup} className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Ajo
                </Button>
              </CardContent>
            </Card>
          ) : (
            myGroups.map((membership) => {
              const group = membership.ajo_groups;
              const isActive = group.status === 'active';
              const progress = (group.current_members / group.max_members) * 100;
              
              return (
                <Card key={membership.id} className={`border-emerald-100 ${
                  isActive ? 'bg-gradient-to-r from-emerald-50 to-green-50' : 'bg-gray-50 border-gray-200'
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className={isActive ? 'text-emerald-800' : 'text-gray-700'}>
                          {group.name}
                        </CardTitle>
                        <CardDescription>
                          {group.frequency} ₦{Number(group.contribution_amount).toLocaleString()} contribution
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-emerald-100 text-emerald-700">
                          Position {membership.position}
                        </Badge>
                        <Badge className={
                          isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                        }>
                          {group.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>{group.current_members}/{group.max_members} members</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span>₦{Number(membership.total_contributed).toLocaleString()} contributed</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>Joined {format(new Date(membership.joined_at), 'MMM yyyy')}</span>
                      </div>
                      {group.next_payout_date && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>Next: {format(new Date(group.next_payout_date), 'MMM dd')}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Group Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex space-x-2">
                      {isActive && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleMakeContribution(group.name, Number(group.contribution_amount))}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            <DollarSign className="w-4 h-4 mr-1" />
                            Contribute
                          </Button>
                          <Button variant="outline" size="sm"
                            onClick={() => setDetailsGroup(membership)}
                          >
                            View Details
                          </Button>
                        </>
                      )}
                      {!isActive && (
                        <Button variant="outline" size="sm"
                          onClick={() => setDetailsGroup(membership)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          View Summary
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}
      <AjoDetailsModal open={!!detailsGroup} group={detailsGroup} onOpenChange={open => !open && setDetailsGroup(null)} />
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-emerald-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-lg font-semibold">
                  ₦{myGroups.reduce((total, membership) => total + Number(membership.total_contributed), 0).toLocaleString()}
                </p>
                <p className="text-xs text-gray-600">Total Contributed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-emerald-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Group className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-lg font-semibold">{myGroups.filter(m => m.ajo_groups.status === 'active').length}</p>
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
                <p className="text-lg font-semibold">{myGroups.length}</p>
                <p className="text-xs text-gray-600">Total Memberships</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
