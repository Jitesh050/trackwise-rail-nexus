
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  ArrowUp, 
  ArrowDown, 
  Ticket, 
  Train, 
  AlertTriangle, 
  Map,
  Clock,
  Calendar,
  Shield,
  Zap,
  Activity
} from "lucide-react";
import CrowdDensity from "@/components/CrowdDensity";
import CollisionDetection from "@/components/CollisionDetection";
import EnergyOptimization from "@/components/EnergyOptimization";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="container mx-auto space-y-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Admin Control Center</h1>
          <p className="text-slate-300 text-lg">Monitor and manage railway operations</p>
        </header>

        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:flex bg-slate-800 border-slate-600">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-600 text-white">Overview</TabsTrigger>
            <TabsTrigger value="crowd" className="data-[state=active]:bg-slate-600 text-white">Crowd Density</TabsTrigger>
            <TabsTrigger value="safety" className="data-[state=active]:bg-slate-600 text-white">Collision Detection</TabsTrigger>
            <TabsTrigger value="energy" className="data-[state=active]:bg-slate-600 text-white">Energy Optimization</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-600 text-white">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard 
                title="Total Passengers"
                value="12,543"
                description={<><ArrowUp size={14} className="text-green-500" /> 12% from yesterday</>}
                icon={<Users className="h-6 w-6 text-rail-accent" />}
              />
              <StatsCard 
                title="Active Trains"
                value="43"
                description={<>2 delayed, 41 on time</>}
                icon={<Train className="h-6 w-6 text-rail-accent" />}
              />
              <StatsCard 
                title="Safety Alerts"
                value="0"
                description={<><ArrowDown size={14} className="text-green-500" /> All clear</>}
                icon={<Shield className="h-6 w-6 text-green-500" />}
              />
              <StatsCard 
                title="Energy Efficiency"
                value="94%"
                description={<><ArrowUp size={14} className="text-green-500" /> Optimized</>}
                icon={<Zap className="h-6 w-6 text-yellow-500" />}
              />
            </div>

            {/* Real-time monitoring cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-green-500" />
                    <CardTitle className="text-white">Collision Detection</CardTitle>
                  </div>
                  <CardDescription className="text-slate-400">Real-time safety monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500 mb-2">All Clear</div>
                  <div className="text-sm text-slate-400">No threats detected</div>
                  <div className="mt-4 h-2 bg-slate-700 rounded">
                    <div className="h-2 bg-green-500 rounded w-full"></div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-3 text-slate-300 border-slate-600"
                    onClick={() => setActiveTab("safety")}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-white">Crowd Density</CardTitle>
                  </div>
                  <CardDescription className="text-slate-400">Live passenger monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-500 mb-2">Moderate</div>
                  <div className="text-sm text-slate-400">Peak hours: 7-9 AM</div>
                  <div className="mt-4 h-2 bg-slate-700 rounded">
                    <div className="h-2 bg-blue-500 rounded w-3/4"></div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-3 text-slate-300 border-slate-600"
                    onClick={() => setActiveTab("crowd")}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <CardTitle className="text-white">Energy Optimization</CardTitle>
                  </div>
                  <CardDescription className="text-slate-400">Power management system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-500 mb-2">94%</div>
                  <div className="text-sm text-slate-400">Efficiency rating</div>
                  <div className="mt-4 h-2 bg-slate-700 rounded">
                    <div className="h-2 bg-yellow-500 rounded w-11/12"></div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-3 text-slate-300 border-slate-600"
                    onClick={() => setActiveTab("energy")}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Train Status Overview */}
            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-white">
                  <Train className="h-5 w-5" />
                  Train On-Time Performance
                </CardTitle>
                <CardDescription className="text-slate-400">Current status of all active trains</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-700">
                    <div className="text-2xl font-bold text-green-400">41</div>
                    <div className="text-sm text-green-300">On Time</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-900/30 rounded-lg border border-yellow-700">
                    <div className="text-2xl font-bold text-yellow-400">2</div>
                    <div className="text-sm text-yellow-300">Delayed</div>
                  </div>
                  <div className="text-center p-4 bg-gray-900/30 rounded-lg border border-gray-700">
                    <div className="text-2xl font-bold text-gray-400">0</div>
                    <div className="text-sm text-gray-300">Cancelled</div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Overall Performance</span>
                    <span>95.3%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded">
                    <div className="h-2 bg-green-500 rounded" style={{width: '95.3%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crowd">
            <div className="bg-white rounded-lg p-6">
              <CrowdDensity />
            </div>
          </TabsContent>

          <TabsContent value="safety">
            <div className="bg-white rounded-lg p-6">
              <CollisionDetection />
            </div>
          </TabsContent>

          <TabsContent value="energy">
            <div className="bg-white rounded-lg p-6">
              <EnergyOptimization />
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Analytics & Reports</CardTitle>
                <CardDescription className="text-slate-400">Performance metrics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-slate-700 rounded-md flex items-center justify-center text-slate-400">
                  Analytics dashboard with charts and reports would appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, description, icon }: StatsCardProps) => {
  return (
    <Card className="bg-slate-800 border-slate-600">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-slate-400 flex items-center mt-1">{description}</p>
          </div>
          <div className="p-2 bg-slate-700 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
