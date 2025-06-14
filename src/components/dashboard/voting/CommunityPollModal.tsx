
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Vote, Plus, Clock, BarChart3 } from "lucide-react";

interface Poll {
  id: string;
  title: string;
  description: string;
  options: Array<{
    id: string;
    text: string;
    votes: number;
  }>;
  totalVotes: number;
  endsAt: string;
  status: 'active' | 'ended';
  createdBy: string;
  userVoted?: string;
}

interface CommunityPollModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupName: string;
}

export const CommunityPollModal = ({ open, onOpenChange, groupName }: CommunityPollModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'active' | 'create'>('active');
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [newPollTitle, setNewPollTitle] = useState("");
  const [newPollDescription, setNewPollDescription] = useState("");
  const [newPollOptions, setNewPollOptions] = useState<string[]>(["", ""]);

  const [polls, setPolls] = useState<Poll[]>([
    {
      id: '1',
      title: 'Should we upgrade the community hall sound system?',
      description: 'Proposal to invest ₦150,000 in new audio equipment for better event experiences.',
      options: [
        { id: '1a', text: 'Yes, proceed with upgrade', votes: 18 },
        { id: '1b', text: 'No, current system is adequate', votes: 5 },
        { id: '1c', text: 'Need more information first', votes: 3 },
      ],
      totalVotes: 26,
      endsAt: '2024-06-20',
      status: 'active',
      createdBy: 'Sarah Okafor (Trustee)',
    },
    {
      id: '2',
      title: 'Best time for monthly meetings',
      description: 'Help us choose the most convenient time for our monthly group meetings.',
      options: [
        { id: '2a', text: 'Saturday mornings (10 AM)', votes: 12 },
        { id: '2b', text: 'Sunday afternoons (2 PM)', votes: 8 },
        { id: '2c', text: 'Weekday evenings (7 PM)', votes: 4 },
      ],
      totalVotes: 24,
      endsAt: '2024-06-15',
      status: 'ended',
      createdBy: 'Mike Eze (Trustee)',
      userVoted: '2a'
    }
  ]);

  const handleVote = (pollId: string, optionId: string) => {
    setPolls(prev => prev.map(poll => {
      if (poll.id !== pollId) return poll;

      const updatedOptions = poll.options.map(option => 
        option.id === optionId 
          ? { ...option, votes: option.votes + 1 }
          : option
      );

      return {
        ...poll,
        options: updatedOptions,
        totalVotes: poll.totalVotes + 1,
        userVoted: optionId
      };
    }));

    toast({
      title: "Vote Submitted",
      description: "Your vote has been recorded successfully.",
    });

    setSelectedOption("");
  };

  const createPoll = () => {
    if (!newPollTitle || !newPollDescription || newPollOptions.some(opt => !opt.trim())) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all fields and options.",
        variant: "destructive",
      });
      return;
    }

    const newPoll: Poll = {
      id: Date.now().toString(),
      title: newPollTitle,
      description: newPollDescription,
      options: newPollOptions.map((option, index) => ({
        id: `${Date.now()}_${index}`,
        text: option,
        votes: 0
      })),
      totalVotes: 0,
      endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      status: 'active',
      createdBy: 'You'
    };

    setPolls(prev => [newPoll, ...prev]);
    
    toast({
      title: "Poll Created",
      description: "Your community poll has been created successfully.",
    });

    // Reset form
    setNewPollTitle("");
    setNewPollDescription("");
    setNewPollOptions(["", ""]);
    setActiveTab('active');
  };

  const addOption = () => {
    if (newPollOptions.length < 5) {
      setNewPollOptions(prev => [...prev, ""]);
    }
  };

  const updateOption = (index: number, value: string) => {
    setNewPollOptions(prev => prev.map((opt, i) => i === index ? value : opt));
  };

  const removeOption = (index: number) => {
    if (newPollOptions.length > 2) {
      setNewPollOptions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const getVotePercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Community Polls - {groupName}</DialogTitle>
          <DialogDescription>
            Participate in community decisions and create new polls
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tab Navigation */}
          <div className="flex space-x-2 border-b">
            <Button
              variant={activeTab === 'active' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('active')}
              size="sm"
            >
              <Vote className="w-4 h-4 mr-2" />
              Active Polls
            </Button>
            <Button
              variant={activeTab === 'create' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('create')}
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Poll
            </Button>
          </div>

          {/* Active Polls Tab */}
          {activeTab === 'active' && (
            <div className="space-y-4">
              {polls.map((poll) => (
                <Card key={poll.id} className="border-emerald-100">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{poll.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {poll.description}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className={poll.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                          {poll.status.toUpperCase()}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-3 h-3 mr-1" />
                          {poll.status === 'active' ? `Ends ${poll.endsAt}` : 'Ended'}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="text-sm text-gray-600">
                      Created by {poll.createdBy} • {poll.totalVotes} total votes
                    </div>

                    {/* Voting Options */}
                    {poll.status === 'active' && !poll.userVoted ? (
                      <div className="space-y-3">
                        <RadioGroup 
                          value={selectedOption} 
                          onValueChange={setSelectedOption}
                        >
                          {poll.options.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.id} id={option.id} />
                              <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                                {option.text}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                        
                        <Button 
                          onClick={() => selectedOption && handleVote(poll.id, selectedOption)}
                          disabled={!selectedOption}
                          className="w-full bg-emerald-600 hover:bg-emerald-700"
                        >
                          Submit Vote
                        </Button>
                      </div>
                    ) : (
                      // Results View
                      <div className="space-y-3">
                        {poll.userVoted && (
                          <Badge className="bg-blue-100 text-blue-700">
                            You voted for: {poll.options.find(opt => opt.id === poll.userVoted)?.text}
                          </Badge>
                        )}
                        
                        {poll.options.map((option) => (
                          <div key={option.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{option.text}</span>
                              <span className="text-sm text-gray-600">
                                {option.votes} votes ({getVotePercentage(option.votes, poll.totalVotes)}%)
                              </span>
                            </div>
                            <Progress 
                              value={getVotePercentage(option.votes, poll.totalVotes)} 
                              className="h-2"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Create Poll Tab */}
          {activeTab === 'create' && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Poll</CardTitle>
                  <CardDescription>
                    Create a poll for the community to vote on important decisions
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="poll-title">Poll Title</Label>
                    <Input
                      id="poll-title"
                      placeholder="Enter poll title..."
                      value={newPollTitle}
                      onChange={(e) => setNewPollTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="poll-description">Description</Label>
                    <Textarea
                      id="poll-description"
                      placeholder="Provide context and details for this poll..."
                      value={newPollDescription}
                      onChange={(e) => setNewPollDescription(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Poll Options</Label>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={addOption}
                        disabled={newPollOptions.length >= 5}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Option
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {newPollOptions.map((option, index) => (
                        <div key={index} className="flex space-x-2">
                          <Input
                            placeholder={`Option ${index + 1}...`}
                            value={option}
                            onChange={(e) => updateOption(index, e.target.value)}
                          />
                          {newPollOptions.length > 2 && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => removeOption(index)}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={createPoll}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    Create Poll
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
