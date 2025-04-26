
import { Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Judge } from "@/types/pageant-types";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface JudgeCardProps {
  judge: Judge;
  onEdit?: () => void;
  onDelete?: () => void;
  showAccessCode?: boolean;
  className?: string;
}

const JudgeCard = ({ judge, onEdit, onDelete, showAccessCode = false, className }: JudgeCardProps) => {
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="font-playfair font-bold">{judge.name}</CardTitle>
          <Badge variant={judge.status === "active" ? "default" : "outline"}>
            {judge.status === "active" ? "Active" : "Invited"}
          </Badge>
        </div>
        <CardDescription className="flex items-center">
          <Mail className="h-3 w-3 mr-1" />
          {judge.email}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {showAccessCode && (
          <Alert className="bg-muted border-muted-foreground/20">
            <AlertDescription className="font-mono text-sm">
              Access Code: <span className="font-semibold">{judge.accessCode}</span>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      {(onEdit || onDelete) && (
        <CardFooter className="flex gap-2 pt-2">
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
              Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="destructive" size="sm" onClick={onDelete} className="flex-1">
              Delete
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default JudgeCard;
