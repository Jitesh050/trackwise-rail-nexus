import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Calendar, ArrowRight, Train, Users, CreditCard, QrCode, Star, MessageCircle } from "lucide-react";
import PaymentPage from "@/components/PaymentPage";
import SeatSelection from "@/components/SeatSelection";
import ETicket from "@/components/ETicket";
import ChatBot from "@/components/ChatBot";

const BookTicket = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showChatBot, setShowChatBot] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState(null);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    passengers: "1",
    trainClass: "economy",
    priorityTicket: false,
    passengerName: "",
    email: "",
    phone: ""
  });
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSeatSelection = (seats: string[]) => {
    setSelectedSeats(seats);
  };

  const handlePaymentSuccess = () => {
    const ticketData = {
      pnr: `PNR${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      passengerName: formData.passengerName,
      trainNumber: selectedTrain.trainNumber,
      trainName: selectedTrain.trainName,
      from: formData.origin,
      to: formData.destination,
      date: formData.date,
      departureTime: selectedTrain.departureTime,
      arrivalTime: selectedTrain.arrivalTime,
      seatNumbers: selectedSeats,
      class: formData.trainClass,
      fare: selectedTrain.price * parseInt(formData.passengers) * (formData.priorityTicket ? 1.2 : 1),
      status: "Confirmed"
    };
    
    setGeneratedTicket(ticketData);
    setBookingComplete(true);
    setStep(5);
  };
  
  return (
    <div className="container mx-auto space-y-8 pb-10 animate-enter">
      <header>
        <h1 className="text-3xl font-bold">Book Tickets</h1>
        <p className="text-muted-foreground">Search and book train tickets for your journey</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div>
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Journey Details</CardTitle>
                <CardDescription>Enter your journey information to find available trains</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="origin">From</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                        <Input
                          id="origin"
                          name="origin"
                          placeholder="Origin station"
                          className="pl-10"
                          value={formData.origin}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="destination">To</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                        <Input
                          id="destination"
                          name="destination"
                          placeholder="Destination station"
                          className="pl-10"
                          value={formData.destination}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date of Journey</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          className="pl-10"
                          value={formData.date}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="passengers">Passengers</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                        <Input
                          id="passengers"
                          name="passengers"
                          type="number"
                          min="1"
                          max="10"
                          className="pl-10"
                          value={formData.passengers}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />
                  <div className="space-y-4">
                    <h3 className="font-medium">Passenger Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="passengerName">Full Name</Label>
                        <Input
                          id="passengerName"
                          name="passengerName"
                          placeholder="Enter full name"
                          value={formData.passengerName}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Class</Label>
                    <RadioGroup 
                      defaultValue={formData.trainClass}
                      className="grid grid-cols-3 gap-4 mt-2"
                      onValueChange={(value) => setFormData(prev => ({ ...prev, trainClass: value }))}
                    >
                      <div>
                        <RadioGroupItem value="economy" id="economy" className="peer sr-only" />
                        <Label
                          htmlFor="economy"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-rail-light p-4 hover:bg-rail-light/80 hover:border-rail-accent peer-data-[state=checked]:border-rail-accent peer-data-[state=checked]:bg-rail-accent/10"
                        >
                          <span className="text-sm font-medium">Economy</span>
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem value="business" id="business" className="peer sr-only" />
                        <Label
                          htmlFor="business"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-rail-light p-4 hover:bg-rail-light/80 hover:border-rail-accent peer-data-[state=checked]:border-rail-accent peer-data-[state=checked]:bg-rail-accent/10"
                        >
                          <span className="text-sm font-medium">Business</span>
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem value="first" id="first" className="peer sr-only" />
                        <Label
                          htmlFor="first"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-rail-light p-4 hover:bg-rail-light/80 hover:border-rail-accent peer-data-[state=checked]:border-rail-accent peer-data-[state=checked]:bg-rail-accent/10"
                        >
                          <span className="text-sm font-medium">First Class</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center space-x-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <input
                      type="checkbox"
                      id="priorityTicket"
                      name="priorityTicket"
                      checked={formData.priorityTicket}
                      onChange={handleFormChange}
                      className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
                    />
                    <div className="flex-1">
                      <Label htmlFor="priorityTicket" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-600" />
                          <span className="font-medium">Priority Ticket (+20%)</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Faster confirmation, priority boarding, and dedicated customer support
                        </p>
                      </Label>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button type="submit" className="w-full bg-rail-primary hover:bg-rail-primary/90">
                    <Train size={18} className="mr-2" />
                    Find Trains
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}
          
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Available Trains</CardTitle>
                <CardDescription>Select a train for your journey from {formData.origin} to {formData.destination}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TrainOption
                  trainNumber="EXP101"
                  trainName="Ocean Express"
                  departureTime="08:30"
                  arrivalTime="12:45"
                  duration="4h 15m"
                  price={59.99}
                  availability="Available"
                  priorityMultiplier={formData.priorityTicket ? 1.2 : 1}
                  onSelect={() => {
                    setSelectedTrain({
                      trainNumber: "EXP101",
                      trainName: "Ocean Express",
                      departureTime: "08:30",
                      arrivalTime: "12:45",
                      duration: "4h 15m",
                      price: 59.99
                    });
                    setStep(3);
                  }}
                />
                <TrainOption
                  trainNumber="SPD330"
                  trainName="Capital Bullet"
                  departureTime="10:00"
                  arrivalTime="13:20"
                  duration="3h 20m"
                  price={79.99}
                  availability="Few seats left"
                  priorityMultiplier={formData.priorityTicket ? 1.2 : 1}
                  onSelect={() => {
                    setSelectedTrain({
                      trainNumber: "SPD330",
                      trainName: "Capital Bullet",
                      departureTime: "10:00",
                      arrivalTime: "13:20",
                      duration: "3h 20m",
                      price: 79.99
                    });
                    setStep(3);
                  }}
                />
                <TrainOption
                  trainNumber="REG205"
                  trainName="Valley Commuter"
                  departureTime="11:45"
                  arrivalTime="15:15"
                  duration="3h 30m"
                  price={49.99}
                  availability="Sold out"
                  disabled
                  priorityMultiplier={1}
                  onSelect={() => console.log("Selected train")}
                />
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => setStep(1)}>Back to Search</Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && selectedTrain && (
            <SeatSelection 
              onSeatsSelected={handleSeatSelection}
              maxSeats={parseInt(formData.passengers)}
            />
          )}

          {step === 3 && selectedTrain && selectedSeats.length > 0 && (
            <div className="mt-6">
              <Button 
                onClick={() => setStep(4)}
                className="w-full bg-rail-primary hover:bg-rail-primary/90"
              >
                Proceed to Payment
              </Button>
            </div>
          )}
          
          {step === 4 && selectedTrain && (
            <PaymentPage 
              selectedTrain={selectedTrain}
              bookingDetails={formData}
              selectedSeats={selectedSeats}
              onBack={() => setStep(3)}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}

          {step === 5 && bookingComplete && generatedTicket && (
            <div className="space-y-6">
              <Card>
                <CardHeader className="text-center bg-green-50">
                  <CardTitle className="text-green-800">Booking Confirmed!</CardTitle>
                  <CardDescription className="text-green-600">
                    Your ticket has been booked successfully. You can download your e-ticket below.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <ETicket ticketData={generatedTicket} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => navigate("/trip-planner", { state: { destination: formData.destination } })}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <MapPin size={18} className="mr-2" />
                  Plan Your Trip
                </Button>
                
                <Button 
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="w-full"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-rail-light p-2 rounded-full">
                  <Calendar size={18} className="text-rail-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Book in Advance</p>
                  <p className="text-xs text-muted-foreground">Get better deals by booking your tickets early</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex gap-3">
                <div className="bg-rail-light p-2 rounded-full">
                  <CreditCard size={18} className="text-rail-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Multiple Payment Options</p>
                  <p className="text-xs text-muted-foreground">Pay using credit/debit cards, mobile wallets, or bank transfer</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex gap-3">
                <div className="bg-rail-light p-2 rounded-full">
                  <QrCode size={18} className="text-rail-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Digital Tickets</p>
                  <p className="text-xs text-muted-foreground">Download e-tickets with QR code for contactless travel</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-rail-primary" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Our AI assistant can help you with booking tickets through voice or text chat.
              </p>
              <Button 
                onClick={() => setShowChatBot(!showChatBot)}
                className="w-full bg-rail-accent hover:bg-rail-accent/90"
              >
                {showChatBot ? "Hide" : "Open"} ChatBot Assistant
              </Button>
            </CardContent>
          </Card>

          {showChatBot && (
            <div className="mt-4">
              <ChatBot />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface TrainOptionProps {
  trainNumber: string;
  trainName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availability: string;
  disabled?: boolean;
  priorityMultiplier: number;
  onSelect: () => void;
}

const TrainOption = ({
  trainNumber,
  trainName,
  departureTime,
  arrivalTime,
  duration,
  price,
  availability,
  disabled = false,
  priorityMultiplier,
  onSelect
}: TrainOptionProps) => {
  const isAvailable = !disabled;
  const finalPrice = price * priorityMultiplier;
  
  return (
    <div 
      className={`border rounded-lg p-4 transition-all ${
        disabled 
          ? 'bg-gray-50 opacity-60' 
          : 'hover:border-rail-accent hover:shadow-md cursor-pointer'
      }`}
      onClick={isAvailable ? onSelect : undefined}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Train size={16} className="text-rail-primary" />
            <span className="font-medium">{trainNumber}</span>
            <span className="text-sm text-muted-foreground">|</span>
            <span>{trainName}</span>
            {priorityMultiplier > 1 && (
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            )}
          </div>
          <div className="flex items-center mt-2">
            <div>
              <div className="font-medium">{departureTime}</div>
              <div className="text-xs text-muted-foreground">Departure</div>
            </div>
            <ArrowRight size={16} className="mx-3 text-muted-foreground" />
            <div>
              <div className="font-medium">{arrivalTime}</div>
              <div className="text-xs text-muted-foreground">Arrival</div>
            </div>
            <div className="ml-4 text-sm text-muted-foreground">
              <span className="block sm:inline">Duration: {duration}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end mt-4 sm:mt-0">
          <div className="text-lg font-semibold">
            ₹{finalPrice.toFixed(0)}
            {priorityMultiplier > 1 && (
              <span className="text-sm text-muted-foreground line-through ml-1">
                ₹{price.toFixed(0)}
              </span>
            )}
          </div>
          <div className={`text-xs ${disabled ? 'text-red-500' : 'text-green-600'}`}>{availability}</div>
          {isAvailable && (
            <Button size="sm" className="mt-2 bg-rail-primary hover:bg-rail-primary/90">
              Select
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookTicket;
