
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Train, MessageCircle, MapPin, Star, Ticket, Clock, User } from "lucide-react";

const PassengerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="container mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Passenger Portal</h1>
          <p className="text-slate-300 text-lg">Your journey starts here</p>
        </header>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/book-ticket">
            <Card className="bg-slate-800 border-slate-600 hover:bg-slate-700 transition-colors cursor-pointer h-full">
              <CardHeader>
                <QrCode className="h-8 w-8 text-rail-accent mb-2" />
                <CardTitle className="text-white">Book Tickets</CardTitle>
                <CardDescription className="text-slate-400">Quick and easy ticket booking with QR codes</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-rail-accent hover:bg-rail-accent/90">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/train-status">
            <Card className="bg-slate-800 border-slate-600 hover:bg-slate-700 transition-colors cursor-pointer h-full">
              <CardHeader>
                <Train className="h-8 w-8 text-rail-accent mb-2" />
                <CardTitle className="text-white">Live Train Status</CardTitle>
                <CardDescription className="text-slate-400">Real-time updates on train schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full text-slate-300 border-slate-600">
                  Check Status
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/user">
            <Card className="bg-slate-800 border-slate-600 hover:bg-slate-700 transition-colors cursor-pointer h-full">
              <CardHeader>
                <User className="h-8 w-8 text-rail-accent mb-2" />
                <CardTitle className="text-white">My Bookings</CardTitle>
                <CardDescription className="text-slate-400">View and manage your ticket bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full text-slate-300 border-slate-600">
                  View Bookings
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Card className="bg-slate-800 border-slate-600 hover:bg-slate-700 transition-colors cursor-pointer h-full">
            <CardHeader>
              <MessageCircle className="h-8 w-8 text-rail-accent mb-2" />
              <CardTitle className="text-white">Chat Assistant</CardTitle>
              <CardDescription className="text-slate-400">Get help with voice or text chat</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full text-slate-300 border-slate-600">
                Start Chat
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-800 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-500" />
                Priority Services
              </CardTitle>
              <CardDescription className="text-slate-400">
                Upgrade your travel experience with priority booking and services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-slate-300 text-sm">Priority ticket confirmation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-slate-300 text-sm">Dedicated customer support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-slate-300 text-sm">Priority boarding access</span>
              </div>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900">
                Learn More
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-6 w-6 text-green-500" />
                Trip Planner
              </CardTitle>
              <CardDescription className="text-slate-400">
                Discover hotels and attractions near your destination
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-300 text-sm">Hotel recommendations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-300 text-sm">Tourist attractions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-300 text-sm">Local points of interest</span>
              </div>
              <Button variant="outline" className="w-full text-slate-300 border-slate-600">
                Explore
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-slate-800 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-500" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-slate-400">
              Your latest bookings and travel updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Ticket className="h-5 w-5 text-rail-accent" />
                  <div>
                    <p className="text-white font-medium">Ticket Booked</p>
                    <p className="text-slate-400 text-sm">EXP101 - Central to Metro Junction</p>
                  </div>
                </div>
                <span className="text-slate-400 text-sm">2 hours ago</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Train className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-white font-medium">Train Status Update</p>
                    <p className="text-slate-400 text-sm">SPD330 is running on time</p>
                  </div>
                </div>
                <span className="text-slate-400 text-sm">1 day ago</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-white font-medium">Chat Session</p>
                    <p className="text-slate-400 text-sm">Booking assistance completed</p>
                  </div>
                </div>
                <span className="text-slate-400 text-sm">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PassengerDashboard;
