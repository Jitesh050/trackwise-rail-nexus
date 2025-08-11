
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Train, LogIn, Shield, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/";
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Logged in successfully!");
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Train size={48} className="mx-auto text-rail-accent mb-4" />
          <h1 className="text-3xl font-bold text-white">Welcome to TrackWise</h1>
          <p className="text-slate-400 mt-2">Sign in to access your portal</p>
        </div>

        <Card className="bg-slate-800 border-slate-600">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl text-white">Sign In</CardTitle>
            <CardDescription className="text-slate-400">Choose your portal to continue</CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="bg-slate-700 border-slate-600 hover:bg-slate-600 transition-colors cursor-pointer">
                  <CardContent className="flex flex-col items-center p-4">
                    <User className="h-8 w-8 text-blue-400 mb-2" />
                    <span className="text-sm text-white font-medium">Passenger</span>
                    <span className="text-xs text-slate-400">Book tickets & travel</span>
                  </CardContent>
                </Card>
                
                <Card className="bg-slate-700 border-slate-600 hover:bg-slate-600 transition-colors cursor-pointer">
                  <CardContent className="flex flex-col items-center p-4">
                    <Shield className="h-8 w-8 text-red-400 mb-2" />
                    <span className="text-sm text-white font-medium">Admin</span>
                    <span className="text-xs text-slate-400">Manage operations</span>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-rail-accent hover:text-rail-accent/80">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked: boolean) => setRememberMe(checked)}
                />
                <Label htmlFor="remember" className="text-sm font-normal text-slate-300">Remember me</Label>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col">
              <Button 
                type="submit" 
                className="w-full bg-rail-primary hover:bg-rail-primary/90 text-white" 
                disabled={isLoading}
              >
                <LogIn size={18} className="mr-2" />
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
              <p className="text-sm text-center mt-4 text-slate-400">
                Don't have an account?{" "}
                <Link to="/register" className="text-rail-accent hover:text-rail-accent/80 font-medium">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
