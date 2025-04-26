
import PageantNavbar from "@/components/PageantNavbar";
import PageantFooter from "@/components/PageantFooter";
import EventCard from "@/components/EventCard";
import { events } from "@/data/mockData";
import { useState } from "react";
import { Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <PageantNavbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pageant-green to-pageant-green/70 text-white py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4" />
            <h1 className="font-playfair font-bold text-4xl md:text-5xl mb-4">Browse Pageant Events</h1>
            <p className="text-lg text-white/80 mb-8">
              Discover and explore upcoming and ongoing pageant events
            </p>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search events by name or description..."
                className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-white/60" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Events Listing */}
      <section className="py-12 flex-grow">
        <div className="container">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  action={{ label: "View Details", to: `/events/${event.id}` }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-2">No Events Found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any events matching your search criteria.
              </p>
              <Button 
                onClick={() => setSearchQuery("")}
                variant="outline"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-muted/50 py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold font-playfair">Want to host your own pageant?</h2>
            <p className="text-muted-foreground">
              Sign up as an Event Coordinator to create and manage your own pageant events.
            </p>
            <Button 
              className="mt-4 bg-pageant-green hover:bg-pageant-green/90" 
              size="lg"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>
      
      <PageantFooter />
    </div>
  );
};

export default Events;
