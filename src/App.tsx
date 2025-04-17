
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FlatsPage from "./pages/FlatsPage";
import PGsPage from "./pages/PGsPage";
import HostelsPage from "./pages/HostelsPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import DashboardPage from "./pages/DashboardPage";
import AddEditPropertyPage from "./pages/AddEditPropertyPage";
import ContactSupportPage from "./pages/ContactSupportPage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import ChatPage from "./pages/ChatPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/add-property" element={<AddEditPropertyPage />} />
          <Route path="/dashboard/edit-property/:id" element={<AddEditPropertyPage />} />
          <Route path="/dashboard/support" element={<ContactSupportPage />} />
          <Route path="/chat/:userId" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
