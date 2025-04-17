
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Bell, Settings } from "lucide-react";
import { mockFlats, mockPGs, mockHostels } from "@/lib/mock-data";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import PropertiesTab from "@/components/dashboard/PropertiesTab";
import BookingsTab from "@/components/dashboard/BookingsTab";
import ComingSoonTab from "@/components/dashboard/ComingSoonTab";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("properties");

  // Mock data - in a real app, this would come from API calls
  const properties = [...mockFlats, ...mockPGs, ...mockHostels].slice(0, 5);
  const bookingRequests = [
    { 
      id: "req1", 
      propertyName: "3BHK Premium Apartment", 
      tenantName: "Rahul Sharma", 
      date: "2023-05-15", 
      status: "PENDING" 
    },
    { 
      id: "req2", 
      propertyName: "Female PG in Koramangala", 
      tenantName: "Priya Patel", 
      date: "2023-05-12", 
      status: "CONFIRMED" 
    },
    { 
      id: "req3", 
      propertyName: "Deluxe Hostel Room", 
      tenantName: "Aditya Verma", 
      date: "2023-05-10", 
      status: "CANCELLED" 
    },
  ];

  const unreadMessages = 3;

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <DashboardSidebar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              unreadMessages={unreadMessages} 
            />
            
            {/* Main Content */}
            <div className="lg:w-3/4">
              {activeTab === "properties" && <PropertiesTab properties={properties} />}
              {activeTab === "bookings" && <BookingsTab bookingRequests={bookingRequests} />}
              {activeTab === "messages" && <ComingSoonTab title="Messages" Icon={Bell} />}
              {activeTab === "settings" && <ComingSoonTab title="Account Settings" Icon={Settings} />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
