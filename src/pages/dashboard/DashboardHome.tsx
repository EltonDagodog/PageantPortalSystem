
import { Link } from "react-router-dom";
import CoordinatorLayout from "@/components/CoordinatorLayout";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Calendar, Plus, Star, Trophy, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePageant } from "@/context/PageantContext";
import EventCard from "@/components/EventCard";

const DashboardHome = () => {
  const { currentUser } = useAuth();
  const { events, candidates, judges } = usePageant();
  
  // Get events created by current user
  const userEvents = events.filter(event => event.createdBy === currentUser?.id);
  const recentEvents = userEvents.slice(0, 3);
  
  // Calculate total candidates and judges for user events
  const totalCandidates = candidates.filter(c => 
    userEvents.some(e => e.id === c.eventId)
  ).length;
  
  const totalJudges = judges.filter(j => 
    userEvents.some(e => e.id === j.eventId)
  ).length;
  
  // Stats cards
  const statsCards = [
    {
      title: "Total Events",
      icon: <Calendar className="h-5 w-5 text-pageant-green" />,
      value: userEvents.length,
      link: "/dashboard/events",
    },
    {
      title: "Total Candidates",
      icon: <Users className="h-5 w-5 text-pageant-green" />,
      value: totalCandidates,
      link: "/dashboard/candidates",
    },
    {
      title: "Total Judges",
      icon: <Star className="h-5 w-5 text-pageant-green" />,
      value: totalJudges,
      link: "/dashboard/judges",
    },
  ];

  return (
    <CoordinatorLayout>
      <DashboardHeader 
        title={`Welcome, ${currentUser?.name || "Coordinator"}!`}
        description="Manage your pageant events from this dashboard"
      />
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" asChild className="text-pageant-green hover:text-pageant-green/90">
                <Link to={stat.link}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Recent Events */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Events</h2>
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/events">View All</Link>
          </Button>
        </div>
        
        {recentEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event}
                action={{ label: "Manage Event", to: `/dashboard/events/${event.id}` }}
              />
            ))}
          </div>
        ) : (
          <Card className="border-dashed text-center p-6">
            <CardContent>
              <div className="flex flex-col items-center py-8">
                <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No Events Created Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first pageant event to get started
                </p>
                <Button asChild className="bg-pageant-green hover:bg-pageant-green/90">
                  <Link to="/dashboard/events/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Event
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Quick Actions */}
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <Calendar className="h-6 w-6 text-pageant-green mb-2" />
            <CardTitle className="text-base">Create Event</CardTitle>
            <CardDescription>Set up a new pageant event</CardDescription>
          </CardHeader>
          <CardFooter className="pt-2">
            <Button asChild className="w-full bg-pageant-green hover:bg-pageant-green/90">
              <Link to="/dashboard/events/new">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <Users className="h-6 w-6 text-pageant-green mb-2" />
            <CardTitle className="text-base">Add Candidate</CardTitle>
            <CardDescription>Register a new contestant</CardDescription>
          </CardHeader>
          <CardFooter className="pt-2">
            <Button asChild className="w-full" variant="outline">
              <Link to="/dashboard/candidates/new">Add Now</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <Star className="h-6 w-6 text-pageant-green mb-2" />
            <CardTitle className="text-base">Invite Judge</CardTitle>
            <CardDescription>Add judges to your event</CardDescription>
          </CardHeader>
          <CardFooter className="pt-2">
            <Button asChild className="w-full" variant="outline">
              <Link to="/dashboard/judges/new">Invite</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <Trophy className="h-6 w-6 text-pageant-green mb-2" />
            <CardTitle className="text-base">View Results</CardTitle>
            <CardDescription>See scores and rankings</CardDescription>
          </CardHeader>
          <CardFooter className="pt-2">
            <Button asChild className="w-full" variant="outline">
              <Link to="/dashboard/results">View</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </CoordinatorLayout>
  );
};

export default DashboardHome;
