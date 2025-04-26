
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, LogOut, Users } from "lucide-react";
import PageantLogo from "./PageantLogo";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface JudgeLayoutProps {
  children: ReactNode;
}

const JudgeLayout = ({ children }: JudgeLayoutProps) => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/judge/dashboard",
    },
    {
      title: "Candidates",
      icon: Users,
      path: "/judge/candidates",
    }
  ];

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full grid-cols-[auto_1fr]">
        <Sidebar className="border-r bg-sidebar text-sidebar-foreground">
          <SidebarHeader className="flex h-14 items-center px-6">
            <PageantLogo darkMode={true} />
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.path}
                        className="flex items-center gap-3"
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <Separator />
            <div className="p-6">
              <div className="mb-4 space-y-1">
                <div className="text-xs opacity-70">
                  Signed in as: <span className="font-semibold">{currentUser?.name}</span>
                </div>
                <Badge variant="secondary" className="text-xs">Judge Access</Badge>
              </div>
              <SidebarMenuButton
                asChild
                className="flex w-full items-center gap-3 rounded-md border border-sidebar-border px-3 py-2 text-sm"
                onClick={handleLogout}
              >
                <button>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </SidebarMenuButton>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-6 lg:h-[60px]">
            <SidebarTrigger />
            <div className="text-xl font-semibold">Judge Portal</div>
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default JudgeLayout;
