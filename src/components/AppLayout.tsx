import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Zap, Droplet, Trash2, Wind, Users, Settings, LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useHostel } from '@/contexts/HostelContext';

const mainMenuItems = [
  { title: 'Dashboard', icon: Home, path: '/dashboard' },
  { title: 'Energy', icon: Zap, path: '/dashboard/energy' },
  { title: 'Water', icon: Droplet, path: '/dashboard/water' },
  { title: 'Waste', icon: Trash2, path: '/dashboard/waste' },
  { title: 'Air Quality', icon: Wind, path: '/dashboard/air' },
];

const managementItems = [
  { title: 'Occupancy', icon: Users, path: '/occupancy' },
  { title: 'Settings', icon: Settings, path: '/settings' },
];

export const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setConfig } = useHostel();

  const handleLogout = () => {
    setConfig({
      totalHostels: 0,
      totalRooms: 0,
      totalBuildings: 0,
      isConfigured: false,
    });
    navigate('/setup');
  };

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-border/50">
          <div className="p-4 border-b border-border/50">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EcoTrack Campus
            </h1>
          </div>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => navigate(item.path)}
                        isActive={isActive(item.path)}
                        className="w-full"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {managementItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => navigate(item.path)}
                        isActive={isActive(item.path)}
                        className="w-full"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
            <div className="flex items-center gap-4 p-4">
              <SidebarTrigger />
              <h2 className="text-lg font-semibold">Smart Campus Dashboard</h2>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
