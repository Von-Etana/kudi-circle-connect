
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: any; // For demo purposes, any type.
}

export function AjoDetailsModal({ open, onOpenChange, group }: Props) {
  if (!group) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-emerald-800 mb-1">{group.name}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList className="mb-2">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          <TabsContent value="activity">
            <div className="mb-3 font-semibold text-emerald-700">Recent Activity</div>
            <ul className="space-y-2">
              <li>
                <Card className="p-3 bg-emerald-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold">You made a contribution</span>
                      <div className="text-xs text-gray-600">₦{group.amount?.toLocaleString?.()} &nbsp; &bull; &nbsp; {group.frequency}</div>
                    </div>
                    <Badge variant="outline">Contribution</Badge>
                  </div>
                </Card>
              </li>
              <li>
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold">Monthly rotation payout</span>
                      <div className="text-xs text-gray-600">{group.nextPayout}</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">Payout</Badge>
                  </div>
                </Card>
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="members">
            <div className="mb-3 font-semibold text-emerald-700">Members</div>
            <ul>
              {[...Array(group.members ?? 6)].map((_, i) => (
                <li key={i} className="flex items-center border-b py-2 last:border-none">
                  <Users className="w-4 h-4 text-emerald-600 mr-2" />
                  <span>Member {i + 1} {i === 0 && "(You)"}</span>
                  {i === group.currentRound - 1 && <Badge className="ml-2 bg-yellow-100 text-yellow-800">Current</Badge>}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="payments">
            <div className="mb-3 font-semibold text-emerald-700">Payment History</div>
            <ul>
              {[1, 2, 3].map(i => (
                <li key={i} className="flex items-center border-b py-2 last:border-none gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>₦{(group.amount * i).toLocaleString?.()}</span>
                  <span className="ml-2 text-xs text-gray-600">Paid on 2024-04-{10 + i}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
