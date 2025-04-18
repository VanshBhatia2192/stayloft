
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building, Home, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { UserMenu } from "@/components/user/UserMenu";

// Mock user state - in a real app, this would come from your auth context
const mockUser = {
  type: "TENANT" as const,
  name: "John Doe",
  image: "",
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Building className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">StayLoft</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/flats" className="text-foreground hover:text-primary font-medium">
            Flats
          </Link>
          <Link to="/pgs" className="text-foreground hover:text-primary font-medium">
            PGs
          </Link>
          <Link to="/hostels" className="text-foreground hover:text-primary font-medium">
            Hostels
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary font-medium">
            About
          </Link>
        </nav>

        {/* Auth Buttons or User Menu */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          {mockUser ? (
            <>
              <UserMenu 
                userType={mockUser.type}
                userName={mockUser.name}
                userImage={mockUser.image}
              />
              {mockUser.type === "OWNER" && (
                <Button className="flex items-center gap-2" asChild>
                  <Link to="/dashboard">
                    <Home className="h-5 w-5" />
                    List Property
                  </Link>
                </Button>
              )}
            </>
          ) : (
            <>
              <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link to="/login">
                  Sign in
                </Link>
              </Button>
              <Button className="flex items-center gap-2" asChild>
                <Link to="/signup">
                  Sign up
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background shadow-lg p-4 md:hidden flex flex-col gap-4">
            <Link 
              to="/flats" 
              className="text-foreground hover:text-primary font-medium p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Flats
            </Link>
            <Link 
              to="/pgs" 
              className="text-foreground hover:text-primary font-medium p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              PGs
            </Link>
            <Link 
              to="/hostels" 
              className="text-foreground hover:text-primary font-medium p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Hostels
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-primary font-medium p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <hr className="my-2" />
            {!mockUser ? (
              <>
                <Link 
                  to="/login" 
                  className="flex items-center gap-2 text-foreground hover:text-primary font-medium p-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link 
                  to="/signup" 
                  className="flex items-center gap-2 text-primary font-medium p-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            ) : (
              <div className="flex items-center justify-between p-2">
                <UserMenu 
                  userType={mockUser.type}
                  userName={mockUser.name}
                  userImage={mockUser.image}
                />
                <ThemeToggle />
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
