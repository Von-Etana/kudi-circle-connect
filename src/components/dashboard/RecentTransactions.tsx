
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "credit",
    description: "Family Circle Ajo - Weekly Contribution",
    amount: 5000,
    date: "2024-03-08",
    status: "completed",
    group: "Family Circle"
  },
  {
    id: 2,
    type: "debit",
    description: "Estate Security Dues",
    amount: 15000,
    date: "2024-03-07",
    status: "pending",
    group: "Victoria Estate"
  },
  {
    id: 3,
    type: "credit",
    description: "Medical Campaign Contribution",
    amount: 10000,
    date: "2024-03-06",
    status: "completed",
    group: "Community"
  },
  {
    id: 4,
    type: "debit",
    description: "Office Colleagues Ajo",
    amount: 20000,
    date: "2024-03-05",
    status: "completed",
    group: "Office Circle"
  }
];

export const RecentTransactions = () => {
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
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === "credit" 
                    ? "bg-emerald-100 text-emerald-600" 
                    : "bg-red-100 text-red-600"
                }`}>
                  {transaction.type === "credit" ? (
                    <ArrowDown className="w-4 h-4" />
                  ) : (
                    <ArrowUp className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.group} • {transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === "credit" 
                      ? "text-emerald-600" 
                      : "text-red-600"
                  }`}>
                    {transaction.type === "credit" ? "+" : "-"}₦{transaction.amount.toLocaleString()}
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
