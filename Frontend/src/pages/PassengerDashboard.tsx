
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { FeatureSection } from "@/components/ui/feature-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
  TrendingUp,
  CheckCircle,
  Calendar
} from "lucide-react";

const PassengerDashboard = () => {
  const navigate = useNavigate();
  const [notifications] = useState(3);

  const handleFeatureClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="relative overflow-hidden bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome Back, John!</h1>
                <p className="text-lg text-muted-foreground">
                  Your personalized travel hub is ready to assist you
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="relative bg-white/50 backdrop-blur-sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Alerts
                  {notifications > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                      {notifications}
                    </Badge>
                  )}
                </Button>
                <Button variant="outline" size="sm" className="bg-white/50 backdrop-blur-sm">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Bookings</p>
                    <p className="text-xl font-bold">2</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Journey</p>
                    <p className="text-xl font-bold">Today</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Miles Traveled</p>
                    <p className="text-xl font-bold">1,247</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          <DashboardCard
            title="Book New Ticket"
            description="Quick QR code booking"
            icon={QrCode}
            badge="Most Popular"
            badgeVariant="default"
            onClick={() => handleFeatureClick("/book-ticket")}
            className="card-hover bg-slate-800 border-slate-700 text-slate-100"
          />
          <DashboardCard
            title="Live Train Status"
            description="Real-time tracking"
            icon={Train}
            badge="Live Updates"
            badgeVariant="secondary"
            onClick={() => handleFeatureClick("/train-status")}
            className="card-hover bg-slate-800 border-slate-700 text-slate-100"
          />
          <DashboardCard
            title="AI Assistant"
            description="Get instant help"
            icon={MessageCircle}
            badge="24/7 Available"
            badgeVariant="outline"
            onClick={() => handleFeatureClick("/user-portal")}
            className="card-hover bg-slate-800 border-slate-700 text-slate-100"
          />
        </div>

        {/* Main Features */}
        <FeatureSection title="All Travel Services" icon={Train}>
          <DashboardCard
            title="Live Train Updates"
            description="Track delays, arrivals & platform changes in real-time"
            icon={Clock}
            onClick={() => handleFeatureClick("/train-status")}
            className="card-hover"
          />

          <DashboardCard
            title="Smart Trip Planner"
            description="Discover hotels, restaurants & attractions near your destination"
            icon={MapPin}
            onClick={() => handleFeatureClick("/trip-planner")}
            className="card-hover"
          />

          <DashboardCard
            title="Priority Booking"
            description="Skip queues with premium fast-track access"
            icon={Star}
            badge="Premium"
            badgeVariant="outline"
            onClick={() => handleFeatureClick("/book-ticket")}
            className="card-hover"
          />

          <DashboardCard
            title="Secure Payments"
            description="Multiple payment methods with bank-level security"
            icon={CreditCard}
            onClick={() => handleFeatureClick("/book-ticket")}
            className="card-hover"
          />

          <DashboardCard
            title="Smart Chatbot"
            description="AI-powered assistance for all your booking needs"
            icon={MessageCircle}
            badge="AI Powered"
            badgeVariant="default"
            onClick={() => handleFeatureClick("/user-portal")}
            className="card-hover"
          />
        </FeatureSection>

        {/* Recent Activity */}
        <Card className="glass-morphism border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Recent Activity</h3>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                View All History
              </Button>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 bg-slate-800 border-slate-700 text-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <QrCode className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Ticket Successfully Booked</p>
                    <p className="text-sm text-muted-foreground">Express 101 • Central to North Station</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Today 2:30 PM</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-800 border-slate-700 text-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Train className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Journey Completed Successfully</p>
                    <p className="text-sm text-muted-foreground">Local 205 • Arrived on time at destination</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Yesterday 6:45 PM</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PassengerDashboard;
