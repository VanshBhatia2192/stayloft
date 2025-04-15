
import { useState } from "react";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PropertyType, Amenity } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface PropertySearchFiltersProps {
  propertyType: PropertyType;
  onSearch: (filters: any) => void;
}

const PropertySearchFilters = ({ propertyType, onSearch }: PropertySearchFiltersProps) => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([]);
  const [bedrooms, setBedrooms] = useState<string>("");
  const [bathrooms, setBathrooms] = useState<string>("");
  const [furnished, setFurnished] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const amenities: { id: Amenity; label: string }[] = [
    { id: "WIFI", label: "WiFi" },
    { id: "AC", label: "Air Conditioning" },
    { id: "FURNISHED", label: "Furnished" },
    { id: "TV", label: "TV" },
    { id: "FRIDGE", label: "Refrigerator" },
    { id: "WASHING_MACHINE", label: "Washing Machine" },
    { id: "POWER_BACKUP", label: "Power Backup" },
    { id: "PARKING", label: "Parking" },
    { id: "SECURITY", label: "Security" },
    { id: "FOOD", label: "Food Included" },
    { id: "CLEANING", label: "Cleaning Service" },
    { id: "GYM", label: "Gym" },
  ];

  const handleAmenityChange = (amenity: Amenity, isChecked: boolean) => {
    if (isChecked) {
      setSelectedAmenities([...selectedAmenities, amenity]);
    } else {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    }
  };

  const handleSearch = () => {
    const filters = {
      location,
      priceRange,
      amenities: selectedAmenities,
      ...(propertyType === "FLAT" && {
        bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
        bathrooms: bathrooms ? parseInt(bathrooms) : undefined,
        furnished,
      }),
      ...(propertyType !== "FLAT" && {
        gender,
      }),
    };
    
    onSearch(filters);
  };

  const handleClearAll = () => {
    setLocation("");
    setPriceRange([0, 50000]);
    setSelectedAmenities([]);
    setBedrooms("");
    setBathrooms("");
    setFurnished("");
    setGender("");
  };

  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search by city, locality or landmark"
              className="pl-10"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="md:w-auto">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  More Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Search Filters</SheetTitle>
                  <SheetDescription>
                    Refine your search with these filters
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Price Range (₹)</h3>
                    <Slider
                      value={[priceRange[0], priceRange[1]]}
                      min={0}
                      max={50000}
                      step={1000}
                      onValueChange={(value) => setPriceRange([value[0], value[1]])}
                      className="mb-2"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {propertyType === "FLAT" && (
                    <>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Bedrooms</h3>
                        <Select value={bedrooms} onValueChange={setBedrooms}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Bathrooms</h3>
                        <Select value={bathrooms} onValueChange={setBathrooms}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Furnishing</h3>
                        <Select value={furnished} onValueChange={setFurnished}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any</SelectItem>
                            <SelectItem value="FULLY_FURNISHED">Fully Furnished</SelectItem>
                            <SelectItem value="SEMI_FURNISHED">Semi Furnished</SelectItem>
                            <SelectItem value="UNFURNISHED">Unfurnished</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                  
                  {propertyType !== "FLAT" && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Gender</h3>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any</SelectItem>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
                          <SelectItem value="UNISEX">Unisex</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="amenities">
                      <AccordionTrigger className="text-sm font-medium">
                        Amenities
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 gap-2 mt-2">
                          {amenities.map((amenity) => (
                            <div key={amenity.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`amenity-${amenity.id}`}
                                checked={selectedAmenities.includes(amenity.id)}
                                onCheckedChange={(checked) =>
                                  handleAmenityChange(amenity.id, checked as boolean)
                                }
                              />
                              <Label
                                htmlFor={`amenity-${amenity.id}`}
                                className="text-sm cursor-pointer"
                              >
                                {amenity.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={handleClearAll} className="flex-1">
                      Clear All
                    </Button>
                    <Button onClick={handleSearch} className="flex-1">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <Button onClick={handleSearch} className="md:w-auto">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        
        {/* Selected filters display */}
        {(location || selectedAmenities.length > 0 || bedrooms || bathrooms || furnished || gender) && (
          <div className="flex flex-wrap gap-2 items-center mt-4">
            <span className="text-sm text-gray-600">Active Filters:</span>
            
            {location && (
              <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center">
                <span>Location: {location}</span>
              </div>
            )}
            
            {priceRange[0] > 0 || priceRange[1] < 50000 ? (
              <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center">
                <span>Price: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}</span>
              </div>
            ) : null}
            
            {bedrooms && (
              <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center">
                <span>Bedrooms: {bedrooms}</span>
              </div>
            )}
            
            {bathrooms && (
              <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center">
                <span>Bathrooms: {bathrooms}</span>
              </div>
            )}
            
            {furnished && (
              <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center">
                <span>Furnishing: {furnished.replace("_", " ")}</span>
              </div>
            )}
            
            {gender && (
              <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center">
                <span>Gender: {gender}</span>
              </div>
            )}
            
            {selectedAmenities.map((amenity) => (
              <div
                key={amenity}
                className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center"
              >
                <span>
                  {amenities.find((a) => a.id === amenity)?.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertySearchFilters;
