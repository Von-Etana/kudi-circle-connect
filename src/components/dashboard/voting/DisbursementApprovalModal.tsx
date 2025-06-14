
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Clock, DollarSign, User, FileText } from "lucide-react";

interface DisbursementRequest {
  id: string;
  requestedBy: string;
  amount: number;
  purpose: string;
  category: 'thrift' | 'dues' | 'crowdfunding';
  dateRequested: string;
  approvals: Array<{
    trusteeId: string;
    trusteeName: string;
    status: 'approved' | 'rejected' | 'pending';
    comment?: string;
    timestamp?: string;
  }>;
  status: 'pending' | 'approved' | 'rejected';
}

interface DisbursementApprovalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userRole: 'trustee' | 'member';
  userId: string;
}

export const DisbursementApprovalModal = ({ open, onOpenChange, userRole, userId }: DisbursementApprovalModalProps) => {
  const { toast } = useToast();
  const [comment, setComment] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const [requests, setRequests] = useState<DisbursementRequest[]>([
    {
      id: '1',
      requestedBy: 'John Adebayo',
      amount: 50000,
      purpose: 'Medical emergency fund for Mrs. Bello',
      category: 'thrift',
      dateRequested: '2024-06-10',
      status: 'pending',
      approvals: [
        { trusteeId: 't1', trusteeName: 'Sarah Okafor', status: 'approved', comment: 'Valid emergency case', timestamp: '2024-06-10 14:30' },
        { trusteeId: 't2', trusteeName: 'Mike Eze', status: 'pending' },
      ]
    },
    {
      id: '2',
      requestedBy: 'Grace Bello',
      amount: 25000,
      purpose: 'Community hall maintenance',
      category: 'dues',
      dateRequested: '2024-06-12',
      status: 'pending',
      approvals: [
        { trusteeId: 't1', trusteeName: 'Sarah Okafor', status: 'pending' },
        { trusteeId: 't2', trusteeName: 'Mike Eze', status: 'pending' },
      ]
    }
  ]);

  const trustees = [
    { id: 't1', name: 'Sarah Okafor' },
    { id: 't2', name: 'Mike Eze' }
  ];

  const currentUserIsTrustee = userRole === 'trustee';
  const currentTrusteeId = currentUserIsTrustee ? 't2' : null; // Simulate current user being Mike Eze

  const handleApproval = (requestId: string, decision: 'approved' | 'rejected') => {
    if (!currentUserIsTrustee || !currentTrusteeId) return;

    setRequests(prev => prev.map(request => {
      if (request.id !== requestId) return request;

      const updatedApprovals = request.approvals.map(approval => 
        approval.trusteeId === currentTrusteeId
          ? { 
              ...approval, 
              status: decision, 
              comment: comment || undefined,
              timestamp: new Date().toISOString()
            }
          : approval
      );

      // Check if request should be approved/rejected
      const approvedCount = updatedApprovals.filter(a => a.status === 'approved').length;
      const rejectedCount = updatedApprovals.filter(a => a.status === 'rejected').length;
      
      let newStatus = request.status;
      if (rejectedCount > 0) {
        newStatus = 'rejected';
      } else if (approvedCount >= 2) {
        newStatus = 'approved';
      }

      return {
        ...request,
        approvals: updatedApprovals,
        status: newStatus
      };
    }));

    toast({
      title: `Request ${decision}`,
      description: `You have ${decision} the disbursement request.`,
    });

    setComment("");
    setSelectedRequest(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getApprovalStatus = (request: DisbursementRequest) => {
    const approvedCount = request.approvals.filter(a => a.status === 'approved').length;
    const rejectedCount = request.approvals.filter(a => a.status === 'rejected').length;
    
    if (rejectedCount > 0) return 'Rejected';
    if (approvedCount >= 2) return 'Approved';
    return `${approvedCount}/2 Approvals`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Fund Disbursement Requests</DialogTitle>
          <DialogDescription>
            {currentUserIsTrustee 
              ? "Review and approve/reject disbursement requests" 
              : "View disbursement request status"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {requests.map((request) => {
            const userApproval = currentTrusteeId 
              ? request.approvals.find(a => a.trusteeId === currentTrusteeId)
              : null;
            const hasUserVoted = userApproval?.status !== 'pending';

            return (
              <Card key={request.id} className="border-emerald-100">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">₦{request.amount.toLocaleString()}</CardTitle>
                      <CardDescription className="mt-1">
                        Requested by {request.requestedBy} • {request.dateRequested}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(request.status)}>
                        {request.status.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">
                        {getApprovalStatus(request)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Purpose</Label>
                      <p className="text-sm text-gray-600">{request.purpose}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Category</Label>
                      <Badge variant="outline" className="ml-2">
                        {request.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Trustee Approvals */}
                  <div>
                    <Label className="text-sm font-medium">Trustee Approvals</Label>
                    <div className="mt-2 space-y-2">
                      {request.approvals.map((approval) => (
                        <div key={approval.trusteeId} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span className="text-sm font-medium">{approval.trusteeName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {approval.status === 'approved' && <CheckCircle className="w-4 h-4 text-green-600" />}
                            {approval.status === 'rejected' && <XCircle className="w-4 h-4 text-red-600" />}
                            {approval.status === 'pending' && <Clock className="w-4 h-4 text-yellow-600" />}
                            <Badge className={getStatusColor(approval.status)}>
                              {approval.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comments */}
                  {request.approvals.some(a => a.comment) && (
                    <div>
                      <Label className="text-sm font-medium">Comments</Label>
                      <div className="mt-2 space-y-2">
                        {request.approvals
                          .filter(a => a.comment)
                          .map((approval) => (
                            <div key={approval.trusteeId} className="p-2 bg-blue-50 rounded text-sm">
                              <span className="font-medium">{approval.trusteeName}:</span> {approval.comment}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Trustee Actions */}
                  {currentUserIsTrustee && !hasUserVoted && request.status === 'pending' && (
                    <div className="border-t pt-4 space-y-3">
                      <div>
                        <Label htmlFor={`comment-${request.id}`}>Comment (optional)</Label>
                        <Textarea
                          id={`comment-${request.id}`}
                          placeholder="Add your comment..."
                          value={selectedRequest === request.id ? comment : ""}
                          onChange={(e) => {
                            setComment(e.target.value);
                            setSelectedRequest(request.id);
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleApproval(request.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700 flex-1"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleApproval(request.id, 'rejected')}
                          variant="destructive"
                          className="flex-1"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  )}

                  {hasUserVoted && (
                    <div className="border-t pt-4">
                      <Badge className={getStatusColor(userApproval!.status)}>
                        You {userApproval!.status} this request
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
