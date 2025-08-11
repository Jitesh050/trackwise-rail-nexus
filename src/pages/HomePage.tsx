
import { useNavigate } from "react-router-dom";
import { Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto space-y-10 pb-10 animate-enter">
      {/* Hero section */}
      <section className="relative bg-rail-primary text-white rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578467581753-f91757efdb78')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 py-16 px-6 md:px-10 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to TrackWise Rail</h1>
            <p className="text-xl mb-8 text-gray-200">
              Real-time train updates, easy booking, and comprehensive railway management
            </p>
            
            {/* Login Options */}
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8 text-rail-accent" />
                  <h3 className="text-xl font-semibold">Passenger Portal</h3>
                </div>
                <p className="text-gray-200 mb-4">Book tickets, check train status, and plan your journey</p>
                <Button 
                  onClick={() => navigate("/login?type=passenger")}
                  className="w-full bg-rail-accent hover:bg-rail-accent/90"
                >
                  Passenger Login
                </Button>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-8 w-8 text-yellow-400" />
                  <h3 className="text-xl font-semibold">Admin Dashboard</h3>
                </div>
                <p className="text-gray-200 mb-4">Monitor operations, track crowds, and manage safety</p>
                <Button 
                  onClick={() => navigate("/login?type=admin")}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900"
                >
                  Admin Login
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10"
                onClick={() => navigate("/register")}
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
