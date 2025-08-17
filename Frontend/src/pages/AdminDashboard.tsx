
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { FeatureSection } from "@/components/ui/feature-section";
import { 
  Shield,
  AlertTriangle, 
  Users, 
  Zap,
  Activity,
  TrendingUp,
  Settings,
  Bell,
  BarChart3,
  MapPin,
  Power
} from "lucide-react";
import CollisionDetectionMap from "@/components/admin/CollisionDetectionMap";
import CrowdDensityHeatmap from "@/components/admin/CrowdDensityHeatmap";
import EnergyOptimizationControl from "@/components/admin/EnergyOptimizationControl";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications] = useState(3);

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Admin Control Center</h1>
            <p className="text-muted-foreground mt-1">
              Advanced monitoring and management for railway operations
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:flex bg-slate-800 border border-slate-700 rounded-xl shadow" style={{background: 'rgba(30,41,59,0.97)'}}>
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="collision" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="h-4 w-4 mr-2" />
              Collision Detection
            </TabsTrigger>
            <TabsTrigger value="crowd" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="h-4 w-4 mr-2" />
              Crowd Monitoring
            </TabsTrigger>
            <TabsTrigger value="energy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Zap className="h-4 w-4 mr-2" />
              Energy Control
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* System Status Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <DashboardCard 
                title="Active Trains"
                icon={Activity}
                badge="43 Running"
                badgeVariant="secondary"
              >
                <div className="text-2xl font-bold">43</div>
                <div className="text-sm text-muted-foreground">2 delayed, 41 on time</div>
              </DashboardCard>

              <DashboardCard 
                title="Collision Alerts"
                icon={AlertTriangle}
                badge="1 High Priority"
                badgeVariant="destructive"
              >
                <div className="text-2xl font-bold text-red-600">1</div>
                <div className="text-sm text-muted-foreground">Active warning detected</div>
              </DashboardCard>

              <DashboardCard 
                title="Crowd Status"
                icon={Users}
                badge="Peak Hours"
                badgeVariant="outline"
              >
                <div className="text-2xl font-bold text-orange-600">67%</div>
                <div className="text-sm text-muted-foreground">Station capacity</div>
              </DashboardCard>

              <DashboardCard 
                title="Energy Efficiency" 
                icon={Zap}
                badge="Optimized"
                badgeVariant="secondary"
              >
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-sm text-muted-foreground">$127 saved today</div>
              </DashboardCard>
            </div>

            {/* Main Control Features */}
            <FeatureSection title="Control Systems" icon={Shield}>
              <DashboardCard
                title="Collision Detection"
                description="Real-time train tracking and collision prevention"
                icon={AlertTriangle}
                badge="Active"
                badgeVariant="destructive"
                onClick={() => setActiveTab("collision")}
              >
                <div className="space-y-2">
                  <div className="text-sm font-medium text-red-600">1 Warning Active</div>
                  <div className="text-xs text-muted-foreground">Express 101 & Bullet 330 - 45s to collision</div>
                </div>
              </DashboardCard>

              <DashboardCard
                title="Crowd Density Monitoring"
                description="Heat map visualization of passenger flow"
                icon={Users}
                badge="2 Critical Zones"
                badgeVariant="outline"
                onClick={() => setActiveTab("crowd")}
              >
                <div className="space-y-2">
                  <div className="text-sm font-medium text-orange-600">High Density Detected</div>
                  <div className="text-xs text-muted-foreground">Central Station - Platform 1 & Waiting Area</div>
                </div>
              </DashboardCard>

              <DashboardCard
                title="Energy Optimization"
                description="Automated energy management system"
                icon={Zap}
                badge="Auto Mode"
                badgeVariant="secondary"
                onClick={() => setActiveTab("energy")}
              >
                <div className="space-y-2">
                  <div className="text-sm font-medium text-green-600">89% Efficiency</div>
                  <div className="text-xs text-muted-foreground">54.7 kWh saved today</div>
                </div>
              </DashboardCard>
            </FeatureSection>

            {/* System Status Overview */}
            <Card className="bg-slate-800 border-slate-700 rounded-2xl shadow-xl" style={{background: 'rgba(30,41,59,0.97)'}}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  System Status Overview
                </CardTitle>
                <CardDescription>Real-time monitoring of all railway systems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-2xl font-bold text-red-600">1</div>
                    <div className="text-sm text-red-700">Active Alerts</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">98.5%</div>
                    <div className="text-sm text-green-700">System Uptime</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">43</div>
                    <div className="text-sm text-blue-700">Monitored Trains</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collision">
            <div className="bg-card rounded-xl border border-border/50 p-6">
              <CollisionDetectionMap />
            </div>
          </TabsContent>

          <TabsContent value="crowd">
            <div className="bg-card rounded-xl border border-border/50 p-6">
              <CrowdDensityHeatmap />
            </div>
          </TabsContent>

          <TabsContent value="energy">
            <div className="bg-card rounded-xl border border-border/50 p-6">
              <EnergyOptimizationControl />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
