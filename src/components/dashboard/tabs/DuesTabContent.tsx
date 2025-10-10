import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Loader2, Info } from "lucide-react";
import { useState } from "react";
import { CreateCommunityDuesModal } from "../modals/CreateCommunityDuesModal";
import { PayDuesModal } from "../modals/PayDuesModal";
import { useDues, Due } from "@/hooks/useDues";
import { format } from "date-fns";

interface DuesTabContentProps {
  groupId: string;
}

export const DuesTabContent = ({ groupId }: DuesTabContentProps) => {
  const [showCreate, setShowCreate] = useState(false);
  const [dueToPay, setDueToPay] = useState<Due | null>(null);

  const { dues, loading, createDue, payDue, refreshDues } = useDues(groupId);

  const outstandingDues = dues.filter(d => d.status === 'unpaid' || d.status === 'overdue');

  const getStatusBadge = (status: Due['status']) => {
    switch (status) {
      case 'paid':
        return <Badge variant="outline">Paid</Badge>;
      case 'unpaid':
        return <Badge className="bg-emerald-100 text-emerald-700">Upcoming</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
    }
  };

  const getStatusBg = (status: Due['status']) => {
    switch (status) {
      case 'paid':
        return "bg-gray-50 border-gray-200";
      case 'unpaid':
        return "bg-emerald-50 border-emerald-200";
      case 'overdue':
        return "bg-red-50 border-red-200";
    }
  }

  return (
    <Card className="border-emerald-100">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-emerald-800">Community Dues</CardTitle>
            <CardDescription>
              Track and manage your group dues and payments
            </CardDescription>
          </div>
          <Button
            className="bg-emerald-100/90 text-emerald-700 hover:bg-emerald-200"
            onClick={() => setShowCreate(true)}
            size="sm"
          >
            + Create Dues
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
        ) : dues.length === 0 ? (
          <div className="text-center py-10">
            <Info className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">No Dues Found</h3>
            <p className="text-gray-500">There are no dues recorded for this group yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {dues.map(due => (
              <div key={due.id} className={`flex items-center justify-between p-4 rounded-lg ${getStatusBg(due.status)}`}>
                <div>
                  <h3 className={`font-semibold text-gray-800`}>{due.title}</h3>
                  <p className="text-sm text-gray-600">
                    ₦{due.amount.toLocaleString()} - Due: {format(new Date(due.due_date), 'MMM dd, yyyy')}
                  </p>
                </div>
                {getStatusBadge(due.status)}
              </div>
            ))}
          </div>
        )}
        
        {outstandingDues.length > 0 && (
          <Button
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
            onClick={() => setDueToPay(outstandingDues[0])} // Pay the first outstanding due
          >
            <Wallet className="w-4 h-4 mr-2" />
            Pay Outstanding Dues (₦{outstandingDues.reduce((sum, d) => sum + d.amount, 0).toLocaleString()})
          </Button>
        )}
      </CardContent>

      <CreateCommunityDuesModal
        open={showCreate}
        onOpenChange={setShowCreate}
        onSubmit={async (data) => {
          await createDue(data);
          setShowCreate(false);
        }}
      />
      {dueToPay && (
        <PayDuesModal
          open={!!dueToPay}
          onOpenChange={() => setDueToPay(null)}
          duesTitle={dueToPay.title}
          amount={dueToPay.amount}
          onPay={async () => {
            await payDue(dueToPay.id, dueToPay.amount);
            setDueToPay(null);
          }}
        />
      )}
    </Card>
  );
};
