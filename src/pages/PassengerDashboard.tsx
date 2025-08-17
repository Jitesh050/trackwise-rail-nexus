
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { FeatureSection } from "@/components/ui/feature-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Train, 
  QrCode, 
  MessageCircle, 
  MapPin, 
  Star, 
  CreditCard,
  Clock,
  User,
  Bell,
  Settings
} from "lucide-react";

const PassengerDashboard = () => {
  const navigate = useNavigate();
  const [notifications] = useState(2);

  const handleFeatureClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Passenger Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Manage your travel experience effortlessly.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <DashboardCard
            title="Book Ticket"
            description="Quick booking with QR code"
            icon={QrCode}
            badge="Popular"
            badgeVariant="default"
            onClick={() => handleFeatureClick("/book-ticket")}
          />
          <DashboardCard
            title="Train Status"
            description="Live updates and tracking"
            icon={Train}
            badge="Live"
            badgeVariant="secondary"
            onClick={() => handleFeatureClick("/train-status")}
          />
          <DashboardCard
            title="AI Assistant"
            description="Get help with bookings"
            icon={MessageCircle}
            badge="24/7"
            badgeVariant="outline"
            onClick={() => handleFeatureClick("/user-portal")}
          />
        </div>

        {/* Main Features */}
        <FeatureSection title="Travel Services" icon={Train}>
          <DashboardCard
            title="Live Train Status"
            description="Real-time train tracking and updates"
            icon={Clock}
            onClick={() => handleFeatureClick("/train-status")}
          >
            <div className="text-sm text-muted-foreground">
              Track delays, arrivals, and platform changes
            </div>
          </DashboardCard>

          <DashboardCard
            title="QR Ticket Booking"
            description="Digital tickets with QR codes"
            icon={QrCode}
            badge="Contactless"
            badgeVariant="secondary"
            onClick={() => handleFeatureClick("/book-ticket")}
          >
            <div className="text-sm text-muted-foreground">
              Instant booking with mobile-friendly QR codes
            </div>
          </DashboardCard>

          <DashboardCard
            title="Trip Planner"
            description="Plan your complete journey"
            icon={MapPin}
            onClick={() => handleFeatureClick("/trip-planner")}
          >
            <div className="text-sm text-muted-foreground">
              Find hotels, attractions, and nearby spots
            </div>
          </DashboardCard>

          <DashboardCard
            title="Priority Tickets"
            description="Fast-track booking and boarding"
            icon={Star}
            badge="Premium"
            badgeVariant="outline"
            onClick={() => handleFeatureClick("/book-ticket")}
          >
            <div className="text-sm text-muted-foreground">
              Skip queues with priority access
            </div>
          </DashboardCard>

          <DashboardCard
            title="Payment System"
            description="Secure and flexible payments"
            icon={CreditCard}
            onClick={() => handleFeatureClick("/book-ticket")}
          >
            <div className="text-sm text-muted-foreground">
              Multiple payment options with security
            </div>
          </DashboardCard>

          <DashboardCard
            title="Chatbot Support"
            description="AI-powered booking assistance"
            icon={MessageCircle}
            badge="Smart"
            badgeVariant="default"
            onClick={() => handleFeatureClick("/user-portal")}
          >
            <div className="text-sm text-muted-foreground">
              Get instant help with ticket booking
            </div>
          </DashboardCard>
        </FeatureSection>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <QrCode className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Ticket Booked Successfully</p>
                  <p className="text-sm text-muted-foreground">Express 101 - Central to North</p>
                </div>
              </div>
              <Badge variant="outline">Today</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Train className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Journey Completed</p>
                  <p className="text-sm text-muted-foreground">Local 205 - On time arrival</p>
                </div>
              </div>
              <Badge variant="outline">Yesterday</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerDashboard;
