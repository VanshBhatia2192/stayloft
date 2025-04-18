import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Index from "./pages/Index";
import FlatsPage from "./pages/FlatsPage";
import PGsPage from "./pages/PGsPage";
import HostelsPage from "./pages/HostelsPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import DashboardPage from "./pages/DashboardPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import AddEditPropertyPage from "./pages/AddEditPropertyPage";
import ContactSupportPage from "./pages/ContactSupportPage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import ChatPage from "./pages/ChatPage";
import NotFound from "./pages/NotFound";
import SignupPage from "./pages/SignupPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/flats" element={<FlatsPage />} />
            <Route path="/pgs" element={<PGsPage />} />
            <Route path="/hostels" element={<HostelsPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            
            {/* Property Owner Dashboard */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/add-property" element={<AddEditPropertyPage />} />
            <Route path="/dashboard/edit-property/:id" element={<AddEditPropertyPage />} />
            <Route path="/dashboard/support" element={<ContactSupportPage />} />
            
            {/* Tenant Dashboard */}
            <Route path="/user-dashboard" element={<UserDashboardPage />}>
              <Route index element={<SavedPropertiesTab />} />
              <Route path="saved-properties" element={<SavedPropertiesTab />} />
              <Route path="recent-searches" element={<RecentSearchesTab />} />
              <Route path="bookings" element={<BookingsTab />} />
              <Route path="payments" element={<PaymentsTab />} />
              <Route path="verification" element={<VerificationTab />} />
              <Route path="profile" element={<ProfileTab />} />
              <Route path="support" element={<ContactSupportPage />} />
            </Route>
            
            <Route path="/chat/:userId" element={<ChatPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
