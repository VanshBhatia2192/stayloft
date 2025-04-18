
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { mockFlats, mockPGs, mockHostels } from "@/lib/mock-data";
import { toast } from "sonner";
import BasicPropertyDetails from "@/components/property/BasicPropertyDetails";
import PropertyLocation from "@/components/property/PropertyLocation";
import PropertyImageUpload from "@/components/property/PropertyImageUpload";
import PropertyAvailability from "@/components/property/PropertyAvailability";

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
    setImages(prev => {
      const newImages = prev.filter((_, i) => i !== index);
      if (prev[index].isThumbnail && newImages.length > 0) {
        newImages[0].isThumbnail = true;
      }
      return newImages;
    });
  };

  const setThumbnail = (index: number) => {
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
                <BasicPropertyDetails form={form} />
                <PropertyLocation form={form} />
                <PropertyImageUpload
                  images={images}
                  onImageUpload={handleImageUpload}
                  onRemoveImage={removeImage}
                  onSetThumbnail={setThumbnail}
                />
                <PropertyAvailability form={form} />
                
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
