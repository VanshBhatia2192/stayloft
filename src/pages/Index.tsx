
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import PopularCities from "@/components/home/PopularCities";
import HowItWorks from "@/components/home/HowItWorks";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building, Users, Home, MessageSquare, Star } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Properties */}
      <FeaturedProperties />
      
      {/* Popular Cities */}
      <PopularCities />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose StayLoft</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a complete accommodation solution designed with your comfort in mind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Properties</h3>
              <p className="text-gray-600">
                All our listings are thoroughly verified to ensure quality and accuracy of information.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Community</h3>
              <p className="text-gray-600">
                Join our community of verified owners and tenants for a safe and reliable experience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Diverse Options</h3>
              <p className="text-gray-600">
                From luxury apartments to affordable hostels, find accommodations to match every budget.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
              <p className="text-gray-600">
                Connect directly with property owners without intermediaries for better negotiations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Honest Reviews</h3>
              <p className="text-gray-600">
                Read authentic reviews from previous tenants to make informed decisions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-primary">
              <div className="text-center p-4">
                <h3 className="text-xl font-semibold mb-4">Are you a property owner?</h3>
                <p className="text-gray-600 mb-6">
                  List your property on StayLoft and connect with thousands of potential tenants.
                </p>
                <Button asChild>
                  <Link to="/dashboard">List Your Property</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Stay?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join thousands of satisfied users who found their ideal accommodation with StayLoft
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/flats">Browse Flats</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-primary/90" asChild>
              <Link to="/pgs">Explore PGs</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
