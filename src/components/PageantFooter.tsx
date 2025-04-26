
import { Link } from "react-router-dom";
import PageantLogo from "./PageantLogo";

const PageantFooter = () => {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <PageantLogo size="sm" />
            <p className="text-sm text-muted-foreground text-center md:text-left">
              The premier platform for pageant management and judging.
            </p>
          </div>
          
          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-sm">Pages</h3>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                <Link to="/events" className="hover:text-foreground transition-colors">Events</Link>
                <Link to="/judge-login" className="hover:text-foreground transition-colors">Judge Portal</Link>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-sm">Account</h3>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link to="/signin" className="hover:text-foreground transition-colors">Sign In</Link>
                <Link to="/signup" className="hover:text-foreground transition-colors">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-4">
          <p className="text-xs text-center text-muted-foreground">
            © {new Date().getFullYear()} Pageant Paradise Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PageantFooter;
