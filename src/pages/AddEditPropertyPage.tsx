import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { mockFlats, mockPGs, mockHostels } from "@/lib/mock-data";
import { toast } from "sonner";
import { Image as ImageIcon, Trash2, Star } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  type: z.enum(["FLAT", "PG", "HOSTEL"]),
  price: z.coerce.number().min(1000, { message: "Price must be at least ₹1000" }),
  location: z.object({
    city: z.string().min(2, { message: "City is required" }),
    area: z.string().min(2, { message: "Area is required" }),
  }),
  isActive: z.boolean().default(true),
  images: z.array(z.object({
    url: z.string(),
    isThumbnail: z.boolean().default(false)
  })).default([]),
});

const AddEditPropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<{ url: string; isThumbnail: boolean }[]>([]);
  const [thumbnailIndex, setThumbnailIndex] = useState<number>(0);
  
  const allProperties = [...mockFlats, ...mockPGs, ...mockHostels];
  const property = id ? allProperties.find(prop => prop.id === id) : null;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: property?.title || "",
      description: property?.description || "",
      type: property?.type || "FLAT",
      price: property?.price || 0,
      location: {
        city: property?.location.city || "",
        area: property?.location.area || "",
      },
      isActive: property?.isActive ?? true,
      images: property?.images || [],
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 10) {
      toast.error("Maximum 10 images allowed");
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setImages(prev => [...prev, { url, isThumbnail: prev.length === 0 }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    if (thumbnailIndex === index) {
      setThumbnailIndex(0);
      setImages(prev => prev.map((img, i) => ({
        ...img,
        isThumbnail: i === 0
      })));
    }
  };

  const setThumbnail = (index: number) => {
    setThumbnailIndex(index);
    setImages(prev => prev.map((img, i) => ({
      ...img,
      isThumbnail: i === index
    })));
  };
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const formData = {
      ...values,
      images
    };
    
    setTimeout(() => {
      setLoading(false);
      toast.success(isEditing ? "Property updated successfully!" : "Property added successfully!");
      navigate("/dashboard");
    }, 1000);
  };
  
  if (isEditing && !property) {
    return (
      <Layout>
        <div className="container py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Property Not Found</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>Sorry, we couldn't find the property you're looking for.</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => navigate("/dashboard")}>Return to Dashboard</Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {isEditing ? "Edit Property" : "Add New Property"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 3BHK Premium Apartment" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your property" 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="FLAT">Flat</SelectItem>
                            <SelectItem value="PG">PG</SelectItem>
                            <SelectItem value="HOSTEL">Hostel</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Rent (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="location.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Bangalore" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location.area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area/Locality</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Koramangala" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <Label>Property Images (Max 10)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.url}
                          alt={`Property ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          <Button
                            variant="destructive"
                            size="icon"
                            type="button"
                            onClick={() => removeImage(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={image.isThumbnail ? "default" : "secondary"}
                            size="icon"
                            type="button"
                            onClick={() => setThumbnail(index)}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                        </div>
                        {image.isThumbnail && (
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                            Thumbnail
                          </div>
                        )}
                      </div>
                    ))}
                    {images.length < 10 && (
                      <div className="border-2 border-dashed rounded-lg flex items-center justify-center p-4 h-32">
                        <label className="cursor-pointer text-center">
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                          />
                          <ImageIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <span className="text-sm text-gray-500">Add Images</span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Active Listing</FormLabel>
                        <FormDescription>
                          Set whether this property is available for booking
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <span>Saving...</span>
                    ) : (
                      <span>{isEditing ? "Update Property" : "Add Property"}</span>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddEditPropertyPage;
