
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Building, Home, User, Bell, Settings } from "lucide-react";

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadMessages: number;
}

const DashboardSidebar = ({ activeTab, setActiveTab, unreadMessages }: DashboardSidebarProps) => {
  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
        <div className="flex items-center gap-4 mb-4 pb-4 border-b">
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-sm text-gray-600">Property Owner</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          <button 
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-left ${
              activeTab === "properties" ? "bg-primary/10 text-primary font-medium" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("properties")}
          >
            <Building className="h-5 w-5" />
            <span>My Properties</span>
          </button>
          
          <button 
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-left ${
              activeTab === "bookings" ? "bg-primary/10 text-primary font-medium" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("bookings")}
          >
            <Home className="h-5 w-5" />
            <span>Booking Requests</span>
          </button>
          
          <button 
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-left ${
              activeTab === "messages" ? "bg-primary/10 text-primary font-medium" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("messages")}
          >
            <div className="relative">
              <Bell className="h-5 w-5" />
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
              activeTab === "settings" ? "bg-primary/10 text-primary font-medium" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </nav>
      </div>
      
      <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
        <h3 className="font-semibold text-primary mb-2">Need Help?</h3>
        <p className="text-sm text-gray-700 mb-4">
          Our support team is always ready to assist you with any questions.
        </p>
        <Button variant="outline" className="w-full">Contact Support</Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
