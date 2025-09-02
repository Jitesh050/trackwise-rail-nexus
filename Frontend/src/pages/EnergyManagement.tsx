import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Zap } from "lucide-react";

const EnergyManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Energy Management</h1>
          <p className="text-gray-600 mt-1">Manage energy consumption and optimization</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Zap className="h-4 w-4 mr-2" />
          View Usage
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Energy Management Dashboard</CardTitle>
          <CardDescription>Monitor and optimize energy consumption</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            Energy management interface coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnergyManagement;
