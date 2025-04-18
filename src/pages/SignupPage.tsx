
import { useState } from "react";
import { Link } from "react-router-dom";
import { Building, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";

const SignupPage = () => {
  const [selectedRole, setSelectedRole] = useState<"TENANT" | "OWNER" | null>(null);

  return (
    <Layout>
      <div className="container max-w-lg py-16 min-h-[calc(100vh-4rem)] flex items-center">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle>Sign up for StayLoft</CardTitle>
            <CardDescription>Choose how you want to use StayLoft</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant={selectedRole === "TENANT" ? "default" : "outline"}
                className="h-32 flex flex-col items-center justify-center gap-2"
                onClick={() => setSelectedRole("TENANT")}
              >
                <User className="h-8 w-8" />
                <span>I'm a Tenant</span>
              </Button>
              
              <Button
                variant={selectedRole === "OWNER" ? "default" : "outline"}
                className="h-32 flex flex-col items-center justify-center gap-2"
                onClick={() => setSelectedRole("OWNER")}
              >
                <Building className="h-8 w-8" />
                <span>I'm a Property Owner</span>
              </Button>
            </div>
            
            <div className="mt-6 space-y-4">
              {selectedRole && (
                <Button className="w-full" asChild>
                  <Link to={selectedRole === "OWNER" ? "/dashboard" : "/user-dashboard"}>
                    Continue as {selectedRole === "OWNER" ? "Property Owner" : "Tenant"}
                  </Link>
                </Button>
              )}
              
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SignupPage;
