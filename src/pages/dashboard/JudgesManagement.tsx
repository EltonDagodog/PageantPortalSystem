
import { useState } from "react";
import CoordinatorLayout from "@/components/CoordinatorLayout";
import DashboardHeader from "@/components/DashboardHeader";
import JudgeCard from "@/components/JudgeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, Plus, Loader2 } from "lucide-react";
import { usePageant } from "@/context/PageantContext";
import { Judge } from "@/types/pageant-types";
import { useAuth } from "@/context/AuthContext";

const JudgesManagement = () => {
  const { judges, events, addJudge, updateJudge, deleteJudge } = usePageant();
  const { currentUser } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  
  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "invited",
    eventId: "",
  });
  
  const [currentJudge, setCurrentJudge] = useState<Judge | null>(null);
  
  // Filter events by current user
  const userEvents = events.filter(event => event.createdBy === currentUser?.id);
  
  // Filter judges by event and search query
  const filteredJudges = judges.filter(judge => {
    // Only show judges for user's events
    const isUserEvent = userEvents.some(event => event.id === judge.eventId);
    
    if (!isUserEvent) return false;
    
    const matchesEvent = !selectedEventId || judge.eventId === selectedEventId;
    const matchesSearch = 
      judge.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      judge.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesEvent && matchesSearch;
  });
  
  // Active and invited judges
  const activeJudges = filteredJudges.filter(judge => judge.status === "active");
  const invitedJudges = filteredJudges.filter(judge => judge.status === "invited");
  
  const handleAddJudge = () => {
    if (!formData.name || !formData.email || !formData.eventId) return;
    
    setLoading(true);
    
    setTimeout(() => {
      addJudge({
        name: formData.name,
        email: formData.email,
        status: "invited",
        eventId: formData.eventId,
      });
      
      setIsAddDialogOpen(false);
      setFormData({
        name: "",
        email: "",
        status: "invited",
        eventId: "",
      });
      setLoading(false);
    }, 1000);
  };
  
  const handleEditJudge = () => {
    if (!currentJudge || !formData.name || !formData.email) return;
    
    setLoading(true);
    
    setTimeout(() => {
      updateJudge({
        ...currentJudge,
        name: formData.name,
        email: formData.email,
        status: formData.status as "active" | "invited",
      });
      
      setIsEditDialogOpen(false);
      setCurrentJudge(null);
      setLoading(false);
    }, 1000);
  };
  
  const handleDeleteJudge = () => {
    if (!currentJudge) return;
    
    setLoading(true);
    
    setTimeout(() => {
      deleteJudge(currentJudge.id);
      
      setIsDeleteDialogOpen(false);
      setCurrentJudge(null);
      setLoading(false);
    }, 1000);
  };
  
  const openEditDialog = (judge: Judge) => {
    setCurrentJudge(judge);
    setFormData({
      name: judge.name,
      email: judge.email,
      status: judge.status,
      eventId: judge.eventId,
    });
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (judge: Judge) => {
    setCurrentJudge(judge);
    setIsDeleteDialogOpen(true);
  };

  return (
    <CoordinatorLayout>
      <DashboardHeader 
        title="Judges Management"
        description="Invite and manage judges for your events"
        action={{
          label: "Add Judge",
          onClick: () => setIsAddDialogOpen(true),
          icon: <Plus className="mr-2 h-4 w-4" />,
        }}
      />
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search judges by name or email..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedEventId} onValueChange={setSelectedEventId}>
          <SelectTrigger className="w-full sm:w-[260px]">
            <SelectValue placeholder="Filter by event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Events</SelectItem>
            {userEvents.map(event => (
              <SelectItem key={event.id} value={event.id}>
                {event.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Tabs for Active and Invited judges */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6 w-full sm:w-auto">
          <TabsTrigger value="active" className="flex-1 sm:flex-none">
            Active Judges ({activeJudges.length})
          </TabsTrigger>
          <TabsTrigger value="invited" className="flex-1 sm:flex-none">
            Invited ({invitedJudges.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {activeJudges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeJudges.map(judge => (
                <JudgeCard
                  key={judge.id}
                  judge={judge}
                  showAccessCode={true}
                  onEdit={() => openEditDialog(judge)}
                  onDelete={() => openDeleteDialog(judge)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg border-dashed">
              <h3 className="text-lg font-medium mb-2">No active judges</h3>
              <p className="text-muted-foreground mb-4">
                {filteredJudges.length === 0 ? 
                  "You haven't added any judges yet." : 
                  "No active judges match your search criteria."}
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="invited">
          {invitedJudges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {invitedJudges.map(judge => (
                <JudgeCard
                  key={judge.id}
                  judge={judge}
                  showAccessCode={true}
                  onEdit={() => openEditDialog(judge)}
                  onDelete={() => openDeleteDialog(judge)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg border-dashed">
              <h3 className="text-lg font-medium mb-2">No invited judges</h3>
              <p className="text-muted-foreground">
                {filteredJudges.length === 0 ? 
                  "You haven't invited any judges yet." : 
                  "No invited judges match your search criteria."}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Add Judge Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Judge</DialogTitle>
            <DialogDescription>
              Invite a judge to score candidates in your event
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="event">Select Event</Label>
              <Select 
                value={formData.eventId} 
                onValueChange={(value) => setFormData({...formData, eventId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an event" />
                </SelectTrigger>
                <SelectContent>
                  {userEvents.map(event => (
                    <SelectItem key={event.id} value={event.id}>{event.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="name">Judge Name</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter judge's full name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter judge's email address"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddJudge}
              className="bg-pageant-green hover:bg-pageant-green/90"
              disabled={!formData.name || !formData.email || !formData.eventId || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>Add Judge</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Judge Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Judge</DialogTitle>
            <DialogDescription>
              Update judge information
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Judge Name</Label>
              <Input 
                id="edit-name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email Address</Label>
              <Input 
                id="edit-email" 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData({...formData, status: value})}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="invited">Invited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleEditJudge}
              className="bg-pageant-green hover:bg-pageant-green/90"
              disabled={!formData.name || !formData.email || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>Save Changes</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Judge Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the judge from your event. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteJudge}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>Delete Judge</>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CoordinatorLayout>
  );
};

export default JudgesManagement;
