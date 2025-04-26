
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import JudgeLayout from "@/components/JudgeLayout";
import DashboardHeader from "@/components/DashboardHeader";
import CandidateCard from "@/components/CandidateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  CheckCircle, 
  CircleX, 
  LoaderCircle, 
  Loader2 
} from "lucide-react";
import { usePageant } from "@/context/PageantContext";
import { useAuth } from "@/context/AuthContext";
import { Candidate, ScoringCriteria, Score } from "@/types/pageant-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface ScoringDialogProps {
  candidate: Candidate | null;
  criteria: ScoringCriteria[];
  existingScores: Score[];
  onSubmit: (scores: { criteriaId: string; score: number; comment?: string }[]) => void;
  onClose: () => void;
  loading: boolean;
}

const ScoringDialog = ({ 
  candidate, 
  criteria, 
  existingScores,
  onSubmit, 
  onClose,
  loading 
}: ScoringDialogProps) => {
  const [scores, setScores] = useState<{ criteriaId: string; score: number; comment?: string }[]>([]);
  
  useEffect(() => {
    if (candidate && criteria.length > 0) {
      // Initialize scores with existing scores or defaults
      const initialScores = criteria.map(c => {
        const existingScore = existingScores.find(s => s.criteriaId === c.id);
        return {
          criteriaId: c.id,
          score: existingScore ? existingScore.score : 0,
          comment: existingScore?.comment || "",
        };
      });
      
      setScores(initialScores);
    }
  }, [candidate, criteria, existingScores]);
  
  const handleScoreChange = (criteriaId: string, score: number) => {
    setScores(prev => 
      prev.map(s => 
        s.criteriaId === criteriaId ? { ...s, score } : s
      )
    );
  };
  
  const handleCommentChange = (criteriaId: string, comment: string) => {
    setScores(prev => 
      prev.map(s => 
        s.criteriaId === criteriaId ? { ...s, comment } : s
      )
    );
  };
  
  const isComplete = () => {
    return scores.every(s => s.score > 0);
  };

  return (
    <Dialog open={!!candidate} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Score Candidate: {candidate?.name}</DialogTitle>
          <DialogDescription>
            Provide scores for each criteria below
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          {criteria.map((c, index) => {
            const scoreData = scores.find(s => s.criteriaId === c.id) || { score: 0, comment: "" };
            
            return (
              <div key={c.id} className="space-y-4 pb-4 border-b last:border-b-0">
                <div>
                  <h4 className="font-semibold">{c.name}</h4>
                  <p className="text-sm text-muted-foreground">{c.description}</p>
                  <p className="text-sm text-muted-foreground">Weight: {c.weight}%</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Score (1-{c.maxScore})</Label>
                    <span className="font-semibold">{scoreData.score}</span>
                  </div>
                  <Slider
                    min={0}
                    max={c.maxScore}
                    step={0.1}
                    value={[scoreData.score]}
                    onValueChange={(value) => handleScoreChange(c.id, value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`comment-${index}`}>Comment (Optional)</Label>
                  <Textarea 
                    id={`comment-${index}`}
                    placeholder="Add your comments here..."
                    value={scoreData.comment}
                    onChange={(e) => handleCommentChange(c.id, e.target.value)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={() => onSubmit(scores)}
            className="bg-pageant-green hover:bg-pageant-green/90"
            disabled={!isComplete() || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>Submit Scores</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const JudgeCandidates = () => {
  const { candidates, events, criteria, scores, submitScore } = usePageant();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId") || "";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Judge can only see candidates from events they're assigned to
  const judgeId = currentUser?.id || "";
  const event = events.find(e => e.id === eventId);
  const isJudgeAssigned = !!event; // Simplified for mock data
  
  const eventCandidates = candidates.filter(c => c.eventId === eventId);
  const eventCriteria = criteria.filter(c => c.eventId === eventId);
  
  // Filter candidates by search
  const filteredCandidates = eventCandidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get scoring status for each candidate
  const getCandidateStatus = (candidateId: string) => {
    const candidateScores = scores.filter(
      s => s.candidateId === candidateId && s.judgeId === judgeId
    );
    
    // If all criteria have been scored, candidate is complete
    const isComplete = candidateScores.length === eventCriteria.length;
    
    // If some criteria have been scored, candidate is in progress
    const isInProgress = candidateScores.length > 0 && !isComplete;
    
    return { isComplete, isInProgress, scoredCount: candidateScores.length };
  };
  
  const getExistingScores = (candidateId: string) => {
    return scores.filter(
      s => s.candidateId === candidateId && s.judgeId === judgeId
    );
  };
  
  const handleScoreSubmit = (scoreData: { criteriaId: string; score: number; comment?: string }[]) => {
    if (!selectedCandidate || !eventId || !judgeId) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      scoreData.forEach(item => {
        submitScore({
          eventId,
          candidateId: selectedCandidate.id,
          judgeId,
          criteriaId: item.criteriaId,
          score: item.score,
          comment: item.comment,
        });
      });
      
      setSelectedCandidate(null);
      setLoading(false);
      
      toast({
        title: "Scores Submitted",
        description: `Scores for ${selectedCandidate.name} have been saved successfully.`,
      });
    }, 1000);
  };

  if (!eventId || !isJudgeAssigned) {
    return (
      <JudgeLayout>
        <div className="text-center py-10">
          <h2 className="text-xl font-bold mb-2">No Event Selected</h2>
          <p className="text-muted-foreground mb-4">
            Please select an event from your dashboard to see candidates.
          </p>
          <Button asChild>
            <a href="/judge/dashboard">Return to Dashboard</a>
          </Button>
        </div>
      </JudgeLayout>
    );
  }

  return (
    <JudgeLayout>
      <DashboardHeader 
        title={`Candidates: ${event?.name || "Event"}`}
        description={`Score candidates for this event${event?.status !== "active" ? " (Read Only)" : ""}`}
      />
      
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates by name..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span className="text-sm">Scored</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
              <span className="text-sm">In Progress</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-muted mr-1"></div>
              <span className="text-sm">Not Scored</span>
            </div>
          </div>
          
          {filteredCandidates.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>
      
      {filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCandidates.map(candidate => {
            const status = getCandidateStatus(candidate.id);
            let statusIndicator;
            
            if (status.isComplete) {
              statusIndicator = <CheckCircle className="h-5 w-5 text-green-500" />;
            } else if (status.isInProgress) {
              statusIndicator = <LoaderCircle className="h-5 w-5 text-amber-500" />;
            } else {
              statusIndicator = <CircleX className="h-5 w-5 text-muted-foreground" />;
            }
            
            return (
              <div key={candidate.id} className="relative">
                <div className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur rounded-full p-1">
                  {statusIndicator}
                </div>
                <CandidateCard 
                  candidate={candidate} 
                  className="h-full"
                />
                <div className="mt-2">
                  <Button 
                    onClick={() => setSelectedCandidate(candidate)}
                    className="w-full bg-pageant-green hover:bg-pageant-green/90"
                    disabled={event?.status !== "active"}
                  >
                    {status.isComplete ? "Edit Scores" : 
                     status.isInProgress ? `Continue Scoring (${status.scoredCount}/${eventCriteria.length})` : 
                     "Score Candidate"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg border-dashed">
          <h3 className="text-lg font-medium mb-2">No Candidates Found</h3>
          <p className="text-muted-foreground">
            {eventCandidates.length === 0 ? 
              "There are no candidates registered for this event yet." : 
              "No candidates match your search criteria."}
          </p>
        </div>
      )}
      
      <ScoringDialog 
        candidate={selectedCandidate}
        criteria={eventCriteria}
        existingScores={selectedCandidate ? getExistingScores(selectedCandidate.id) : []}
        onSubmit={handleScoreSubmit}
        onClose={() => setSelectedCandidate(null)}
        loading={loading}
      />
    </JudgeLayout>
  );
};

export default JudgeCandidates;
