
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { TrusteeVotingModal } from "../voting/TrusteeVotingModal";
import { DisbursementApprovalModal } from "../voting/DisbursementApprovalModal";
import { AuditLogModal } from "../voting/AuditLogModal";
import { CommunityPollModal } from "../voting/CommunityPollModal";
import { useGovernance } from "@/hooks/useGovernance";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { 
  Users, 
  Vote, 
  DollarSign, 
  FileText, 
  Shield, 
  BarChart3,
  CheckCircle,
  Loader2
} from "lucide-react";

interface GroupManagementTabProps {
  groupId: string;
}

export const GroupManagementTab = ({ groupId }: GroupManagementTabProps) => {
  const [trusteeVotingOpen, setTrusteeVotingOpen] = useState(false);
  const [disbursementOpen, setDisbursementOpen] = useState(false);
  const [auditLogOpen, setAuditLogOpen] = useState(false);
  const [communityPollOpen, setCommunityPollOpen] = useState(false);
  const [votingRestriction, setVotingRestriction] = useState<"everyone" | "trustees">("everyone");

  const { user } = useAuth();
  const {
    loading,
    members,
    polls,
    disbursements,
    auditLogs,
    approveDisbursement,
    refreshData,
  } = useGovernance(groupId);

  const currentUser = members.find(m => m.user_id === user?.id) || { role: 'member', name: 'Guest' };
  const trustees = members.filter(m => m.role === 'trustee');
  const pendingDisbursements = disbursements.filter(d => d.status === 'pending');
  const activePolls = polls.filter(p => p.status === 'active');

  const getActivityIcon = (activity: string) => {
    if (activity.toLowerCase().includes('disbursement')) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (activity.toLowerCase().includes('poll')) return <Vote className="w-5 h-5 text-blue-600" />;
    if (activity.toLowerCase().includes('election')) return <Users className="w-5 h-5 text-purple-600" />;
    return <FileText className="w-5 h-5 text-gray-600" />;
  };

  return (
    <>
      <div className="space-y-6">
        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle className="text-emerald-800">Group Management</CardTitle>
            <CardDescription>
              Manage trustees, fund disbursements, and community decisions
            </CardDescription>
          </CardHeader>
        </Card>

        {currentUser.role === 'admin' && (
          <Card className="border-emerald-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Vote className="w-5 h-5 text-emerald-600" />
                <span>Voting Permissions</span>
              </CardTitle>
              <CardDescription>
                Who is allowed to participate in group votes and decision polls?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-5">
                <span className="font-medium">Only Admins/Trustees</span>
                <Switch
                  checked={votingRestriction === "everyone"}
                  onCheckedChange={(state) => setVotingRestriction(state ? "everyone" : "trustees")}
                  id="voting-permission-toggle"
                />
                <span className="font-medium">Everyone</span>
              </div>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : (
          <>
            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span>Current Trustees</span>
                </CardTitle>
                <CardDescription>
                  Elected trustees managing group funds and decisions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {trustees.map(trustee => (
                    <div key={trustee.user_id} className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-emerald-700" />
                        </div>
                        <div>
                          <p className="font-semibold">{trustee.name}</p>
                          <p className="text-sm text-gray-600">Elected {formatDistanceToNow(new Date(trustee.joined_at))} ago</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700">Trustee</Badge>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => setTrusteeVotingOpen(true)}
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700"
                >
                  <Vote className="w-4 h-4 mr-2" />
                  Start Trustee Election
                </Button>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setDisbursementOpen(true)}>
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Fund Requests</h3>
                  <p className="text-sm text-gray-600">Review disbursements</p>
                  <Badge className="mt-2 bg-yellow-100 text-yellow-700">{pendingDisbursements.length} Pending</Badge>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCommunityPollOpen(true)}>
                <CardContent className="p-4 text-center">
                  <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Community Polls</h3>
                  <p className="text-sm text-gray-600">Vote on decisions</p>
                  <Badge className="mt-2 bg-green-100 text-green-700">{activePolls.length} Active</Badge>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setAuditLogOpen(true)}>
                <CardContent className="p-4 text-center">
                  <FileText className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Audit Log</h3>
                  <p className="text-sm text-gray-600">View all activities</p>
                  <Badge className="mt-2 bg-gray-100 text-gray-700">History</Badge>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setTrusteeVotingOpen(true)}>
                <CardContent className="p-4 text-center">
                  <Vote className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Elections</h3>
                  <p className="text-sm text-gray-600">Trustee voting</p>
                  <Badge className="mt-2 bg-blue-100 text-blue-700">Ready</Badge>
                </CardContent>
              </Card>
            </div>

            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest trustee decisions and group activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditLogs.slice(0, 3).map(log => (
                    <div key={log.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      {getActivityIcon(log.activity)}
                      <div className="flex-1">
                        <p className="font-medium">{log.activity.split(' was ')[0]}</p>
                        <p className="text-sm text-gray-600">{log.activity}</p>
                      </div>
                      <span className="text-sm text-gray-500">{formatDistanceToNow(new Date(log.created_at))} ago</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Modals */}
      <TrusteeVotingModal 
        open={trusteeVotingOpen} 
        onOpenChange={setTrusteeVotingOpen}
        groupName={"Family Circle"}
      />

      <DisbursementApprovalModal 
        open={disbursementOpen} 
        onOpenChange={setDisbursementOpen}
        userRole={currentUser.role}
        userId={user?.id || ''}
        disbursements={disbursements}
        members={members}
        approveDisbursement={approveDisbursement}
        loading={loading}
      />

      <AuditLogModal 
        open={auditLogOpen} 
        onOpenChange={setAuditLogOpen}
        groupName={"Family Circle"}
      />

      <CommunityPollModal 
        open={communityPollOpen} 
        onOpenChange={setCommunityPollOpen}
        groupName={"Family Circle"}
        currentUser={{ id: user?.id || '', role: currentUser.role, isAdmin: currentUser.role === 'admin' }}
        votingRestriction={votingRestriction}
      />
    </>
  );
};

