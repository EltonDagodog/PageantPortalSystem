
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PageantProvider } from "./context/PageantContext";

// Public Pages
import HomePage from "./pages/HomePage";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import CandidateProfile from "./pages/CandidateProfile";
import NotFound from "./pages/NotFound";

// Authentication Pages
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import JudgeLogin from "./pages/JudgeLogin";

// Coordinator Pages
import DashboardHome from "./pages/dashboard/DashboardHome";
import EventsManagement from "./pages/dashboard/EventsManagement";
import JudgesManagement from "./pages/dashboard/JudgesManagement";

// Judge Pages
import JudgeDashboard from "./pages/judge/JudgeDashboard";
import JudgeCandidates from "./pages/judge/JudgeCandidates";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ 
  children, 
  allowedRoles,
  redirectPath = "/signin" 
}: { 
  children: React.ReactNode; 
  allowedRoles: string[];
  redirectPath?: string;
}) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated || (userRole && !allowedRoles.includes(userRole))) {
    return <Navigate to={redirectPath} replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PageantProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:eventId" element={<EventDetails />} />
              <Route path="/candidates/:candidateId" element={<CandidateProfile />} />
              
              {/* Auth Routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/judge-login" element={<JudgeLogin />} />
              
              {/* Coordinator Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={["coordinator"]}>
                  <DashboardHome />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/events" element={
                <ProtectedRoute allowedRoles={["coordinator"]}>
                  <EventsManagement />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/judges" element={
                <ProtectedRoute allowedRoles={["coordinator"]}>
                  <JudgesManagement />
                </ProtectedRoute>
              } />
              
              {/* Judge Routes */}
              <Route path="/judge/dashboard" element={
                <ProtectedRoute allowedRoles={["judge"]}>
                  <JudgeDashboard />
                </ProtectedRoute>
              } />
              <Route path="/judge/candidates" element={
                <ProtectedRoute allowedRoles={["judge"]}>
                  <JudgeCandidates />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PageantProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
