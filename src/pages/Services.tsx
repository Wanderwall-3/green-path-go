import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MapPin, Clock, Phone, ExternalLink, Recycle, Truck, Leaf } from 'lucide-react';

export default function Services() {
  const navigate = useNavigate();

  const recyclingCenters = [
    {
      name: "GreenCycle Recycling Center",
      address: "123 Eco Street, Downtown",
      distance: "2.3 miles",
      hours: "Mon-Sat: 8AM-6PM, Sun: 10AM-4PM",
      phone: "(555) 123-4567",
      services: ["Plastic", "Paper", "Glass", "Metal", "Electronics"],
      rating: 4.8
    },
    {
      name: "City Waste Recovery Facility",
      address: "456 Green Avenue, Midtown", 
      distance: "3.7 miles",
      hours: "Mon-Fri: 7AM-7PM, Sat: 9AM-5PM",
      phone: "(555) 234-5678",
      services: ["Plastic", "Paper", "Cardboard", "Batteries"],
      rating: 4.5
    },
    {
      name: "EcoPoint Drop-off Center",
      address: "789 Sustainable Blvd, Uptown",
      distance: "5.1 miles", 
      hours: "Daily: 6AM-8PM",
      phone: "(555) 345-6789",
      services: ["Glass", "Metal", "Textiles", "Hazardous Waste"],
      rating: 4.6
    }
  ];

  const compostSites = [
    {
      name: "Community Garden Compost Hub",
      address: "321 Garden Lane, Eastside",
      distance: "1.8 miles",
      hours: "Daily: 7AM-7PM",
      phone: "(555) 456-7890",
      accepts: ["Food Scraps", "Yard Waste", "Paper"],
      cost: "Free for residents"
    },
    {
      name: "Municipal Composting Facility", 
      address: "654 Organic Way, Westside",
      distance: "4.2 miles",
      hours: "Mon-Sat: 8AM-5PM",
      phone: "(555) 567-8901",
      accepts: ["All Organics", "Yard Waste", "Wood Chips"],
      cost: "$5 per bag"
    },
    {
      name: "Farm Fresh Compost Co-op",
      address: "987 Rural Route 12, Countryside",
      distance: "8.9 miles",
      hours: "Tue, Thu, Sat: 9AM-3PM", 
      phone: "(555) 678-9012",
      accepts: ["Food Scraps", "Manure", "Leaves"],
      cost: "Membership required"
    }
  ];

  const pickupSchedules = [
    {
      area: "Downtown District",
      recycling: "Every Tuesday",
      compost: "Every Friday", 
      trash: "Monday & Thursday",
      nextPickup: "Tomorrow",
      status: "On Schedule"
    },
    {
      area: "Residential North", 
      recycling: "Every Wednesday",
      compost: "Every Monday",
      trash: "Tuesday & Friday", 
      nextPickup: "2 days",
      status: "On Schedule"
    },
    {
      area: "Suburban South",
      recycling: "Every Thursday", 
      compost: "Every Saturday",
      trash: "Monday & Thursday",
      nextPickup: "4 days", 
      status: "Delayed"
    },
    {
      area: "Industrial Zone",
      recycling: "Every Friday",
      compost: "Not Available", 
      trash: "Daily",
      nextPickup: "Tomorrow",
      status: "On Schedule"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate('/home')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Local Services</h1>
            <p className="text-muted-foreground">Find recycling centers, composting sites, and pickup schedules</p>
          </div>
        </div>

        <Tabs defaultValue="recycling" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recycling" className="flex items-center gap-2">
              <Recycle className="h-4 w-4" />
              Recycling Centers
            </TabsTrigger>
            <TabsTrigger value="composting" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              Composting Sites
            </TabsTrigger>
            <TabsTrigger value="pickup" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Pickup Schedules
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recycling" className="space-y-4">
            <div className="grid gap-4">
              {recyclingCenters.map((center, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{center.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <MapPin className="h-4 w-4" />
                          {center.address} • {center.distance}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">★ {center.rating}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{center.hours}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{center.phone}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Accepted Materials:</p>
                      <div className="flex flex-wrap gap-2">
                        {center.services.map((service, idx) => (
                          <Badge key={idx} variant="outline">{service}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="composting" className="space-y-4">
            <div className="grid gap-4">
              {compostSites.map((site, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">{site.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {site.address} • {site.distance}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{site.hours}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{site.phone}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Accepts:</p>
                      <div className="flex flex-wrap gap-2">
                        {site.accepts.map((item, idx) => (
                          <Badge key={idx} variant="outline" className="text-green-700 border-green-200">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-medium">Cost: </span>
                        <span className="text-muted-foreground">{site.cost}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pickup" className="space-y-4">
            <div className="grid gap-4">
              {pickupSchedules.map((schedule, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{schedule.area}</CardTitle>
                      <Badge 
                        variant={schedule.status === "On Schedule" ? "default" : "destructive"}
                      >
                        {schedule.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Recycle className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Recycling</span>
                        </div>
                        <span className="text-sm">{schedule.recycling}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Compost</span>
                        </div>
                        <span className="text-sm">{schedule.compost}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-gray-600" />
                          <span className="font-medium">Trash</span>
                        </div>
                        <span className="text-sm">{schedule.trash}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Next Pickup:</span>
                        <span className="text-sm text-primary font-medium">{schedule.nextPickup}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Need More Information?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? Contact your local waste management authority 
              or visit your city's website for the most up-to-date information.
            </p>
            <div className="flex gap-2">
              <Button variant="outline">
                Contact City Services
              </Button>
              <Button variant="outline">
                Report an Issue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}