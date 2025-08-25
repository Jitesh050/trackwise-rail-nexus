
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  AlertTriangle, 
  Train, 
  Users, 
  BarChart3, 
  Lightbulb, 
  Zap,
  CheckCircle,
  Clock,
  TrendingUp,
  Power
} from "lucide-react";

const AdminHomePage = () => {
  const [lightControls, setLightControls] = useState({
    platform1: true,
    platform2: false,
    platform3: true,
    waitingArea: true,
    entrance: false
  });

  // Mock data for analytics
  const analytics = {
    ticketsBooked: 1247,
    trainsPassed: 23,
    trainsUpcoming: 8,
    onTimeTrains: 18,
    delayedTrains: 5
  };

  // Mock collision detection data
  const collisionWarnings = [
    {
      id: 1,
      trains: ["Express 101", "Local 245"],
      distance: "2.5 km",
      estimatedCollision: "45 seconds",
      severity: "HIGH"
    },
    {
      id: 2,
      trains: ["Bullet 330", "Metro 67"],
      distance: "5.8 km",
      estimatedCollision: "2 minutes",
      severity: "MEDIUM"
    }
  ];

  const toggleLight = (zone: string) => {
    setLightControls(prev => ({
      ...prev,
      [zone]: !prev[zone]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto space-y-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Control Center</h1>
          <p className="text-gray-600 text-lg">Comprehensive railway management and monitoring system</p>
        </header>

        {/* Collision Detection Section */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              Collision Detection System
            </CardTitle>
            <CardDescription className="text-gray-600">
              Live train tracking and collision prevention monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Live Map Area */}
              <div className="bg-gray-100 rounded-lg h-80 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                  {/* Simulated Railway Lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    <line x1="10%" y1="50%" x2="90%" y2="20%" stroke="#4B5563" strokeWidth="3" strokeDasharray="5,5" />
                    <line x1="20%" y1="80%" x2="80%" y2="30%" stroke="#4B5563" strokeWidth="3" strokeDasharray="5,5" />
                    <line x1="30%" y1="10%" x2="70%" y2="90%" stroke="#4B5563" strokeWidth="3" strokeDasharray="5,5" />
                  </svg>
                  
                  {/* Train Positions */}
                  <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <Train className="h-2 w-2 text-white" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <Train className="h-2 w-2 text-white" />
                  </div>
                  <div className="absolute top-2/3 left-3/4 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <Train className="h-2 w-2 text-white" />
                  </div>
                </div>
              </div>

              {/* Collision Warnings */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Active Warnings</h3>
                {collisionWarnings.map((warning) => (
                  <div key={warning.id} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-red-800">Collision Risk</span>
                      <Badge className={`${
                        warning.severity === 'HIGH' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}>
                        {warning.severity}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-red-700">
                      <p><strong>Trains:</strong> {warning.trains.join(' & ')}</p>
                      <p><strong>Distance:</strong> {warning.distance}</p>
                      <p><strong>ETA:</strong> {warning.estimatedCollision}</p>
                    </div>
                    <Button size="sm" className="mt-3 bg-red-600 hover:bg-red-700">
                      Take Action
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{analytics.ticketsBooked}</p>
                  <p className="text-sm text-gray-600">Tickets Booked</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <Train className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{analytics.trainsPassed}</p>
                  <p className="text-sm text-gray-600">Trains Passed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{analytics.trainsUpcoming}</p>
                  <p className="text-sm text-gray-600">Upcoming Trains</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{analytics.onTimeTrains}</p>
                  <p className="text-sm text-gray-600">On Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lighting Control */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              Platform Lighting Control
            </CardTitle>
            <CardDescription className="text-gray-600">
              Manage platform and area lighting for passenger safety
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(lightControls).map(([zone, isOn]) => (
                <div key={zone} className="flex flex-col items-center space-y-2">
                  <Switch
                    checked={isOn}
                    onCheckedChange={() => toggleLight(zone)}
                  />
                  <span className="text-sm text-gray-700 capitalize">{zone.replace(/([A-Z])/g, ' $1')}</span>
                  <div className={`w-3 h-3 rounded-full ${isOn ? 'bg-yellow-400' : 'bg-gray-300'}`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button className="h-24 bg-blue-600 hover:bg-blue-700 text-white">
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <span className="block text-sm">Manage Staff</span>
            </div>
          </Button>
          
          <Button className="h-24 bg-green-600 hover:bg-green-700 text-white">
            <div className="text-center">
              <Train className="h-8 w-8 mx-auto mb-2" />
              <span className="block text-sm">Schedule Trains</span>
            </div>
          </Button>
          
          <Button className="h-24 bg-purple-600 hover:bg-purple-700 text-white">
            <div className="text-center">
              <Zap className="h-8 w-8 mx-auto mb-2" />
              <span className="block text-sm">System Settings</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
