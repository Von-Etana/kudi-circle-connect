
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Clock, User, Info, Loader2 } from "lucide-react";
import { useGovernance, Disbursement, GroupMember } from "@/hooks/useGovernance";
import { format } from "date-fns";

interface DisbursementApprovalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userRole: 'trustee' | 'member' | 'admin';
  userId: string;
  disbursements: Disbursement[];
  members: GroupMember[];
  approveDisbursement: (disbursementId: string, decision: 'approved' | 'rejected', comment?: string) => Promise<void>;
  loading: boolean;
}

export const DisbursementApprovalModal = ({
  open,
  onOpenChange,
  userRole,
  userId,
  disbursements,
  members,
  approveDisbursement,
  loading
}: DisbursementApprovalModalProps) => {
  const { toast } = useToast();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);

  const trustees = members.filter(m => m.role === 'trustee');
  const currentUserIsTrustee = userRole === 'trustee' || userRole === 'admin';

  const handleApproval = async (requestId: string, decision: 'approved' | 'rejected') => {
    if (!currentUserIsTrustee) return;

    setIsSubmitting(requestId);
    try {
      await approveDisbursement(requestId, decision, comment);
      toast({
        title: `Request ${decision}`,
        description: `You have ${decision} the disbursement request.`,
      });
      setComment("");
    } catch (error) {
      // Error toast is handled by the hook
    } finally {
      setIsSubmitting(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getApprovalStatusText = (request: Disbursement) => {
    const requiredApprovals = Math.min(2, trustees.length);
    if (request.status === 'rejected') return 'Rejected';
    if (request.status === 'approved') return 'Approved';
    return `${request.approvals.length}/${requiredApprovals} Approvals`;
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

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : disbursements.length === 0 ? (
          <div className="text-center py-10">
            <Info className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">No Requests</h3>
            <p className="text-gray-500">There are no pending disbursement requests.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {disbursements.map((request) => {
              const userHasVoted = request.approvals.includes(userId);
              const requestor = members.find(m => m.user_id === request.created_by);

              return (
                <Card key={request.id} className="border-emerald-100">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">₦{request.amount.toLocaleString()}</CardTitle>
                        <CardDescription className="mt-1">
                          Requested by {requestor?.name || 'Unknown User'} • {format(new Date(request.created_at), 'MMM dd, yyyy')}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getStatusColor(request.status)}>
                          {request.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          {getApprovalStatusText(request)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Purpose</Label>
                      <p className="text-sm text-gray-600">{request.title}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Trustee Approvals</Label>
                      <div className="mt-2 space-y-2">
                        {trustees.map((trustee) => {
                          const hasApproved = request.approvals.includes(trustee.user_id);
                          return (
                            <div key={trustee.user_id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <span className="text-sm font-medium">{trustee.name}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                {hasApproved ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Clock className="w-4 h-4 text-yellow-600" />}
                                <Badge className={getStatusColor(hasApproved ? 'approved' : 'pending')}>
                                  {hasApproved ? 'Approved' : 'Pending'}
                                </Badge>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {currentUserIsTrustee && !userHasVoted && request.status === 'pending' && (
                      <div className="border-t pt-4 space-y-3">
                        <div>
                          <Label htmlFor={`comment-${request.id}`}>Comment (optional)</Label>
                          <Textarea
                            id={`comment-${request.id}`}
                            placeholder="Add your comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleApproval(request.id, 'approved')}
                            className="bg-green-600 hover:bg-green-700 flex-1"
                            disabled={isSubmitting === request.id}
                          >
                            {isSubmitting === request.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleApproval(request.id, 'rejected')}
                            variant="destructive"
                            className="flex-1"
                            disabled={isSubmitting === request.id}
                          >
                            {isSubmitting === request.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4 mr-2" />}
                            Reject
                          </Button>
                        </div>
                      </div>
                    )}

                    {userHasVoted && (
                      <div className="border-t pt-4">
                        <Badge className={getStatusColor('approved')}>
                          You have voted on this request
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
