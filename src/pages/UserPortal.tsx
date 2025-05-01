
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Ticket, Clock, Calendar } from "lucide-react";

const UserPortal = () => {
  return (
    <div className="container mx-auto space-y-8 pb-10 animate-enter">
      <header>
        <h1 className="text-3xl font-bold">User Portal</h1>
        <p className="text-muted-foreground">Manage your bookings and account information</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-rail-light rounded-full flex items-center justify-center mb-4">
                <User size={40} className="text-rail-primary" />
              </div>
              <CardTitle>John Traveler</CardTitle>
              <CardDescription>john.t@example.com</CardDescription>
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
        
        <div className="space-y-6">
          <Tabs defaultValue="upcoming">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Journeys</TabsTrigger>
              <TabsTrigger value="past">Past Trips</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Upcoming Journeys</CardTitle>
                  <CardDescription>Manage your upcoming train bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Ticket className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="mb-4">You don't have any upcoming journeys</p>
                    <Button>Book a Ticket</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="past">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Past Journeys</CardTitle>
                  <CardDescription>View your travel history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No past journeys found</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="cancelled">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cancelled Journeys</CardTitle>
                  <CardDescription>View your cancelled bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No cancelled journeys</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
        ? "bg-rail-accent/10 text-rail-accent" 
        : "hover:bg-rail-light text-muted-foreground"
    }`}>
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default UserPortal;
