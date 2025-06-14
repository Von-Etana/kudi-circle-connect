
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrusteeVotingModal } from "../voting/TrusteeVotingModal";
import { DisbursementApprovalModal } from "../voting/DisbursementApprovalModal";
import { AuditLogModal } from "../voting/AuditLogModal";
import { CommunityPollModal } from "../voting/CommunityPollModal";
import { 
  Users, 
  Vote, 
  DollarSign, 
  FileText, 
  Shield, 
  BarChart3,
  Clock,
  CheckCircle
} from "lucide-react";

export const GroupManagementTab = () => {
  const [trusteeVotingOpen, setTrusteeVotingOpen] = useState(false);
  const [disbursementOpen, setDisbursementOpen] = useState(false);
  const [auditLogOpen, setAuditLogOpen] = useState(false);
  const [communityPollOpen, setCommunityPollOpen] = useState(false);

  // Mock user data - in real app this would come from auth/context
  const currentUser = {
    id: 'user123',
    role: 'trustee' as const, // Change to 'member' to test member view
  };

  const currentGroup = "Family Circle";

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle className="text-emerald-800">Group Management</CardTitle>
            <CardDescription>
              Manage trustees, fund disbursements, and community decisions
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Current Trustees */}
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
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Okafor</p>
                    <p className="text-sm text-gray-600">Elected June 2024</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700">Trustee</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-semibold">Mike Eze</p>
                    <p className="text-sm text-gray-600">Elected June 2024</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700">Trustee</Badge>
              </div>
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

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent 
              className="p-4 text-center"
              onClick={() => setDisbursementOpen(true)}
            >
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold">Fund Requests</h3>
              <p className="text-sm text-gray-600">Review disbursements</p>
              <Badge className="mt-2 bg-yellow-100 text-yellow-700">2 Pending</Badge>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent 
              className="p-4 text-center"
              onClick={() => setCommunityPollOpen(true)}
            >
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold">Community Polls</h3>
              <p className="text-sm text-gray-600">Vote on decisions</p>
              <Badge className="mt-2 bg-green-100 text-green-700">1 Active</Badge>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent 
              className="p-4 text-center"
              onClick={() => setAuditLogOpen(true)}
            >
              <FileText className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <h3 className="font-semibold">Audit Log</h3>
              <p className="text-sm text-gray-600">View all activities</p>
              <Badge className="mt-2 bg-gray-100 text-gray-700">History</Badge>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <Vote className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <h3 className="font-semibold">Elections</h3>
              <p className="text-sm text-gray-600">Trustee voting</p>
              <Badge className="mt-2 bg-blue-100 text-blue-700">Ready</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest trustee decisions and group activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium">Disbursement Approved</p>
                  <p className="text-sm text-gray-600">₦50,000 for medical emergency - 2 trustee approvals</p>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                <Vote className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium">Community Poll Active</p>
                  <p className="text-sm text-gray-600">Sound system upgrade proposal - 26 votes cast</p>
                </div>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
                <div className="flex-1">
                  <p className="font-medium">Trustee Election Completed</p>
                  <p className="text-sm text-gray-600">Sarah Okafor and Mike Eze elected as trustees</p>
                </div>
                <span className="text-sm text-gray-500">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <TrusteeVotingModal 
        open={trusteeVotingOpen} 
        onOpenChange={setTrusteeVotingOpen}
        groupName={currentGroup}
      />

      <DisbursementApprovalModal 
        open={disbursementOpen} 
        onOpenChange={setDisbursementOpen}
        userRole={currentUser.role}
        userId={currentUser.id}
      />

      <AuditLogModal 
        open={auditLogOpen} 
        onOpenChange={setAuditLogOpen}
        groupName={currentGroup}
      />

      <CommunityPollModal 
        open={communityPollOpen} 
        onOpenChange={setCommunityPollOpen}
        groupName={currentGroup}
      />
    </>
  );
};
