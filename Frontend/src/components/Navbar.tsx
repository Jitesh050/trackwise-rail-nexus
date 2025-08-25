import { useState } from "react";
import { Moon, Sun, Bell } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Train, Menu, User, LogOut, Settings, UserCircle, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/components/ThemeContext";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/register";

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error signing out");
    }
  };
  
  return (
    <nav className="bg-gray-900 border-b border-gray-700 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="md:hidden text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <Menu size={20} />
            </Button>
            
            {!isLoginPage && (
              <Link to="/" className="flex items-center space-x-2">
                <Train size={32} className="text-blue-400" />
                <span className="text-xl font-bold text-white hidden sm:block">TrackWise</span>
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {user && !isLoginPage && (
              <>
                <Link 
                  to="/train-status" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Train Status
                </Link>
                <Link 
                  to="/stations" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Stations
                </Link>
                {user && !isAdmin && (
                  <Link 
                    to="/book-ticket" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Book Ticket
                  </Link>
                )}
                <Link to="/help" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Help
                </Link>
              </>
            )}
            {!user && !isLoginPage && (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user && !isLoginPage && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  <Bell className="h-5 w-5" />
                  {/* Assuming notifications is a state or prop, but not defined in the original file.
                       For now, I'll keep it as is, but it might cause an error if not defined. */}
                  {/* {notifications > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                      {notifications}
                    </Badge>
                  )} */}
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white border border-gray-200">
                    <DropdownMenuLabel className="text-gray-900">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-gray-700">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-700">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600 focus:text-red-600"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            
            {!user && !isLoginPage && (
              <Button 
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Login
              </Button>
            )}

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
