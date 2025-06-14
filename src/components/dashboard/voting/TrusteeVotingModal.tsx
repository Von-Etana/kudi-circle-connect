
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { User, Vote, Clock, CheckCircle } from "lucide-react";

interface TrusteeCandidate {
  id: string;
  name: string;
  avatar: string;
  votes: number;
  nominated: boolean;
}

interface TrusteeVotingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupName: string;
}

export const TrusteeVotingModal = ({ open, onOpenChange, groupName }: TrusteeVotingModalProps) => {
  const { toast } = useToast();
  const [votingPhase, setVotingPhase] = useState<'nomination' | 'voting' | 'results'>('nomination');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [votedFor, setVotedFor] = useState<string[]>([]);
  
  const totalMembers = 12;
  const votingEndsIn = "2 days, 14 hours";
  
  const [candidates, setCandidates] = useState<TrusteeCandidate[]>([
    { id: '1', name: 'John Adebayo', avatar: '/placeholder.svg', votes: 8, nominated: true },
    { id: '2', name: 'Sarah Okafor', avatar: '/placeholder.svg', votes: 7, nominated: true },
    { id: '3', name: 'Mike Eze', avatar: '/placeholder.svg', votes: 5, nominated: true },
    { id: '4', name: 'Grace Bello', avatar: '/placeholder.svg', votes: 3, nominated: true },
  ]);

  const handleNominate = (candidateId: string) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, nominated: !candidate.nominated }
          : candidate
      )
    );
    
    toast({
      title: "Nomination Updated",
      description: "Your nomination has been recorded.",
    });
  };

  const handleVote = (candidateId: string) => {
    if (votedFor.includes(candidateId)) {
      setVotedFor(prev => prev.filter(id => id !== candidateId));
    } else if (votedFor.length < 2) {
      setVotedFor(prev => [...prev, candidateId]);
    } else {
      toast({
        title: "Vote Limit Reached",
        description: "You can only vote for up to 2 trustees.",
        variant: "destructive",
      });
      return;
    }
  };

  const submitVotes = () => {
    if (votedFor.length === 0) {
      toast({
        title: "No Votes Selected",
        description: "Please select at least one candidate to vote for.",
        variant: "destructive",
      });
      return;
    }

    // Update vote counts
    setCandidates(prev => 
      prev.map(candidate => 
        votedFor.includes(candidate.id)
          ? { ...candidate, votes: candidate.votes + 1 }
          : candidate
      )
    );

    toast({
      title: "Votes Submitted",
      description: `Your votes for ${votedFor.length} candidate(s) have been recorded.`,
    });

    setVotingPhase('results');
  };

  const getVotePercentage = (votes: number) => {
    return Math.round((votes / totalMembers) * 100);
  };

  const topTrustees = [...candidates]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Trustee Election - {groupName}</DialogTitle>
          <DialogDescription>
            Elect 2 trustees to manage group funds and approvals
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Voting Phase Indicator */}
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">
              {votingPhase === 'nomination' && 'Nomination Phase'}
              {votingPhase === 'voting' && `Voting ends in: ${votingEndsIn}`}
              {votingPhase === 'results' && 'Voting Complete'}
            </span>
          </div>

          {/* Phase Tabs */}
          <div className="flex space-x-2 border-b">
            <Button
              variant={votingPhase === 'nomination' ? 'default' : 'ghost'}
              onClick={() => setVotingPhase('nomination')}
              size="sm"
            >
              Nominations
            </Button>
            <Button
              variant={votingPhase === 'voting' ? 'default' : 'ghost'}
              onClick={() => setVotingPhase('voting')}
              size="sm"
            >
              Voting
            </Button>
            <Button
              variant={votingPhase === 'results' ? 'default' : 'ghost'}
              onClick={() => setVotingPhase('results')}
              size="sm"
            >
              Results
            </Button>
          </div>

          {/* Nomination Phase */}
          {votingPhase === 'nomination' && (
            <div className="space-y-3">
              <h3 className="font-semibold">Nominate Trustees</h3>
              {candidates.map((candidate) => (
                <Card key={candidate.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{candidate.name}</p>
                          <p className="text-sm text-gray-600">Group Member</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {candidate.nominated && (
                          <Badge className="bg-green-100 text-green-700">Nominated</Badge>
                        )}
                        <Button
                          variant={candidate.nominated ? "outline" : "default"}
                          size="sm"
                          onClick={() => handleNominate(candidate.id)}
                        >
                          {candidate.nominated ? 'Remove' : 'Nominate'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Voting Phase */}
          {votingPhase === 'voting' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Vote for Trustees (Select up to 2)</h3>
                <Badge>{votedFor.length}/2 selected</Badge>
              </div>
              {candidates.filter(c => c.nominated).map((candidate) => (
                <Card 
                  key={candidate.id}
                  className={`cursor-pointer transition-all ${
                    votedFor.includes(candidate.id) 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'hover:border-emerald-300'
                  }`}
                  onClick={() => handleVote(candidate.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{candidate.name}</p>
                          <p className="text-sm text-gray-600">Nominated Candidate</p>
                        </div>
                      </div>
                      {votedFor.includes(candidate.id) && (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button 
                onClick={submitVotes} 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={votedFor.length === 0}
              >
                Submit Votes
              </Button>
            </div>
          )}

          {/* Results Phase */}
          {votingPhase === 'results' && (
            <div className="space-y-4">
              <h3 className="font-semibold">Election Results</h3>
              
              {/* Elected Trustees */}
              <Card className="bg-emerald-50 border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-800">Elected Trustees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {topTrustees.map((trustee, index) => (
                      <div key={trustee.id} className="flex items-center justify-between p-2 bg-white rounded">
                        <div className="flex items-center space-x-3">
                          <Badge className="bg-emerald-600 text-white">#{index + 1}</Badge>
                          <span className="font-medium">{trustee.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {trustee.votes} votes ({getVotePercentage(trustee.votes)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* All Results */}
              <div className="space-y-2">
                <h4 className="font-medium">All Candidates</h4>
                {candidates
                  .sort((a, b) => b.votes - a.votes)
                  .map((candidate) => (
                    <div key={candidate.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{candidate.name}</span>
                        <span className="text-sm text-gray-600">
                          {candidate.votes} votes ({getVotePercentage(candidate.votes)}%)
                        </span>
                      </div>
                      <Progress value={getVotePercentage(candidate.votes)} className="h-2" />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
