
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Train, LogIn, Shield, User, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") || "passenger";
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Welcome back! Login successful");
        // Navigate based on user role
        if (email === 'admin@example.com') {
          navigate("/admin");
        } else {
          navigate("/passenger");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-rail-accent/20 rounded-full blur-xl"></div>
              <div className="relative p-4 bg-gradient-to-br from-rail-primary to-rail-secondary rounded-full">
                <Train className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-slate-400">Sign in to access your TrackWise account</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="bg-slate-800/90 backdrop-blur-sm border-slate-600 shadow-2xl">
          <CardHeader className="space-y-4">
            <Tabs value={userType} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-700 border-slate-600">
                <TabsTrigger 
                  value="passenger" 
                  className="data-[state=active]:bg-rail-accent data-[state=active]:text-white"
                  onClick={() => navigate("/login?type=passenger")}
                >
                  <User className="w-4 h-4 mr-2" />
                  Passenger
                </TabsTrigger>
                <TabsTrigger 
                  value="admin" 
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-slate-900"
                  onClick={() => navigate("/login?type=admin")}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="passenger" className="mt-4">
                <div className="text-center space-y-2">
                  <CardTitle className="text-xl text-white flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-rail-accent rounded-full animate-pulse"></div>
                    Passenger Portal
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Access booking, trip planning, and travel updates
                  </CardDescription>
                </div>
              </TabsContent>
              
              <TabsContent value="admin" className="mt-4">
                <div className="text-center space-y-2">
                  <CardTitle className="text-xl text-white flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    Admin Control Center
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Monitor operations, safety systems, and analytics
                  </CardDescription>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-rail-accent focus:ring-rail-accent/20 transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-rail-accent focus:ring-rail-accent/20 transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-rail-accent" />
                  <span className="text-sm font-medium text-slate-300">Demo Credentials</span>
                </div>
                <div className="space-y-1 text-xs text-slate-400">
                  <p><strong className="text-slate-300">Admin:</strong> admin@example.com</p>
                  <p><strong className="text-slate-300">Passenger:</strong> user@example.com</p>
                  <p><strong className="text-slate-300">Password:</strong> any password</p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className={`w-full h-12 text-white font-medium transition-all duration-200 ${
                  userType === 'admin' 
                    ? 'bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/25' 
                    : 'bg-rail-primary hover:bg-rail-primary/90 hover:shadow-lg hover:shadow-rail-primary/25'
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn size={18} />
                    Sign In
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-slate-400">
                  Don't have an account?{" "}
                  <Link 
                    to="/register" 
                    className="text-rail-accent hover:text-rail-accent/80 font-medium transition-colors hover:underline"
                  >
                    Create Account
                  </Link>
                </p>
                <Link 
                  to="/" 
                  className="text-xs text-slate-500 hover:text-slate-400 transition-colors inline-flex items-center gap-1"
                >
                  ← Back to Home
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
