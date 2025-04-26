
import { useParams, Link } from "react-router-dom";
import PageantNavbar from "@/components/PageantNavbar";
import PageantFooter from "@/components/PageantFooter";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Award, User, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { candidates, events } from "@/data/mockData";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

const CandidateProfile = () => {
  const { candidateId = "" } = useParams();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  
  const candidate = candidates.find(c => c.id === candidateId);
  const event = candidate ? events.find(e => e.id === candidate.eventId) : undefined;
  
  const handleLike = () => {
    setLiked(prev => !prev);
    
    toast({
      title: liked ? "Like Removed" : "Liked",
      description: liked ? "You have removed your like." : "You have liked this candidate!",
    });
  };
  
  if (!candidate || !event) {
    return (
      <div className="flex flex-col min-h-screen">
        <PageantNavbar />
        <div className="container py-20 text-center flex-grow">
          <h1 className="text-3xl font-bold mb-4">Candidate Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, the candidate you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/events">Browse Events</Link>
          </Button>
        </div>
        <PageantFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageantNavbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pageant-green to-pageant-green/70 text-white py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0">
              {candidate.imageUrl ? (
                <img 
                  src={candidate.imageUrl} 
                  alt={candidate.name} 
                  className="h-40 w-40 md:h-48 md:w-48 object-cover rounded-full border-4 border-pageant-gold/50"
                />
              ) : (
                <div className="h-40 w-40 md:h-48 md:w-48 bg-white/10 rounded-full flex items-center justify-center border-4 border-pageant-gold/50">
                  <User size={64} className="text-white" />
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <Badge className="mb-2 bg-pageant-gold/80 hover:bg-pageant-gold/80 text-black">
                Candidate #{candidate.candidateNumber}
              </Badge>
              <h1 className="font-playfair font-bold text-4xl md:text-5xl mb-2">{candidate.name}</h1>
              <div className="text-lg mb-4">Age: {candidate.age}</div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-pageant-gold" />
                  <Link to={`/events/${event.id}`} className="hover:underline">
                    {event.name}
                  </Link>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-pageant-gold" />
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="flex justify-center md:justify-start gap-3">
                <Button className="bg-pageant-gold text-black hover:bg-pageant-gold/90" onClick={handleLike}>
                  <Heart className={`mr-2 h-4 w-4 ${liked ? "fill-current" : ""}`} />
                  {liked ? "Liked" : "Like"}
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to={`/events/${event.id}?tab=voting`}>
                    <Award className="mr-2 h-4 w-4" />
                    Vote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-12 flex-grow">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Biography</h2>
              <p className="text-muted-foreground">
                {candidate.bio}
              </p>
              <p className="text-muted-foreground mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget justo vel nisi varius condimentum. Duis blandit tristique enim, id ultrices elit gravida sed. Suspendisse potenti. Donec id ligula et tortor tempus vehicula. Nullam id massa vitae quam lobortis egestas. Vivamus hendrerit magna vel arcu finibus, ac vehicula metus facilisis.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Talents & Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Classical Ballet</h3>
                  <p className="text-sm text-muted-foreground">
                    Trained in classical ballet for 15 years, performed in multiple productions.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Public Speaking</h3>
                  <p className="text-sm text-muted-foreground">
                    Award-winning debate team member and accomplished public speaker.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Volunteer Work</h3>
                  <p className="text-sm text-muted-foreground">
                    Over 500 hours of community service with local charities.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Languages</h3>
                  <p className="text-sm text-muted-foreground">
                    Fluent in English and Spanish, conversational in French.
                  </p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6">Support {candidate.name}</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link to={`/events/${event.id}?tab=voting`}>
                    <Award className="mr-2 h-4 w-4" />
                    Vote for People's Choice
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to={`/events/${event.id}`}>
                    <Calendar className="mr-2 h-4 w-4" />
                    View Event Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <PageantFooter />
    </div>
  );
};

export default CandidateProfile;
