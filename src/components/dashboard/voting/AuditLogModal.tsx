
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { CheckCircle, XCircle, DollarSign, Vote, Users, Calendar } from "lucide-react";

interface AuditEntry {
  id: string;
  type: 'disbursement_approved' | 'disbursement_rejected' | 'trustee_elected' | 'vote_cast';
  timestamp: string;
  actor: string;
  target?: string;
  amount?: number;
  details: string;
  category?: string;
}

interface AuditLogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupName: string;
}

export const AuditLogModal = ({ open, onOpenChange, groupName }: AuditLogModalProps) => {
  const auditEntries: AuditEntry[] = [
    {
      id: '1',
      type: 'disbursement_approved',
      timestamp: '2024-06-14 15:30',
      actor: 'Sarah Okafor (Trustee)',
      target: 'John Adebayo',
      amount: 50000,
      details: 'Medical emergency fund disbursement approved',
      category: 'thrift'
    },
    {
      id: '2',
      type: 'disbursement_approved',
      timestamp: '2024-06-14 16:45',
      actor: 'Mike Eze (Trustee)',
      target: 'John Adebayo',
      amount: 50000,
      details: 'Medical emergency fund disbursement approved (2nd approval)',
      category: 'thrift'
    },
    {
      id: '3',
      type: 'trustee_elected',
      timestamp: '2024-06-12 10:00',
      actor: 'System',
      target: 'Sarah Okafor',
      details: 'Elected as trustee with 8 votes',
    },
    {
      id: '4',
      type: 'trustee_elected',
      timestamp: '2024-06-12 10:00',
      actor: 'System',
      target: 'Mike Eze',
      details: 'Elected as trustee with 7 votes',
    },
    {
      id: '5',
      type: 'disbursement_rejected',
      timestamp: '2024-06-10 14:20',
      actor: 'Sarah Okafor (Trustee)',
      target: 'Grace Bello',
      amount: 75000,
      details: 'Personal loan request rejected - insufficient documentation',
      category: 'thrift'
    },
    {
      id: '6',
      type: 'vote_cast',
      timestamp: '2024-06-12 09:45',
      actor: 'John Adebayo',
      details: 'Cast votes in trustee election',
    },
    {
      id: '7',
      type: 'disbursement_approved',
      timestamp: '2024-06-08 11:30',
      actor: 'Sarah Okafor (Trustee)',
      target: 'Community Fund',
      amount: 25000,
      details: 'Security system upgrade approved',
      category: 'dues'
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'disbursement_approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'disbursement_rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'trustee_elected':
        return <Users className="w-4 h-4 text-blue-600" />;
      case 'vote_cast':
        return <Vote className="w-4 h-4 text-purple-600" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'disbursement_approved':
        return 'bg-green-100 text-green-700';
      case 'disbursement_rejected':
        return 'bg-red-100 text-red-700';
      case 'trustee_elected':
        return 'bg-blue-100 text-blue-700';
      case 'vote_cast':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Audit Log - {groupName}</DialogTitle>
          <DialogDescription>
            Complete history of trustee decisions and financial approvals
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Approved</p>
                <p className="text-lg font-bold text-green-600">
                  {auditEntries.filter(e => e.type === 'disbursement_approved').length}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Rejected</p>
                <p className="text-lg font-bold text-red-600">
                  {auditEntries.filter(e => e.type === 'disbursement_rejected').length}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Total Approved</p>
                <p className="text-lg font-bold text-blue-600">
                  ₦{auditEntries
                    .filter(e => e.type === 'disbursement_approved')
                    .reduce((sum, e) => sum + (e.amount || 0), 0)
                    .toLocaleString()}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Active Trustees</p>
                <p className="text-lg font-bold text-purple-600">2</p>
              </CardContent>
            </Card>
          </div>

          {/* Audit Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Actor</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getIcon(entry.type)}
                          <Badge className={getTypeColor(entry.type)}>
                            {formatType(entry.type)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {entry.actor}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{entry.details}</p>
                          {entry.target && (
                            <p className="text-xs text-gray-500">Target: {entry.target}</p>
                          )}
                          {entry.category && (
                            <Badge variant="outline" className="mt-1">
                              {entry.category}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {entry.amount ? (
                          <span className="font-medium">₦{entry.amount.toLocaleString()}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {entry.timestamp}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Export Button */}
          <div className="flex justify-end">
            <Button variant="outline">
              Export Audit Log
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
