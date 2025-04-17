
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Building, Home, Plus, Settings, User, Bell, Pencil } from "lucide-react";
import { mockFlats, mockPGs, mockHostels } from "@/lib/mock-data";

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
            
            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Properties Tab */}
              {activeTab === "properties" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">My Properties</h2>
                    <Button asChild>
                      <Link to="/dashboard/add-property">
                        <Plus className="h-5 w-5 mr-2" />
                        Add New Property
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Property
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {properties.map((property) => (
                          <tr key={property.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                                  <img className="h-10 w-10 object-cover" src={property.images[0]?.url} alt="" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                  <div className="text-sm text-gray-500">{property.location.city}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                property.type === "FLAT" 
                                  ? "bg-blue-100 text-blue-800" 
                                  : property.type === "PG" 
                                  ? "bg-purple-100 text-purple-800" 
                                  : "bg-green-100 text-green-800"
                              }`}>
                                {property.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                property.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}>
                                {property.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ₹{property.price.toLocaleString("en-IN")}/mo
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-3">
                                <Link to={`/property/${property.id}`} className="text-indigo-600 hover:text-indigo-900">
                                  View
                                </Link>
                                <Link 
                                  to={`/dashboard/edit-property/${property.id}`} 
                                  className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                                >
                                  <Pencil className="h-4 w-4" />
                                  Edit
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Bookings Tab */}
              {activeTab === "bookings" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Booking Requests</h2>
                  
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Property
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tenant
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {bookingRequests.map((request) => (
                          <tr key={request.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{request.propertyName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{request.tenantName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(request.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                request.status === "PENDING" 
                                  ? "bg-yellow-100 text-yellow-800" 
                                  : request.status === "CONFIRMED" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">
                                  View
                                </button>
                                {request.status === "PENDING" && (
                                  <>
                                    <button className="text-green-600 hover:text-green-900">
                                      Accept
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                      Reject
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Messages Tab */}
              {activeTab === "messages" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Messages</h2>
                  
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                    <p className="text-gray-600">
                      The messaging feature will be available in the next update. Stay tuned!
                    </p>
                  </div>
                </div>
              )}
              
              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                  
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                    <p className="text-gray-600">
                      Account settings and preferences will be available in the next update.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
