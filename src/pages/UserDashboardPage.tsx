
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import UserDashboardSidebar from "@/components/user-dashboard/UserDashboardSidebar";

const UserDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("saved-properties");
  
  // Mock data - in a real app, this would come from API calls
  const unreadMessages = 3;

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <UserDashboardSidebar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              unreadMessages={unreadMessages} 
            />
            
            {/* Main Content */}
            <div className="lg:w-3/4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboardPage;
