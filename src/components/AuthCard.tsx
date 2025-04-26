
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import PageantLogo from "./PageantLogo";

interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const AuthCard = ({ title, description, children, footer }: AuthCardProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen bg-gradient-to-br from-pageant-green/90 to-pageant-green/50 p-4 ">
      <Card className="w-full max-w-md shadow-xl border-pageant-gold/20 animate-in fade-in duration-500 mt-20">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <PageantLogo size="lg" />
          </div>
          <CardTitle className="text-2xl font-playfair font-semibold">{title}</CardTitle>
          {description && <CardDescription className="text-muted-foreground">{description}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-4">
          {children}
        </CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </div>
  );
};

export default AuthCard;
