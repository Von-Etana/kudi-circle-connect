
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Users, Calendar, DollarSign, Search } from "lucide-react";

interface JoinAjoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JoinAjoModal = ({ open, onOpenChange }: JoinAjoModalProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const availableGroups = [
    {
      id: 1,
      name: "Lagos Young Professionals",
      amount: 25000,
      frequency: "Monthly",
      members: 8,
      maxMembers: 12,
      description: "Professional networking and savings group for young adults in Lagos",
      joinCode: "LYP2024",
      nextStart: "April 1, 2024"
    },
    {
      id: 2,
      name: "University Alumni Circle",
      amount: 15000,
      frequency: "Bi-weekly",
      members: 6,
      maxMembers: 10,
      description: "Alumni group for University of Lagos graduates",
      joinCode: "UNILAG23",
      nextStart: "March 20, 2024"
    },
    {
      id: 3,
      name: "Market Traders Association",
      amount: 10000,
      frequency: "Weekly",
      members: 15,
      maxMembers: 20,
      description: "Savings group for market traders and small business owners",
      joinCode: "MTA2024",
      nextStart: "March 25, 2024"
    }
  ];

  const filteredGroups = availableGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinGroup = (group: typeof availableGroups[0]) => {
    toast({
      title: "Join Request Sent!",
      description: `Your request to join ${group.name} has been sent to the group admin.`,
    });
  };

  const handleJoinByCode = () => {
    if (!searchTerm) {
      toast({
        title: "Enter Join Code",
        description: "Please enter a valid group join code.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Joining Group...",
      description: `Attempting to join group with code: ${searchTerm}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Join Ajo Group</DialogTitle>
          <DialogDescription>
            Find and join existing rotating savings groups in your community
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search Groups or Enter Join Code</Label>
            <div className="flex space-x-2">
              <Input
                id="search"
                placeholder="Search by name or enter join code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" onClick={handleJoinByCode}>
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Available Groups</h3>
            {filteredGroups.map((group) => (
              <Card key={group.id} className="border-emerald-100">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-emerald-800">{group.name}</CardTitle>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      {group.members}/{group.maxMembers} members
                    </Badge>
                  </div>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span>₦{group.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{group.frequency}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>Starts {group.nextStart}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Join Code: {group.joinCode}</span>
                    <Button 
                      size="sm" 
                      onClick={() => handleJoinGroup(group)}
                      className="bg-emerald-600 hover:bg-emerald-700"
                      disabled={group.members >= group.maxMembers}
                    >
                      {group.members >= group.maxMembers ? "Full" : "Request to Join"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
