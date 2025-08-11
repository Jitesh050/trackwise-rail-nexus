
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Train, Menu, User, LogOut, Settings, UserCircle, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

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
    <nav className="bg-rail-primary border-b border-rail-light">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="md:hidden text-white hover:bg-rail-primary/80"
            >
              <Menu size={20} />
            </Button>
            
            <Link to="/" className="flex items-center space-x-2">
              <Train size={32} className="text-white" />
              <span className="text-xl font-bold text-white hidden sm:block">TrackWise</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/train-status" className="text-white hover:text-rail-light transition-colors">
              Train Status
            </Link>
            <Link to="/stations" className="text-white hover:text-rail-light transition-colors">
              Stations
            </Link>
            {user && (
              <Link to="/book-ticket" className="text-white hover:text-rail-light transition-colors">
                Book Ticket
              </Link>
            )}
            <Link to="/help" className="text-white hover:text-rail-light transition-colors">
              Help
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-rail-primary/80">
                    <User size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate(isAdmin ? '/admin' : '/user')}>
                    {isAdmin ? <Shield size={16} className="mr-2" /> : <UserCircle size={16} className="mr-2" />}
                    {isAdmin ? 'Admin Dashboard' : 'User Portal'}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings size={16} className="mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-rail-primary/80"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-rail-primary border-white hover:bg-white hover:text-rail-primary"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-rail-primary/80">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 pt-4">
                  <Link 
                    to="/train-status" 
                    className="text-left p-2 hover:bg-rail-light rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Train Status
                  </Link>
                  <Link 
                    to="/stations" 
                    className="text-left p-2 hover:bg-rail-light rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Stations
                  </Link>
                  {user && (
                    <Link 
                      to="/book-ticket" 
                      className="text-left p-2 hover:bg-rail-light rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Book Ticket
                    </Link>
                  )}
                  <Link 
                    to="/help" 
                    className="text-left p-2 hover:bg-rail-light rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Help
                  </Link>
                  {user && (
                    <Link 
                      to={isAdmin ? '/admin' : '/user'} 
                      className="text-left p-2 hover:bg-rail-light rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {isAdmin ? 'Admin Dashboard' : 'User Portal'}
                    </Link>
                  )}
                  {!user && (
                    <>
                      <Link 
                        to="/login" 
                        className="text-left p-2 hover:bg-rail-light rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link 
                        to="/register" 
                        className="text-left p-2 hover:bg-rail-light rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
