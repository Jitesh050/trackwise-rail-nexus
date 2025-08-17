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
import { cn } from "@/lib/utils";

// Add proper types
interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const { user, isAdmin } = useAuth();
  
  return (
    <aside 
      className={cn(
        "transition-all duration-300 ease-in-out overflow-hidden shadow-lg rounded-r-2xl bg-slate-900 border-r border-border/50",
        isOpen ? "w-72" : "w-0 md:w-16"
      )}
    >
      <div className="h-full flex flex-col py-6">
        <div className="px-6 mb-8">
          {isOpen && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">TrackWise</h2>
              <p className="text-sm text-slate-400">Railway Management</p>
            </div>
          )}
        </div>
        
        <nav className="flex-1 px-3">
          <div className="space-y-2">
            <SidebarLink to="/home" icon={Home} label="Home" isOpen={isOpen} />
            {user && isAdmin && (
              <SidebarLink to="/admin" icon={Shield} label="Admin Dashboard" isOpen={isOpen} />
            )}
            <SidebarLink to="/announcements" icon={Bell} label="Announcements" isOpen={isOpen} />
            {user && !isAdmin && (
              <>
                <SidebarLink to="/passenger" icon={Gauge} label="Passenger Portal" isOpen={isOpen} />
                <SidebarLink to="/profile" icon={Activity} label="My Profile" isOpen={isOpen} />
              </>
            )}
            <SidebarLink to="/train-status" icon={Train} label="Train Status" isOpen={isOpen} />
            <SidebarLink to="/stations" icon={Map} label="Stations" isOpen={isOpen} />
            {user && !isAdmin && (
              <>
                <SidebarLink to="/book-ticket" icon={Ticket} label="Book Ticket" isOpen={isOpen} />
                <SidebarLink to="/chatbot" icon={HelpCircle} label="ChatBot" isOpen={isOpen} />
              </>
            )}
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
      className={cn(
        "group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200",
        "text-slate-300 hover:text-white hover:bg-slate-800",
        isOpen ? "justify-start" : "justify-center"
      )}
    >
      <Icon className={cn(
        "flex-shrink-0 transition-transform group-hover:scale-110",
        isOpen ? "h-5 w-5" : "h-6 w-6"
      )} />
      {isOpen && <span className="ml-3 font-medium">{label}</span>}
    </Link>
  );
};

export default Sidebar;
