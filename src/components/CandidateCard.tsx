
import { User } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Candidate } from "@/types/pageant-types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CandidateCardProps {
  candidate: Candidate;
  action?: {
    label: string;
    to: string;
  };
  className?: string;
}

const CandidateCard = ({ candidate, action, className }: CandidateCardProps) => {
  return (
    <Card className={cn("pageant-card h-full flex flex-col", className)}>
      <CardHeader className="pb-2 relative">
        <div className="absolute top-2 right-2 bg-pageant-gold text-black w-7 h-7 flex items-center justify-center rounded-full font-medium text-sm">
          #{candidate.candidateNumber}
        </div>
        <div className="flex flex-col items-center mb-2">
          {candidate.imageUrl ? (
            <img 
              src={candidate.imageUrl} 
              alt={candidate.name} 
              className="h-28 w-28 object-cover rounded-full border-2 border-pageant-gold/50"
            />
          ) : (
            <div className="h-28 w-28 bg-muted rounded-full flex items-center justify-center">
              <User size={40} className="text-muted-foreground" />
            </div>
          )}
        </div>
        <CardTitle className="font-playfair font-bold text-center">{candidate.name}</CardTitle>
        <CardDescription className="text-center">Age {candidate.age}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{candidate.bio}</p>
      </CardContent>
      {action && (
        <CardFooter className="pt-2">
          <Button asChild className="w-full bg-pageant-green hover:bg-pageant-green/90">
            <Link to={action.to}>{action.label}</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CandidateCard;
