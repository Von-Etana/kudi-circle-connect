
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useTransactions } from "@/hooks/useTransactions";
import { format } from "date-fns";

export const RecentTransactions = () => {
  const { transactions, loading } = useTransactions();

  const getTransactionType = (type: string) => {
    if (type === 'wallet_funding' || type === 'campaign_donation') return 'debit';
    if (type === 'ajo_contribution' || type === 'community_dues') return 'debit';
    return 'credit';
  };

  if (loading) {
    return (
      <Card className="border-emerald-100">
        <CardHeader>
          <CardTitle className="text-emerald-800">Recent Transactions</CardTitle>
          <CardDescription>
            Loading your latest financial activities...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-emerald-100">
      <CardHeader>
        <CardTitle className="text-emerald-800">Recent Transactions</CardTitle>
        <CardDescription>
          Your latest financial activities across all groups
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No transactions yet. Start by funding your wallet or joining a group.
            </div>
          ) : (
            transactions.slice(0, 5).map((transaction) => {
              const transactionType = getTransactionType(transaction.type);
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transactionType === "credit" 
                        ? "bg-emerald-100 text-emerald-600" 
                        : "bg-red-100 text-red-600"
                    }`}>
                      {transactionType === "credit" ? (
                        <ArrowDown className="w-4 h-4" />
                      ) : (
                        <ArrowUp className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description || transaction.type}</p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(transaction.created_at), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transactionType === "credit" 
                          ? "text-emerald-600" 
                          : "text-red-600"
                      }`}>
                        {transactionType === "credit" ? "+" : "-"}₦{Number(transaction.amount).toLocaleString()}
                      </p>
                      <Badge
                        variant={transaction.status === "completed" ? "outline" : "secondary"}
                        className={
                          transaction.status === "completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};
