
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building, User, Mail, Phone, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import { UserRole } from "@/types";
import { Progress } from "@/components/ui/progress";

const SignupPage = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!selectedRole) {
      toast({
        title: "Role selection required",
        description: "Please select whether you're a tenant or property owner",
        variant: "destructive"
      });
      return false;
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    
    if (!formData.address) {
      newErrors.address = "Address is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleContinue = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      // In a real app, you would submit the form data to your backend
      // Mock implementation for demo purposes
      localStorage.setItem("userRole", selectedRole as string);
      localStorage.setItem("userName", formData.name);
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("isLoggedIn", "true");
      
      toast({
        title: "Account created successfully!",
        description: "Welcome to StayLoft",
      });
      
      // Redirect based on role
      navigate(selectedRole === "OWNER" ? "/dashboard" : "/user-dashboard");
    }
  };
  
  const getCompletionPercentage = () => {
    let percentage = 0;
    if (selectedRole) percentage += 20;
    if (formData.email) percentage += 20;
    if (formData.password && formData.confirmPassword && formData.password === formData.confirmPassword) percentage += 20;
    if (formData.name) percentage += 10;
    if (formData.phone) percentage += 15;
    if (formData.address) percentage += 15;
    return percentage;
  };

  return (
    <Layout>
      <div className="container max-w-lg py-16 min-h-[calc(100vh-4rem)] flex items-center">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle>Sign up for StayLoft</CardTitle>
            <CardDescription>
              {step === 1 
                ? "Create your account" 
                : "Complete your profile"}
            </CardDescription>
            <Progress 
              value={getCompletionPercentage()} 
              className="h-2 mt-4" 
              color="primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Step {step} of 2</span>
              <span>{getCompletionPercentage()}% complete</span>
            </div>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      name="password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={formData.password}
                      onChange={handleInputChange}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      type="password" 
                      placeholder="••••••••" 
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="flex">
                    <div className="bg-muted p-2 rounded-l-md flex items-center">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`rounded-l-none ${errors.name ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex">
                    <div className="bg-muted p-2 rounded-l-md flex items-center">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Input 
                      id="phone" 
                      name="phone" 
                      placeholder="9876543210" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`rounded-l-none ${errors.phone ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="flex">
                    <div className="bg-muted p-2 rounded-l-md flex items-center">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Input 
                      id="address" 
                      name="address" 
                      placeholder="123 Main St, City" 
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`rounded-l-none ${errors.address ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>
              </div>
            )}
            
            <div className="mt-6 space-y-4">
              <Button className="w-full" onClick={handleContinue}>
                {step === 1 ? (
                  <>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Complete Registration <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SignupPage;
