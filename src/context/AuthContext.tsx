
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { UserRole, User } from "../types/pageant-types";
import { coordinators, judges } from "../data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  login: (email: string, password: string) => Promise<boolean>;
  judgeLogin: (accessCode: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const { toast } = useToast();

  // Check for stored authentication on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("pageantUser");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
        setUserRole(user.role);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("pageantUser");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    // In real app, this would be an API call to backend
    try {
      // Find user in our mock data
      const user = coordinators.find((u) => u.email === email);
      
      if (user) {
        // In a real app, we'd verify the password here
        // For now we'll just assume the password is correct if the email exists
        
        setCurrentUser(user);
        setIsAuthenticated(true);
        setUserRole(user.role);
        
        // Store in localStorage for persistence
        localStorage.setItem("pageantUser", JSON.stringify(user));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const judgeLogin = async (accessCode: string): Promise<boolean> => {
    try {
      // Find judge with matching access code
      const judge = judges.find((j) => j.accessCode === accessCode);
      
      if (judge && judge.status === "active") {
        // Create a user object from the judge data
        const judgeUser: User = {
          id: judge.id,
          name: judge.name,
          email: judge.email,
          role: "judge",
          accessCode: judge.accessCode,
        };
        
        setCurrentUser(judgeUser);
        setIsAuthenticated(true);
        setUserRole("judge");
        
        // Store in localStorage for persistence
        localStorage.setItem("pageantUser", JSON.stringify(judgeUser));
        
        toast({
          title: "Login successful",
          description: `Welcome, Judge ${judge.name}!`,
        });
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid access code or inactive judge status",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Judge login error:", error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Check if email already exists
      const userExists = coordinators.some((u) => u.email === email);
      
      if (userExists) {
        toast({
          title: "Signup failed",
          description: "Email already in use",
          variant: "destructive",
        });
        return false;
      }
      
      // In a real app, we'd create a new user in the database
      // For now, we'll just simulate success
      
      // Create a mock user
      const newUser: User = {
        id: `new-${Date.now()}`, // Generate a temporary ID
        name,
        email,
        role: "coordinator",
      };
      
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      setUserRole("coordinator");
      
      // Store in localStorage for persistence
      localStorage.setItem("pageantUser", JSON.stringify(newUser));
      
      toast({
        title: "Signup successful",
        description: `Welcome, ${name}!`,
      });
      
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem("pageantUser");
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const value = {
    currentUser,
    isAuthenticated,
    userRole,
    login,
    judgeLogin,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
