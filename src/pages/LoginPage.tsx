
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AtSign, KeyRound, Building, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import { UserRole } from "@/types";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("TENANT");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // In a real app, you would send these credentials to your backend for validation
    // For demo purposes, just simulate a successful login
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", selectedRole);
      
      // Use a default name if none is set
      if (!localStorage.getItem("userName")) {
        localStorage.setItem("userName", email.split("@")[0]);
      }
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back! You're logged in as a ${selectedRole === "OWNER" ? "Property Owner" : "Tenant"}.`,
      });
      
      setLoading(false);
      
      // Navigate to appropriate dashboard
      navigate(selectedRole === "OWNER" ? "/dashboard" : "/user-dashboard");
    }, 1000);
  };

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      const userRole = localStorage.getItem("userRole") as UserRole || "TENANT";
      navigate(userRole === "OWNER" ? "/dashboard" : "/user-dashboard");
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="container flex items-center justify-center py-16 min-h-[calc(100vh-4rem)]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Sign in to your StayLoft account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Button
                    type="button"
                    variant={selectedRole === "TENANT" ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => setSelectedRole("TENANT")}
                  >
                    <User className="h-4 w-4" />
                    <span>Tenant</span>
                  </Button>
                  
                  <Button
                    type="button"
                    variant={selectedRole === "OWNER" ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => setSelectedRole("OWNER")}
                  >
                    <Building className="h-4 w-4" />
                    <span>Property Owner</span>
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex">
                    <div className="bg-muted p-2 rounded-l-md flex items-center">
                      <AtSign className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="rounded-l-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="flex">
                    <div className="bg-muted p-2 rounded-l-md flex items-center">
                      <KeyRound className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="rounded-l-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
