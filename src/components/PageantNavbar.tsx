
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageantLogo from "./PageantLogo";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";

const PageantNavbar = () => {
  const { isAuthenticated, userRole, logout, currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <PageantLogo />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm transition-colors hover:text-foreground/80 ${
              isActive("/") ? "text-foreground font-medium" : "text-foreground/60"
            }`}
          >
            Home
          </Link>
          <Link
            to="/events"
            className={`text-sm transition-colors hover:text-foreground/80 ${
              isActive("/events") ? "text-foreground font-medium" : "text-foreground/60"
            }`}
          >
            Events
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <>
              <Link to="/judge-login">
                <Button variant="outline" size="sm">Judge Portal</Button>
              </Link>
              <Link to="/signin">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-pageant-green hover:bg-pageant-green/90" size="sm">Sign Up</Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User size={16} />
                  <span className="hidden sm:inline">
                    {currentUser?.name || "Account"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {userRole === "coordinator" ? "Coordinator Account" : "Judge Account"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userRole === "coordinator" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/events">Manage Events</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                {userRole === "judge" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/judge/dashboard">Judging Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageantNavbar;
