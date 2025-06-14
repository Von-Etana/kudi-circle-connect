
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Coins } from "lucide-react";

const groups = [
  {
    id: 1,
    name: "Family Circle",
    type: "ajo",
    members: 8,
    role: "Member",
    nextEvent: "Payout - Mar 15",
    status: "active"
  },
  {
    id: 2,
    name: "Victoria Estate",
    type: "community",
    members: 45,
    role: "Trustee",
    nextEvent: "Meeting - Mar 12",
    status: "active"
  },
  {
    id: 3,
    name: "Office Colleagues",
    type: "ajo",
    members: 12,
    role: "Admin",
    nextEvent: "Collection - Apr 1",
    status: "active"
  }
];

export const ActiveGroups = () => {
  return (
    <Card className="border-emerald-100">
      <CardHeader>
        <CardTitle className="text-emerald-800">Active Groups</CardTitle>
        <CardDescription>
          Your community circles and organizations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-emerald-900">{group.name}</h3>
                <Badge className="bg-emerald-100 text-emerald-700">
                  {group.role}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{group.members} members</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{group.nextEvent}</span>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                View Details
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
