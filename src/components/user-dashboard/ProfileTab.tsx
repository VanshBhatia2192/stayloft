
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Camera, AtSign, Phone, MapPin, Shield } from "lucide-react";
import { ThemeToggle } from "../theme/ThemeToggle";
import { Switch } from "@/components/ui/switch";

const ProfileTab = () => {
  const [activeTab, setActiveTab] = useState("personal");
  
  // Mock user data - in a real app, this would come from API calls
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+91 9876543210",
    address: "123 Main St, Bangalore",
    bio: "Looking for a comfortable place to stay near my workplace.",
    avatar: "",
    notificationPreferences: {
      email: true,
      push: true,
      sms: false,
      newMessages: true,
      bookingUpdates: true,
      paymentReminders: true,
      promotions: false
    }
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the profile data
    console.log("Saving profile data");
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="pt-6">
              <form onSubmit={handleSaveProfile}>
                <div className="flex flex-col md:flex-row gap-8 mb-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-2xl">
                        {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="flex">
                          <div className="bg-muted p-2 rounded-l-md flex items-center">
                            <User className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <Input 
                            id="name" 
                            defaultValue={user.name} 
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="flex">
                          <div className="bg-muted p-2 rounded-l-md flex items-center">
                            <AtSign className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <Input 
                            id="email" 
                            type="email" 
                            defaultValue={user.email}
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex">
                          <div className="bg-muted p-2 rounded-l-md flex items-center">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <Input 
                            id="phone" 
                            defaultValue={user.phone} 
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <div className="flex">
                          <div className="bg-muted p-2 rounded-l-md flex items-center">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <Input 
                            id="address" 
                            defaultValue={user.address} 
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio" 
                          defaultValue={user.bio} 
                          rows={3}
                          placeholder="Tell us a little about yourself"
                        />
                      </div>
                    </div>
                    
                    <Button type="submit">Save Changes</Button>
                  </div>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="preferences" className="pt-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Theme</h3>
                  <p className="text-muted-foreground text-sm mb-4">Choose your preferred theme</p>
                  <div className="flex items-center space-x-2">
                    <ThemeToggle />
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-2">Language</h3>
                  <p className="text-muted-foreground text-sm mb-4">Select your preferred language</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start">English</Button>
                    <Button variant="outline" className="justify-start">Hindi</Button>
                    <Button variant="outline" className="justify-start">Tamil</Button>
                    <Button variant="outline" className="justify-start">Telugu</Button>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-2">Security</h3>
                  <p className="text-muted-foreground text-sm mb-4">Manage your account security</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                          <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="pt-6 space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-muted-foreground text-sm">Receive updates via email</p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      defaultChecked={user.notificationPreferences.email} 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-muted-foreground text-sm">Receive updates via browser notifications</p>
                    </div>
                    <Switch 
                      id="push-notifications" 
                      defaultChecked={user.notificationPreferences.push} 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-muted-foreground text-sm">Receive updates via SMS</p>
                    </div>
                    <Switch 
                      id="sms-notifications" 
                      defaultChecked={user.notificationPreferences.sms} 
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-3">Notification Types</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <Label htmlFor="new-messages">New Messages</Label>
                        <p className="text-muted-foreground text-sm">Get notified when you receive new messages</p>
                      </div>
                      <Switch 
                        id="new-messages" 
                        defaultChecked={user.notificationPreferences.newMessages} 
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <Label htmlFor="booking-updates">Booking Updates</Label>
                        <p className="text-muted-foreground text-sm">Get notified about your booking status changes</p>
                      </div>
                      <Switch 
                        id="booking-updates" 
                        defaultChecked={user.notificationPreferences.bookingUpdates} 
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <Label htmlFor="payment-reminders">Payment Reminders</Label>
                        <p className="text-muted-foreground text-sm">Get reminded about upcoming payment dues</p>
                      </div>
                      <Switch 
                        id="payment-reminders" 
                        defaultChecked={user.notificationPreferences.paymentReminders} 
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <Label htmlFor="promotions">Promotions & Offers</Label>
                        <p className="text-muted-foreground text-sm">Receive updates about discounts and special offers</p>
                      </div>
                      <Switch 
                        id="promotions" 
                        defaultChecked={user.notificationPreferences.promotions} 
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button>Save Preferences</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
