
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building, Home, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { UserMenu } from "@/components/user/UserMenu";
import { UserRole } from "@/types";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<UserRole>("TENANT");
  const [userName, setUserName] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    // Get user type and name from localStorage
    if (loggedIn) {
      const storedUserType = localStorage.getItem("userRole") as UserRole;
      const storedUserName = localStorage.getItem("userName");
      
      if (storedUserType) {
        setUserType(storedUserType);
      }
      
      if (storedUserName) {
        setUserName(storedUserName);
      }
    }
    
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

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

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
          {isLoggedIn ? (
            <>
              <UserMenu 
                userType={userType}
                userName={userName}
              />
              {userType === "OWNER" && (
                <Button className="flex items-center gap-2" asChild>
                  <Link to="/dashboard/add-property">
                    <Home className="h-5 w-5" />
                    List Property
                  </Link>
                </Button>
              )}
            </>
          ) : (
            <>
              <Button variant="ghost" className="flex items-center gap-2" onClick={handleLogin}>
                Sign in
              </Button>
              <Button className="flex items-center gap-2" onClick={handleSignup}>
                Sign up
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
            {!isLoggedIn ? (
              <>
                <Button 
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogin();
                  }}
                >
                  Sign in
                </Button>
                <Button 
                  variant="default"
                  className="justify-start"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSignup();
                  }}
                >
                  Sign up
                </Button>
              </>
            ) : (
              <div className="flex items-center justify-between p-2">
                <UserMenu 
                  userType={userType}
                  userName={userName}
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
