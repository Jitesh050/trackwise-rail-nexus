
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { 
  User, 
  Ticket, 
  Clock, 
  Calendar, 
  Train,
  MessageCircle,
  QrCode,
  Star,
  Bell
} from "lucide-react";
import BookedTickets from "@/components/BookedTickets";
import LiveTrainStatus from "@/components/LiveTrainStatus";

const UserPortal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Portal</h1>
            <p className="text-muted-foreground mt-1">
              Manage your bookings and account information
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Profile Card */}
          <Card className="border-border/50 h-fit">
            <CardHeader>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <User size={32} className="text-primary" />
                </div>
                <CardTitle>John Traveler</CardTitle>
                <CardDescription>john.t@example.com</CardDescription>
                <Badge variant="secondary" className="mt-2">Premium Member</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <NavItem label="Profile Settings" icon={<User size={16} />} active />
                <NavItem label="My Tickets" icon={<Ticket size={16} />} />
                <NavItem label="Travel History" icon={<Clock size={16} />} />
                <NavItem label="Upcoming Journeys" icon={<Calendar size={16} />} />
              </nav>
            </CardContent>
          </Card>
          
          {/* Main Content */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-3">
              <DashboardCard
                title="Book New Ticket"
                description="Quick booking with QR code"
                icon={QrCode}
                badge="Fast"
                badgeVariant="default"
              />
              <DashboardCard
                title="AI Assistant"
                description="Get booking help instantly"
                icon={MessageCircle}
                badge="24/7"
                badgeVariant="secondary"
              />
              <DashboardCard
                title="Priority Booking"
                description="Skip the queue"
                icon={Star}
                badge="Premium"
                badgeVariant="outline"
              />
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="booked" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 bg-card border border-border/50">
                <TabsTrigger value="booked" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Ticket className="h-4 w-4 mr-2" />
                  Booked Tickets
                </TabsTrigger>
                <TabsTrigger value="live" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Train className="h-4 w-4 mr-2" />
                  Live Train Status
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="booked" className="mt-6">
                <div className="bg-card rounded-xl border border-border/50 p-6">
                  <BookedTickets />
                </div>
              </TabsContent>
              
              <TabsContent value="live" className="mt-6">
                <div className="bg-card rounded-xl border border-border/50 p-6">
                  <LiveTrainStatus />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const NavItem = ({ label, icon, active }: NavItemProps) => {
  return (
    <button className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${
      active 
        ? "bg-primary/10 text-primary border border-primary/20" 
        : "hover:bg-muted text-muted-foreground hover:text-foreground"
    }`}>
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default UserPortal;
