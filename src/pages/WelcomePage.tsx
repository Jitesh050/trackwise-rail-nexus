
import { useNavigate } from "react-router-dom";
import { Train, ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-rail-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-rail-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-rail-accent/5 to-rail-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="container mx-auto max-w-4xl space-y-12 animate-fade-in">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-rail-accent/30 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative p-6 bg-gradient-to-br from-rail-primary via-rail-secondary to-rail-accent rounded-full">
                  <Train className="h-20 w-20 text-white drop-shadow-lg" />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-white via-slate-200 to-rail-accent bg-clip-text text-transparent">
                  TrackWise Rail
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Experience the future of railway management with real-time updates, 
                intelligent booking, and comprehensive operational control
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-600/50">
                <Zap className="w-4 h-4 text-rail-accent" />
                <span className="text-sm text-slate-300">Real-time Tracking</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-600/50">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-slate-300">Smart Analytics</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-600/50">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-slate-300">Safety First</span>
              </div>
            </div>
          </div>

          {/* Single Login Card */}
          <div className="flex justify-center">
            <Card 
              className="group bg-slate-800/80 backdrop-blur-sm border-slate-600 hover:border-rail-accent transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-rail-accent/10 hover:-translate-y-1 w-full max-w-md"
              onClick={() => navigate("/login")}
            >
              <CardHeader className="text-center space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-rail-accent/20 rounded-full blur-lg group-hover:bg-rail-accent/30 transition-all duration-300"></div>
                    <div className="relative p-4 bg-gradient-to-br from-rail-primary to-rail-accent rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Train className="h-10 w-10 text-white" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-semibold text-white group-hover:text-rail-accent transition-colors">
                    Access TrackWise Portal
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-base leading-relaxed">
                    Sign in to access your personalized dashboard with booking, tracking, and management features
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-2 h-2 bg-rail-accent rounded-full"></div>
                    Smart Booking
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-2 h-2 bg-rail-accent rounded-full"></div>
                    Live Updates
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-2 h-2 bg-rail-accent rounded-full"></div>
                    Trip Planning
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-2 h-2 bg-rail-accent rounded-full"></div>
                    Analytics
                  </div>
                </div>
                <Button
                  onClick={() => navigate("/login")}
                  className="w-full bg-rail-primary hover:bg-rail-primary/90 text-white h-12 group/btn transition-all duration-200 hover:shadow-lg hover:shadow-rail-primary/25"
                >
                  <span className="flex items-center gap-2">
                    Sign In to Continue
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bottom CTA */}
          <div className="text-center space-y-4 pt-4">
            <p className="text-slate-400 text-lg">
              New to TrackWise Rail?
            </p>
            <Button
              variant="outline"
              size="lg"
              className="text-rail-accent border-rail-accent hover:bg-rail-accent hover:text-white transition-all duration-200 hover:shadow-lg hover:shadow-rail-accent/25"
              onClick={() => navigate("/register")}
            >
              <span className="flex items-center gap-2">
                Create Your Account
                <Sparkles size={18} />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
