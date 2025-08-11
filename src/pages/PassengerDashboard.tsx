
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Train, MessageCircle, MapPin, Star } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";

const PassengerDashboard = () => {
  const passengerFeatures = [
    "QR ticket booking",
    "Checking live train status", 
    "Chatbot for booking ticket",
    "Trip planner (shows all the hotels n spots near the station)",
    "priority tickets"
  ];

  const handleAddCard = () => {
    console.log("Add card clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="container mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Passenger Portal</h1>
          <p className="text-slate-300 text-lg">Your journey starts here</p>
        </header>

        <div className="flex justify-center">
          <FeatureCard
            title="Features ( passenger )"
            features={passengerFeatures}
            onAddCard={handleAddCard}
            variant="passenger"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <Card className="bg-slate-800 border-slate-600 hover:bg-slate-700 transition-colors cursor-pointer">
            <CardHeader>
              <QrCode className="h-8 w-8 text-rail-accent mb-2" />
              <CardTitle className="text-white">QR Ticket Booking</CardTitle>
              <CardDescription className="text-slate-400">Quick and easy ticket booking with QR codes</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800 border-slate-600 hover:bg-slate-700 transition-colors cursor-pointer">
            <CardHeader>
              <Train className="h-8 w-8 text-rail-accent mb-2" />
              <CardTitle className="text-white">Live Train Status</CardTitle>
              <CardDescription className="text-slate-400">Real-time updates on train schedules</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800 border-slate-600 hover:bg-slate-700 transition-colors cursor-pointer">
            <CardHeader>
              <MessageCircle className="h-8 w-8 text-rail-accent mb-2" />
              <CardTitle className="text-white">Booking Assistant</CardTitle>
              <CardDescription className="text-slate-400">AI-powered chatbot for ticket booking</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800 border-slate-600 hover:bg-slate-700 transition-colors cursor-pointer">
            <CardHeader>
              <MapPin className="h-8 w-8 text-rail-accent mb-2" />
              <CardTitle className="text-white">Trip Planner</CardTitle>
              <CardDescription className="text-slate-400">Discover hotels and attractions near stations</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800 border-slate-600 hover:bg-slate-700 transition-colors cursor-pointer">
            <CardHeader>
              <Star className="h-8 w-8 text-rail-accent mb-2" />
              <CardTitle className="text-white">Priority Tickets</CardTitle>
              <CardDescription className="text-slate-400">Access to premium booking options</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PassengerDashboard;
