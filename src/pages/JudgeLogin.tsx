
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthCard from "@/components/AuthCard";
import { LogIn, Loader2 } from "lucide-react";

const JudgeLogin = () => {
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { judgeLogin } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!accessCode.trim()) {
      setError("Access code is required");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        const success = await judgeLogin(accessCode);
        if (success) {
          navigate("/judge/dashboard");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AuthCard 
      title="Judge Portal" 
      description="Enter your unique access code to begin scoring"
      footer={
        <div className="text-center text-sm">
          <Link to="/" className="text-primary hover:underline">
            Return to Home Page
          </Link>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="accessCode">Access Code</Label>
          <Input
            id="accessCode"
            placeholder="Enter your judge access code"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
            disabled={isLoading}
            className="text-center uppercase font-mono tracking-wider"
          />
          {error && <p className="text-destructive text-xs">{error}</p>}
        </div>
        
        <Button type="submit" className="w-full bg-pageant-green hover:bg-pageant-green/90" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              Access Judging Portal
            </>
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <Link to="/signin" className="text-sm text-muted-foreground hover:text-foreground">
          Are you a coordinator? <span className="text-primary font-medium">Login here</span>
        </Link>
      </div>
    </AuthCard>
  );
};

export default JudgeLogin;
