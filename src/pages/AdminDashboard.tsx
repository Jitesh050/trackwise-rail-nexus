
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AreaChart, BarChart, PieChart } from "@/components/ui/chart";
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
import FeatureCard from "@/components/FeatureCard";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const adminFeatures = [
    "Collision detection",
    "Real time crowd density", 
    "energy optimization"
  ];

  const handleAddCard = () => {
    console.log("Add admin card clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="container mx-auto space-y-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Admin Control Center</h1>
          <p className="text-slate-300 text-lg">Monitor and manage railway operations</p>
        </header>

        <div className="flex justify-center mb-8">
          <FeatureCard
            title="Feature ( admin )"
            features={adminFeatures}
            onAddCard={handleAddCard}
            variant="admin"
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:flex bg-slate-800 border-slate-600">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-600 text-white">Overview</TabsTrigger>
            <TabsTrigger value="safety" className="data-[state=active]:bg-slate-600 text-white">Safety</TabsTrigger>
            <TabsTrigger value="operations" className="data-[state=active]:bg-slate-600 text-white">Operations</TabsTrigger>
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
                description={<>2 delayed</>}
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
                </CardContent>
              </Card>
            </div>

            {/* Heatmap placeholder */}
            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-white">
                  <Map className="h-5 w-5" />
                  Real-time System Overview
                </CardTitle>
                <CardDescription className="text-slate-400">Live monitoring across all stations and routes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-slate-700 rounded-md flex items-center justify-center text-slate-400">
                  Interactive system monitoring dashboard would appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="safety">
            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Safety Management System</CardTitle>
                <CardDescription className="text-slate-400">Collision detection and prevention protocols</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-slate-700 rounded-md flex items-center justify-center text-slate-400">
                  Safety monitoring interface would appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations">
            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Operations Control</CardTitle>
                <CardDescription className="text-slate-400">Train management and crowd density monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-slate-700 rounded-md flex items-center justify-center text-slate-400">
                  Operations management interface would appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Analytics & Optimization</CardTitle>
                <CardDescription className="text-slate-400">Energy efficiency and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-slate-700 rounded-md flex items-center justify-center text-slate-400">
                  Analytics dashboard would appear here
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
