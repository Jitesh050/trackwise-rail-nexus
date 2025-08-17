
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Train, LogIn, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  
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
    <div className="min-h-screen bg-slate-900 dark:bg-slate-900 flex items-center justify-center p-4">
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
        <Card className="bg-slate-800 dark:bg-slate-800 border-slate-700 rounded-2xl shadow-xl">
          <CardHeader className="space-y-4">
            <div className="text-center space-y-2">
              <CardTitle className="text-xl text-white flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-rail-accent rounded-full animate-pulse"></div>
                TrackWise Portal
              </CardTitle>
              <CardDescription className="text-slate-400">
                Access your dashboard and travel services
              </CardDescription>
            </div>
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
                className="w-full h-12 bg-rail-primary hover:bg-rail-primary/90 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-rail-primary/25"
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
