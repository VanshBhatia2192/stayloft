
import { User, Heart, MessageSquare, History, Calendar, CreditCard, Settings, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

interface UserDashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadMessages: number;
}

const UserDashboardSidebar = ({ activeTab, setActiveTab, unreadMessages }: UserDashboardSidebarProps) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    // Get user name and avatar from localStorage
    const storedUserName = localStorage.getItem("userName");
    const storedUserAvatar = localStorage.getItem("userAvatar");
    
    if (storedUserName) {
      setUserName(storedUserName);
    }
    
    if (storedUserAvatar) {
      setUserAvatar(storedUserAvatar);
    }
    
    // Listen for storage events to update avatar if changed in another tab
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "userAvatar") {
        setUserAvatar(e.newValue || "");
      } else if (e.key === "userName") {
        setUserName(e.newValue || "User");
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    navigate(`/user-dashboard/${tab}`);
  };

  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
        <div className="flex items-center gap-4 mb-4 pb-4 border-b">
          <Avatar className="h-12 w-12">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-primary/10">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{userName}</h3>
            <p className="text-sm text-gray-600">Tenant</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          <button 
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-left ${
              activeTab === "saved-properties" ? "bg-primary/10 text-primary font-medium" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => handleNavigation("saved-properties")}
          >
            <Heart className="h-5 w-5" />
            <span>Saved Properties</span>
          </button>
          
          <button 
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-left ${
              activeTab === "chats" ? "bg-primary/10 text-primary font-medium" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => navigate("/chat/support")}
          >
            <div className="relative">
              <MessageSquare className="h-5 w-5" />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </div>
            <span>Messages</span>
          </button>
          
          <button 
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-left ${
              activeTab === "recent-searches" ? "bg-primary/10 text-primary font-medium" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => handleNavigation("recent-searches")}
          >
            <History className="h-5 w-5" />
            <span>Recent Searches</span>
          </button>
          
          <button 
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-left ${
              activeTab === "bookings" ? "bg-primary/10 text-primary font-medium" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => handleNavigation("bookings")}
          >
            <Calendar className="h-5 w-5" />
            <span>Booking History</span>
          </button>
          
          <button 
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-left ${
              activeTab === "payments" ? "bg-primary/10 text-primary font-medium" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => handleNavigation("payments")}
          >
            <CreditCard className="h-5 w-5" />
            <span>Pending Payments</span>
          </button>
          
          <button 
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-left ${
              activeTab === "verification" ? "bg-primary/10 text-primary font-medium" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => handleNavigation("verification")}
          >
            <ShieldCheck className="h-5 w-5" />
            <span>Verification</span>
          </button>
          
          <button 
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-left ${
              activeTab === "profile" ? "bg-primary/10 text-primary font-medium" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => handleNavigation("profile")}
          >
            <Settings className="h-5 w-5" />
            <span>Profile Settings</span>
          </button>
        </nav>
      </div>
      
      <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
        <h3 className="font-semibold text-primary mb-2">Need Help?</h3>
        <p className="text-sm text-gray-700 mb-4">
          Our support team is always ready to assist you with any questions.
        </p>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/user-dashboard/support">
            Contact Support
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default UserDashboardSidebar;
