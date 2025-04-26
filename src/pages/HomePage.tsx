
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageantNavbar from "@/components/PageantNavbar";
import PageantFooter from "@/components/PageantFooter";
import EventCard from "@/components/EventCard";
import { events } from "@/data/mockData";
import { Award, Calendar, Crown, Star, Trophy, Users } from "lucide-react";

const HomePage = () => {
  // Show only upcoming or active events on homepage
  const featuredEvents = events.filter(
    (event) => event.status === "upcoming" || event.status === "active"
  ).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <PageantNavbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pageant-green to-pageant-green/80 text-white py-20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] mix-blend-overlay opacity-10"></div>
        <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl">
              Pageant Paradise Portal
            </h1>
            <p className="text-xl opacity-90 max-w-lg mx-auto lg:mx-0">
              The premier platform for organizing, judging, and participating in pageants of all kinds.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-pageant-gold text-black hover:bg-pageant-gold/90">
                <Link to="/events">Explore Events</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/signup">Organize a Pageant</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-pageant-gold/20 animate-pulse"></div>
              <Crown size={240} className="text-pageant-gold" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 font-playfair">Why Choose Pageant Paradise?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg border border-border flex flex-col items-center text-center">
              <div className="bg-pageant-green/10 p-4 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-pageant-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Event Management</h3>
              <p className="text-muted-foreground">
                Create and manage pageant events with our user-friendly coordinator dashboard.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg border border-border flex flex-col items-center text-center">
              <div className="bg-pageant-green/10 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-pageant-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fair Judging System</h3>
              <p className="text-muted-foreground">
                Our transparent scoring system ensures fair and accurate judging of all candidates.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg border border-border flex flex-col items-center text-center">
              <div className="bg-pageant-green/10 p-4 rounded-full mb-4">
                <Trophy className="h-8 w-8 text-pageant-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">Public Engagement</h3>
              <p className="text-muted-foreground">
                Allow the public to view event details and vote for their favorite candidates.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Upcoming Events Section */}
      {featuredEvents.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold font-playfair">Featured Events</h2>
              <Link to="/events" className="text-primary hover:underline flex items-center">
                View All Events
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  action={{ label: "View Details", to: `/events/${event.id}` }}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Call to Action */}
      <section className="py-16 bg-pageant-green text-white">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl font-bold font-playfair">Ready to Organize Your Pageant?</h2>
          <p className="max-w-2xl mx-auto text-white/80">
            Join our platform today to create and manage your own pageant events with ease. Our comprehensive system handles everything from candidate registration to final scoring.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="bg-pageant-gold text-black hover:bg-pageant-gold/90">
              <Link to="/signup">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Roles Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 font-playfair">Perfect for Everyone</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg border border-border flex flex-col">
              <div className="mb-4 flex justify-center">
                <Calendar className="h-10 w-10 text-pageant-green" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Event Coordinators</h3>
              <p className="text-muted-foreground mb-4 text-center">
                Create and manage pageants, judges, candidates, criteria, and more.
              </p>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-pageant-green"></span>
                  <span className="text-sm">Complete event management dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-pageant-green"></span>
                  <span className="text-sm">Judge invitation system</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-pageant-green"></span>
                  <span className="text-sm">Custom scoring criteria</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-pageant-green hover:bg-pageant-green/90">
                <Link to="/signup">Sign Up as Coordinator</Link>
              </Button>
            </div>
            
            <div className="bg-background p-6 rounded-lg border border-border flex flex-col">
              <div className="mb-4 flex justify-center">
                <Users className="h-10 w-10 text-pageant-green" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Judges</h3>
              <p className="text-muted-foreground mb-4 text-center">
                Score candidates using a secure, easy-to-use interface.
              </p>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-pageant-green"></span>
                  <span className="text-sm">Access via unique code</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-pageant-green"></span>
                  <span className="text-sm">Intuitive scoring interface</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-pageant-green"></span>
                  <span className="text-sm">Comment and feedback system</span>
                </li>
              </ul>
              <Button asChild className="w-full" variant="outline">
                <Link to="/judge-login">Judge Login</Link>
              </Button>
            </div>
            
            <div className="bg-background p-6 rounded-lg border border-border flex flex-col">
              <div className="mb-4 flex justify-center">
                <Award className="h-10 w-10 text-pageant-green" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Public Visitors</h3>
              <p className="text-muted-foreground mb-4 text-center">
                Browse events, view candidate profiles, and cast votes.
              </p>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-pageant-green"></span>
                  <span className="text-sm">No login required</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-pageant-green"></span>
                  <span className="text-sm">Vote for People's Choice awards</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-pageant-green"></span>
                  <span className="text-sm">View event details and results</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-pageant-gold text-black hover:bg-pageant-gold/90">
                <Link to="/events">Browse Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <PageantFooter />
    </div>
  );
};

export default HomePage;
