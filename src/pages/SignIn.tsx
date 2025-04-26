
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthCard from "@/components/AuthCard";
import { LogIn, Loader2 } from "lucide-react";
import PageantNavbar from "@/components/PageantNavbar";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { email: "", password: "" };
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
      formIsValid = false;
    }
    
    if (!password) {
      newErrors.password = "Password is required";
      formIsValid = false;
    }
    
    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        const success = await login(email, password);
        if (success) {
          navigate("/dashboard");
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
      title="Welcome Back" 
      description="Sign in to your coordinator account"
      footer={
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary font-semibold hover:underline">
            Sign Up
          </Link>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          {errors.password && <p className="text-destructive text-xs">{errors.password}</p>}
        </div>
        
        <div className="text-sm text-right">
          <Link to="#" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        
        <Button type="submit" className="w-full bg-pageant-green hover:bg-pageant-green/90" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </>
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <Link to="/judge-login" className="text-sm text-muted-foreground hover:text-foreground">
          Are you a judge? <span className="text-primary font-medium">Login here</span>
        </Link>
      </div>
    </AuthCard>

  );
};

export default SignIn;
