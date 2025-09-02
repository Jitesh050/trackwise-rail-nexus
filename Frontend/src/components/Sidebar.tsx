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
  Activity,
  Users,
  FileText,
  Settings,
  BarChart3,
  AlertTriangle,
  Zap,
  Calendar,
  Database,
  MessageSquare,
  CreditCard,
  Route,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload
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
        "transition-all duration-300 ease-in-out overflow-hidden shadow-lg rounded-r-2xl bg-gray-900 border-r border-gray-700",
        isOpen ? "w-72" : "w-0 md:w-16"
      )}
    >
      <div className="h-full flex flex-col py-6">
        <div className="px-6 mb-8">
          {isOpen && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">TrackWise</h2>
              <p className="text-sm text-gray-300">Railway Management</p>
            </div>
          )}
        </div>
        
        <nav className="flex-1 px-3">
          <div className="space-y-2">
            <SidebarLink to="/" icon={Home} label="Home" isOpen={isOpen} />
            
            {user && isAdmin && (
              <>
                {/* Admin Dashboard */}
                <SidebarLink to="/admin" icon={Shield} label="Admin Dashboard" isOpen={isOpen} />
                
                {/* Priority Tickets Management */}
                <SidebarLink to="/admin/priority-tickets" icon={Star} label="Priority Tickets" isOpen={isOpen} />
                
                {/* Ticket Management */}
                <SidebarLink to="/admin/tickets" icon={Ticket} label="Ticket Management" isOpen={isOpen} />
                
                {/* Train Management */}
                <SidebarLink to="/admin/trains" icon={Train} label="Train Management" isOpen={isOpen} />
                
                {/* Route Management */}
                <SidebarLink to="/admin/routes" icon={Route} label="Route Management" isOpen={isOpen} />
                
                {/* Station Management */}
                <SidebarLink to="/admin/stations" icon={Map} label="Station Management" isOpen={isOpen} />
                
                {/* Schedule Management */}
                <SidebarLink to="/admin/schedules" icon={Calendar} label="Schedule Management" isOpen={isOpen} />
                
                {/* User Management */}
                <SidebarLink to="/admin/users" icon={Users} label="User Management" isOpen={isOpen} />
                
                {/* Staff Management */}
                <SidebarLink to="/admin/staff" icon={User} label="Staff Management" isOpen={isOpen} />
                
                {/* Reports & Analytics */}
                <SidebarLink to="/admin/reports" icon={BarChart3} label="Reports & Analytics" isOpen={isOpen} />
                
                {/* Financial Management */}
                <SidebarLink to="/admin/finance" icon={CreditCard} label="Financial Management" isOpen={isOpen} />
                
                {/* Customer Support */}
                <SidebarLink to="/admin/support" icon={MessageSquare} label="Customer Support" isOpen={isOpen} />
                
                {/* System Monitoring */}
                <SidebarLink to="/admin/monitoring" icon={Activity} label="System Monitoring" isOpen={isOpen} />
                
                {/* Collision Detection */}
                <SidebarLink to="/admin/collision" icon={AlertTriangle} label="Collision Detection" isOpen={isOpen} />
                
                {/* Crowd Monitoring */}
                <SidebarLink to="/admin/crowd" icon={Users} label="Crowd Monitoring" isOpen={isOpen} />
                
                {/* Energy Management */}
                <SidebarLink to="/admin/energy" icon={Zap} label="Energy Management" isOpen={isOpen} />
                
                {/* Database Management */}
                <SidebarLink to="/admin/database" icon={Database} label="Database Management" isOpen={isOpen} />
                
                {/* System Settings */}
                <SidebarLink to="/admin/settings" icon={Settings} label="System Settings" isOpen={isOpen} />
              </>
            )}
            
            {user && !isAdmin && (
              <>
                <SidebarLink to="/passenger" icon={Gauge} label="Passenger Portal" isOpen={isOpen} />
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
        "text-gray-300 hover:text-white hover:bg-gray-800",
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
