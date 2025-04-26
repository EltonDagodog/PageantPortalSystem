
import { useState } from "react";
import JudgeLayout from "@/components/JudgeLayout";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, Circle, CircleX, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { usePageant } from "@/context/PageantContext";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const JudgeDashboard = () => {
  const { currentUser } = useAuth();
  const { events, candidates, criteria, scores } = usePageant();
  const [selectedTab, setSelectedTab] = useState("active");
  
  // Find events assigned to this judge
  const judgeId = currentUser?.id || "";
  const judgeEvents = events.filter(event => {
    // Check if judge is assigned to this event
    const isJudgeAssigned = currentUser?.accessCode && 
      event.id === currentUser.accessCode.split("-")[0]; // Simplified for mock data
    
    return isJudgeAssigned;
  });
  
  const activeEvents = judgeEvents.filter(e => e.status === "active");
  const upcomingEvents = judgeEvents.filter(e => e.status === "upcoming");
  const completedEvents = judgeEvents.filter(e => e.status === "completed");
  
  // Calculate scoring progress
  const getScoringProgress = (eventId: string) => {
    const eventCandidates = candidates.filter(c => c.eventId === eventId);
    const eventCriteria = criteria.filter(c => c.eventId === eventId);
    
    const totalPossibleScores = eventCandidates.length * eventCriteria.length;
    const completedScores = scores.filter(
      s => s.eventId === eventId && s.judgeId === judgeId
    ).length;
    
    return {
      completed: completedScores,
      total: totalPossibleScores,
      percentage: totalPossibleScores > 0 
        ? Math.round((completedScores / totalPossibleScores) * 100)
        : 0
    };
  };
  
  const renderEventCards = (eventsList: typeof events) => {
    if (eventsList.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No events found.</p>
        </div>
      );
    }
    
    return eventsList.map(event => {
      const progress = getScoringProgress(event.id);
      
      return (
        <Card key={event.id} className="mb-4">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </div>
              <Badge variant={event.status === "active" ? "default" : "outline"}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Scoring Progress</span>
                <span className="font-medium">
                  {progress.completed} / {progress.total} ({progress.percentage}%)
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-pageant-green" 
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
            
            {event.status === "active" && progress.completed < progress.total && (
              <div className="mt-4 flex items-center text-sm text-amber-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>Scoring in progress</span>
              </div>
            )}
            
            {event.status === "active" && progress.completed === progress.total && (
              <div className="mt-4 flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>All candidates scored</span>
              </div>
            )}
          </CardContent>
          <CardFooter>
            {event.status === "active" ? (
              <Button asChild className="w-full bg-pageant-green hover:bg-pageant-green/90">
                <Link to={`/judge/candidates?eventId=${event.id}`}>
                  {progress.completed < progress.total ? "Continue Scoring" : "Review Scores"}
                </Link>
              </Button>
            ) : event.status === "upcoming" ? (
              <Button asChild variant="outline" className="w-full" disabled>
                <div>Event Not Started</div>
              </Button>
            ) : (
              <Button asChild variant="outline" className="w-full">
                <Link to={`/judge/candidates?eventId=${event.id}`}>
                  View Past Scores
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      );
    });
  };

  return (
    <JudgeLayout>
      <DashboardHeader 
        title={`Welcome, ${currentUser?.name || "Judge"}!`}
        description="Score candidates and manage your judging assignments"
      />
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{judgeEvents.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeEvents.length} active now
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Candidates to Judge</CardTitle>
            <Circle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {candidates.filter(c => 
                judgeEvents.some(e => e.id === c.eventId && e.status === "active")
              ).length}
            </div>
            <p className="text-xs text-muted-foreground">
              In currently active events
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Scoring Completion</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {activeEvents.length > 0 ? (
              <>
                <div className="text-2xl font-bold">
                  {Math.round(
                    activeEvents.reduce((sum, event) => {
                      const progress = getScoringProgress(event.id);
                      return sum + progress.percentage;
                    }, 0) / activeEvents.length
                  )}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Average across active events
                </p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">-</div>
                <p className="text-xs text-muted-foreground">
                  No active events
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Events Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="active">
            Active ({activeEvents.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedEvents.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {renderEventCards(activeEvents)}
        </TabsContent>
        
        <TabsContent value="upcoming">
          {renderEventCards(upcomingEvents)}
        </TabsContent>
        
        <TabsContent value="completed">
          {renderEventCards(completedEvents)}
        </TabsContent>
      </Tabs>
    </JudgeLayout>
  );
};

export default JudgeDashboard;
