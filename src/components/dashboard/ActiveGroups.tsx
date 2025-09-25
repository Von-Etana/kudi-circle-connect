
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Coins } from "lucide-react";
import { useState } from "react";
import { ActiveGroupDetailsModal } from "./ActiveGroupDetailsModal";
import { useAjoGroups } from "@/hooks/useAjoGroups";
import { format } from "date-fns";

export const ActiveGroups = () => {
  const [viewDetailsGroup, setViewDetailsGroup] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { myGroups, loading } = useAjoGroups();

  const handleViewDetails = (group: any) => {
    setViewDetailsGroup(group);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <Card className="border-emerald-100">
        <CardHeader>
          <CardTitle className="text-emerald-800">Active Groups</CardTitle>
          <CardDescription>
            Loading your community circles...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

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
          {myGroups.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No groups yet. Join or create an Ajo group to get started.
            </div>
          ) : (
            myGroups.slice(0, 3).map((membership) => {
              const group = membership.ajo_groups;
              return (
                <div
                  key={membership.id}
                  className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-emerald-900">{group.name}</h3>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      Position {membership.position}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{group.current_members}/{group.max_members} members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{group.frequency} - ₦{Number(group.contribution_amount).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Coins className="w-4 h-4" />
                      <span>Status: {group.status}</span>
                    </div>
                    {group.next_payout_date && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Next: {format(new Date(group.next_payout_date), 'MMM dd')}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    onClick={() => handleViewDetails(membership)}
                  >
                    View Details
                  </Button>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
      <ActiveGroupDetailsModal
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) setViewDetailsGroup(null);
        }}
        group={viewDetailsGroup}
      />
    </Card>
  );
};
