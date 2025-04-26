
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/types/pageant-types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: Event;
  action?: {
    label: string;
    to: string;
  };
}

const EventCard = ({ event, action }: EventCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="pageant-card h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="font-playfair font-bold">{event.name}</CardTitle>
          <div className={`
            px-2 py-1 text-xs rounded-full font-medium
            ${event.status === "upcoming" ? "bg-blue-100 text-blue-700" : 
              event.status === "active" ? "bg-green-100 text-green-700" :
              "bg-amber-100 text-amber-700"}
          `}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </div>
        </div>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            {event.location}
          </div>
        </div>
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

export default EventCard;
