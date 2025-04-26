
import { useParams, Link } from "react-router-dom";
import PageantNavbar from "@/components/PageantNavbar";
import PageantFooter from "@/components/PageantFooter";
import CandidateCard from "@/components/CandidateCard";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Trophy, Award, Users, Clock } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { events, candidates, awards } from "@/data/mockData";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const EventDetails = () => {
  const { eventId = "" } = useParams();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("about");
  const [votedAwards, setVotedAwards] = useState<Record<string, string>>({});
  
  const event = events.find(e => e.id === eventId);
  const eventCandidates = candidates.filter(c => c.eventId === eventId);
  const publicAwards = awards.filter(a => a.eventId === eventId && a.type === "public");
  
  const handleVote = (awardId: string, candidateId: string) => {
    setVotedAwards(prev => ({ ...prev, [awardId]: candidateId }));
    
    toast({
      title: "Vote Submitted",
      description: "Thank you for voting! Your vote has been recorded.",
    });
  };
  
  if (!event) {
    return (
      <div className="flex flex-col min-h-screen">
        <PageantNavbar />
        <div className="container py-20 text-center flex-grow">
          <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, the event you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/events">Browse All Events</Link>
          </Button>
        </div>
        <PageantFooter />
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageantNavbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pageant-green to-pageant-green/70 text-white py-16">
        <div className="container">
          <div className="max-w-4xl">
            <div className={`
              px-3 py-1 text-sm inline-flex items-center rounded-full mb-4
              ${event.status === "upcoming" ? "bg-blue-500/20" : 
                event.status === "active" ? "bg-green-500/20" :
                "bg-amber-500/20"}
            `}>
              <span className={`
                h-2 w-2 rounded-full mr-2
                ${event.status === "upcoming" ? "bg-blue-400" : 
                  event.status === "active" ? "bg-green-400" :
                  "bg-amber-400"}
              `}></span>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </div>
            <h1 className="font-playfair font-bold text-4xl md:text-5xl mb-4">{event.name}</h1>
            <p className="text-xl text-white/80 mb-6">
              {event.description}
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-pageant-gold" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-pageant-gold" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-12 flex-grow">
        <div className="container">
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="space-y-8"
          >
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="candidates">Candidates</TabsTrigger>
              <TabsTrigger value="voting">Public Voting</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="space-y-8">
              <div className="max-w-3xl mx-auto space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-pageant-green" />
                    About This Event
                  </h2>
                  <p className="text-muted-foreground">
                    {event.description} This prestigious pageant seeks to celebrate beauty, talent, and intelligence among its participants. Candidates will compete in various categories and be judged by a distinguished panel of judges.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-pageant-green" />
                    Event Schedule
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-muted p-2 rounded-full mr-4">
                        <Clock className="h-4 w-4 text-pageant-green" />
                      </div>
                      <div>
                        <p className="font-medium">Registration & Opening Ceremony</p>
                        <p className="text-sm text-muted-foreground">5:00 PM - 6:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-muted p-2 rounded-full mr-4">
                        <Clock className="h-4 w-4 text-pageant-green" />
                      </div>
                      <div>
                        <p className="font-medium">Talent Competition</p>
                        <p className="text-sm text-muted-foreground">6:00 PM - 7:30 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-muted p-2 rounded-full mr-4">
                        <Clock className="h-4 w-4 text-pageant-green" />
                      </div>
                      <div>
                        <p className="font-medium">Evening Gown & Question and Answer</p>
                        <p className="text-sm text-muted-foreground">7:45 PM - 9:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-muted p-2 rounded-full mr-4">
                        <Clock className="h-4 w-4 text-pageant-green" />
                      </div>
                      <div>
                        <p className="font-medium">Awards Ceremony</p>
                        <p className="text-sm text-muted-foreground">9:15 PM - 10:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Award className="mr-2 h-5 w-5 text-pageant-green" />
                    Awards
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {awards.filter(a => a.eventId === eventId).map(award => (
                      <div 
                        key={award.id} 
                        className="border rounded-lg p-4 flex flex-col"
                      >
                        <p className="font-semibold">{award.name}</p>
                        <p className="text-sm text-muted-foreground">{award.description}</p>
                        <div className="mt-2">
                          <span className={`
                            text-xs px-2 py-1 rounded-full 
                            ${award.type === "judged" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"}
                          `}>
                            {award.type === "judged" ? "Judged Award" : "Public Vote"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-pageant-green" />
                    Venue Information
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {event.location} is located in the heart of the city. This prestigious venue has hosted many high-profile events and provides an elegant backdrop for our pageant.
                  </p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Venue Map</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="candidates">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-pageant-green" />
                  Meet Our Candidates
                </h2>
                {eventCandidates.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eventCandidates.map(candidate => (
                      <CandidateCard 
                        key={candidate.id} 
                        candidate={candidate}
                        action={{ label: "View Profile", to: `/candidates/${candidate.id}` }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No candidates have been registered for this event yet.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="voting">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Award className="mr-2 h-5 w-5 text-pageant-green" />
                  Public Voting
                </h2>
                
                {event.status === "active" ? (
                  publicAwards.length > 0 ? (
                    <div className="space-y-10">
                      {publicAwards.map(award => (
                        <div key={award.id} className="space-y-6">
                          <div>
                            <h3 className="text-xl font-bold">{award.name}</h3>
                            <p className="text-muted-foreground">{award.description}</p>
                          </div>
                          
                          {votedAwards[award.id] ? (
                            <div className="bg-muted p-6 rounded-lg text-center">
                              <h4 className="font-semibold mb-2">Thank You for Voting!</h4>
                              <p className="text-muted-foreground">
                                Your vote has been recorded. Results will be announced after the event.
                              </p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {eventCandidates.map(candidate => (
                                <div
                                  key={candidate.id}
                                  className="border rounded-lg p-4 flex flex-col items-center"
                                >
                                  <div className="mb-3">
                                    {candidate.imageUrl ? (
                                      <img 
                                        src={candidate.imageUrl} 
                                        alt={candidate.name} 
                                        className="h-20 w-20 object-cover rounded-full"
                                      />
                                    ) : (
                                      <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center">
                                        <Users size={32} className="text-muted-foreground" />
                                      </div>
                                    )}
                                  </div>
                                  <p className="font-medium">#{candidate.candidateNumber} {candidate.name}</p>
                                  <Button 
                                    className="mt-3 w-full bg-pageant-green hover:bg-pageant-green/90"
                                    onClick={() => handleVote(award.id, candidate.id)}
                                  >
                                    Vote
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        This event does not have any public voting awards.
                      </p>
                    </div>
                  )
                ) : (
                  <div className="bg-muted p-6 rounded-lg text-center">
                    <h4 className="font-semibold mb-2">Voting Not Available</h4>
                    <p className="text-muted-foreground">
                      {event.status === "upcoming" ? 
                        "Public voting will be available once the event begins." : 
                        "This event has ended and voting is now closed."}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <PageantFooter />
    </div>
  );
};

export default EventDetails;
