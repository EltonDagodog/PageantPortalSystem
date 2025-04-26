
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CoordinatorLayout from "@/components/CoordinatorLayout";
import DashboardHeader from "@/components/DashboardHeader";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  ChevronDown, 
  Plus, 
  Search
} from "lucide-react";
import { usePageant } from "@/context/PageantContext";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const EventsManagement = () => {
  const { events } = usePageant();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter events by current user
  const userEvents = events.filter(event => event.createdBy === currentUser?.id);
  
  // Apply filters
  const filteredEvents = userEvents.filter(event => {
    const matchesSearch = 
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <CoordinatorLayout>
      <DashboardHeader 
        title="Events Management"
        description="Create and manage your pageant events"
        action={{
          label: "Create Event",
          onClick: () => navigate("/dashboard/events/new"),
          icon: <Plus className="mr-2 h-4 w-4" />,
        }}
      />
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Status: {statusFilter === "all" ? "All" : 
                      statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
              <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="upcoming">Upcoming</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="active">Active</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="completed">Completed</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Events List */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              action={{ label: "Manage", to: `/dashboard/events/${event.id}` }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg border-dashed">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No events found</h3>
          <p className="text-muted-foreground mb-4">
            {userEvents.length === 0 ? 
              "You haven't created any events yet." : 
              "No events match your search criteria."}
          </p>
          {userEvents.length === 0 && (
            <Button asChild className="bg-pageant-green hover:bg-pageant-green/90">
              <Link to="/dashboard/events/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Event
              </Link>
            </Button>
          )}
        </div>
      )}
    </CoordinatorLayout>
  );
};

export default EventsManagement;
