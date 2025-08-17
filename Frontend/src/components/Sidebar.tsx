
import { Link } from "react-router-dom";
import { 
  Home, 
  Gauge, 
  Train, 
  Map, 
  Ticket, 
  User, 
  HelpCircle, 
  Bell, 
  Info,
  Shield,
  Activity
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const { user, isAdmin } = useAuth();
  
  return (
    <aside 
      className={`bg-white border-r border-border/50 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-72' : 'w-0 md:w-16'
      } overflow-hidden shadow-sm`}
    >
      <div className="h-full flex flex-col py-6">
        <div className="px-6 mb-8">
          {isOpen && (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-1">TrackWise</h2>
              <p className="text-sm text-muted-foreground">Railway Management</p>
            </div>
          )}
        </div>
        
        <nav className="flex-1 px-3">
          <div className="space-y-2">
            <SidebarLink to="/" icon={Home} label="Home" isOpen={isOpen} />
            {user && isAdmin && (
              <SidebarLink to="/admin" icon={Shield} label="Admin Dashboard" isOpen={isOpen} />
            )}
            {user && !isAdmin && (
              <SidebarLink to="/passenger" icon={User} label="Passenger Portal" isOpen={isOpen} />
            )}
            <SidebarLink to="/train-status" icon={Train} label="Train Status" isOpen={isOpen} />
            <SidebarLink to="/stations" icon={Map} label="Stations" isOpen={isOpen} />
            {user && (
              <SidebarLink to="/book-ticket" icon={Ticket} label="Book Ticket" isOpen={isOpen} />
            )}
          </div>
          
          <div className="mt-8">
            {isOpen && (
              <div className="px-3 mb-4">
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Quick Access</h3>
              </div>
            )}
            <div className="space-y-2">
              {user && (
                <SidebarLink to="/user" icon={User} label="My Profile" isOpen={isOpen} />
              )}
              <SidebarLink to="/help" icon={HelpCircle} label="Help & Support" isOpen={isOpen} />
              <SidebarLink to="/announcements" icon={Bell} label="Announcements" isOpen={isOpen} />
              <SidebarLink to="/about" icon={Info} label="About" isOpen={isOpen} />
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isOpen: boolean;
}

const SidebarLink = ({ to, icon: Icon, label, isOpen }: SidebarLinkProps) => {
  return (
    <Link 
      to={to} 
      className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted/50 ${
        isOpen ? 'justify-start' : 'justify-center'
      }`}
    >
      <Icon className={`${isOpen ? 'h-5 w-5' : 'h-6 w-6'} flex-shrink-0 group-hover:scale-110 transition-transform`} />
      {isOpen && <span className="ml-3 font-medium">{label}</span>}
    </Link>
  );
};

export default Sidebar;
