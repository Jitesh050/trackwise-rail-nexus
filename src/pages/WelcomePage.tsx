
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Train, 
  Users, 
  Shield, 
  Zap, 
  QrCode, 
  MessageCircle,
  MapPin,
  Star,
  CreditCard,
  Clock,
  AlertTriangle,
  Activity,
  LogIn
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const WelcomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await signIn(email, password);
      
      // Route based on email
      if (email.includes("admin")) {
        navigate("/admin");
      } else {
        navigate("/passenger");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const passengerFeatures = [
    { icon: Clock, title: "Live Train Status", description: "Real-time tracking" },
    { icon: QrCode, title: "QR Ticket Booking", description: "Contactless booking" },
    { icon: MessageCircle, title: "AI Chatbot", description: "24/7 assistance" },
    { icon: MapPin, title: "Trip Planner", description: "Hotels & attractions" },
    { icon: Star, title: "Priority Tickets", description: "Fast-track access" },
    { icon: CreditCard, title: "Secure Payments", description: "Multiple options" }
  ];

  const adminFeatures = [
    { icon: AlertTriangle, title: "Collision Detection", description: "Real-time monitoring" },
    { icon: Users, title: "Crowd Density", description: "Heat map analysis" },
    { icon: Zap, title: "Energy Control", description: "Smart optimization" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Train className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Railway Management System</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Modern, intelligent railway operations with seamless passenger experience and advanced admin controls
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Login Section */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <LogIn className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl">Access Portal</CardTitle>
                <CardDescription>
                  Sign in to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
                
                <div className="mt-6 pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground text-center mb-3">Demo Accounts:</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <span>Passenger: user@example.com</span>
                      <Badge variant="outline" className="text-xs">User</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <span>Admin: admin@example.com</span>
                      <Badge variant="outline" className="text-xs">Admin</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Overview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Passenger Features */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold">Passenger Features</h2>
                <Badge variant="secondary">User-Friendly</Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {passengerFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border/50 hover:shadow-sm transition-shadow">
                    <div className="p-2 bg-primary/10 rounded">
                      <feature.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{feature.title}</p>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Features */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold">Admin Features</h2>
                <Badge variant="destructive">Advanced Control</Badge>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                {adminFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border/50 hover:shadow-sm transition-shadow">
                    <div className="p-2 bg-primary/10 rounded">
                      <feature.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{feature.title}</p>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status Preview */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5" />
                  Live System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-lg font-bold text-green-600">43</div>
                    <div className="text-xs text-green-700">Active Trains</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-lg font-bold text-blue-600">98.5%</div>
                    <div className="text-xs text-blue-700">System Uptime</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-lg font-bold text-orange-600">1,247</div>
                    <div className="text-xs text-orange-700">Passengers Today</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
