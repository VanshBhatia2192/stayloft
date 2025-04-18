
import { useState } from "react";
import { User, Bell, Moon, Sun, Monitor, Check } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeType, NotificationPreference } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

const ProfileTab = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState<ThemeType>("system");
  const [uploading, setUploading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationPreference>({
    email: true,
    push: true,
    sms: false,
    newMessages: true,
    bookingUpdates: true,
    paymentReminders: true,
    promotions: false,
  });
  
  // Initialize form with mock user data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Alex Johnson",
      email: "alex@example.com",
      phone: "+1 123-456-7890",
      bio: "I'm a software engineer looking for a nice place to stay."
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, you would update the user's profile
    console.log(values);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };
  
  const updateTheme = (newTheme: ThemeType) => {
    // In a real app, you would update the user's theme preference and apply it
    setTheme(newTheme);
    toast({
      title: "Theme Updated",
      description: `Theme has been set to ${newTheme}.`,
    });
  };
  
  const toggleNotification = (key: keyof NotificationPreference) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const uploadAvatar = () => {
    setUploading(true);
    // In a real app, you would handle the file upload
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated.",
      });
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
      
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="profile" className="text-sm">Personal Info</TabsTrigger>
          <TabsTrigger value="appearance" className="text-sm">Appearance</TabsTrigger>
          <TabsTrigger value="notifications" className="text-sm">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>How others will see you across the platform.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="https://i.pravatar.cc/150?img=68" alt="Avatar" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" onClick={uploadAvatar} disabled={uploading}>
                    {uploading ? "Uploading..." : "Change Picture"}
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="w-full md:w-2/3">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (123) 456-7890" {...field} />
                            </FormControl>
                            <FormDescription>
                              This will be used for booking confirmations and important notifications.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell property owners a bit about yourself" 
                                className="resize-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              This will be visible to property owners when you make a booking request.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit">Save Changes</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of the application.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
                    theme === "light" ? "border-primary bg-primary/5" : "hover:border-gray-400"
                  }`}
                  onClick={() => updateTheme("light")}
                >
                  <div className="h-24 w-full bg-white border rounded-md mb-4 relative">
                    <div className="absolute top-2 left-2 right-2 h-3 bg-gray-100 rounded" />
                    <div className="absolute top-8 left-2 w-8 h-8 bg-primary/20 rounded-full" />
                    <div className="absolute top-8 left-12 right-2 h-3 bg-gray-100 rounded" />
                    <div className="absolute top-14 left-2 right-2 h-3 bg-gray-100 rounded" />
                    <div className="absolute top-20 left-2 right-10 h-3 bg-gray-100 rounded" />
                    {theme === "light" && (
                      <div className="absolute -top-2 -right-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Sun className="h-4 w-4 mr-2" />
                    <span className="font-medium">Light Mode</span>
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
                    theme === "dark" ? "border-primary bg-primary/5" : "hover:border-gray-400"
                  }`}
                  onClick={() => updateTheme("dark")}
                >
                  <div className="h-24 w-full bg-gray-900 border border-gray-700 rounded-md mb-4 relative">
                    <div className="absolute top-2 left-2 right-2 h-3 bg-gray-800 rounded" />
                    <div className="absolute top-8 left-2 w-8 h-8 bg-primary/40 rounded-full" />
                    <div className="absolute top-8 left-12 right-2 h-3 bg-gray-800 rounded" />
                    <div className="absolute top-14 left-2 right-2 h-3 bg-gray-800 rounded" />
                    <div className="absolute top-20 left-2 right-10 h-3 bg-gray-800 rounded" />
                    {theme === "dark" && (
                      <div className="absolute -top-2 -right-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Moon className="h-4 w-4 mr-2" />
                    <span className="font-medium">Dark Mode</span>
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
                    theme === "system" ? "border-primary bg-primary/5" : "hover:border-gray-400"
                  }`}
                  onClick={() => updateTheme("system")}
                >
                  <div className="h-24 w-full bg-gradient-to-b from-white to-gray-900 border rounded-md mb-4 relative">
                    <div className="absolute top-2 left-2 right-2 h-3 bg-gray-200 rounded" />
                    <div className="absolute top-8 left-2 w-8 h-8 bg-primary/30 rounded-full" />
                    <div className="absolute top-8 left-12 right-2 h-3 bg-gray-300 rounded" />
                    <div className="absolute top-14 left-2 right-2 h-3 bg-gray-400 rounded" />
                    <div className="absolute top-20 left-2 right-10 h-3 bg-gray-500 rounded" />
                    {theme === "system" && (
                      <div className="absolute -top-2 -right-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Monitor className="h-4 w-4 mr-2" />
                    <span className="font-medium">System</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-start">
              <p className="text-sm text-gray-500">
                System mode will automatically match your device's theme settings.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Notification Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-9 w-9 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates via email</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.email} 
                      onCheckedChange={() => toggleNotification("email")} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-9 w-9 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <Bell className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates on your device</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.push} 
                      onCheckedChange={() => toggleNotification("push")} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-9 w-9 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates via text message</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.sms} 
                      onCheckedChange={() => toggleNotification("sms")} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium">Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">New Messages</p>
                    <Switch 
                      checked={notifications.newMessages} 
                      onCheckedChange={() => toggleNotification("newMessages")} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Booking Updates</p>
                    <Switch 
                      checked={notifications.bookingUpdates} 
                      onCheckedChange={() => toggleNotification("bookingUpdates")} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Payment Reminders</p>
                    <Switch 
                      checked={notifications.paymentReminders} 
                      onCheckedChange={() => toggleNotification("paymentReminders")} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Promotional Offers</p>
                    <Switch 
                      checked={notifications.promotions} 
                      onCheckedChange={() => toggleNotification("promotions")} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => {
                toast({
                  title: "Notification Preferences Saved",
                  description: "Your notification settings have been updated.",
                });
              }}>
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTab;
