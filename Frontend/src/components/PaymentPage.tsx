import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Shield, CheckCircle } from "lucide-react";
// Using a direct path to the image
const qrCodeImage = "/src/assets/upi-qr.png";
import ETicket from "./ETicket";
import { Switch } from "@/components/ui/switch";
import { ticketsApi, type TicketRecord } from "@/lib/tickets";

interface PaymentPageProps {
  selectedTrain: {
    trainNumber: string;
    trainName: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
  };
  bookingDetails: {
    origin: string;
    destination: string;
    date: string;
    passengers: string;
    trainClass: string;
    priorityTicket: boolean;
    passengerName: string;
    email: string;
    phone: string;
  };
  selectedSeats: string[];
  onBack: () => void;
  onPaymentSuccess: () => void;
}

const PaymentPage = ({ selectedTrain, bookingDetails, selectedSeats, onBack, onPaymentSuccess }: PaymentPageProps) => {
  const [showQR, setShowQR] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);
  const [priority, setPriority] = useState(bookingDetails.priorityTicket);

  const totalFare = selectedTrain.price * parseInt(bookingDetails.passengers);
  const serviceFee = 2.99;
  const priorityFee = priority ? 20 : 0;
  const totalAmount = totalFare + serviceFee + priorityFee;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newTicketData: TicketRecord = {
      pnr: `PNR${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      passengerName: bookingDetails.passengerName,
      trainNumber: selectedTrain.trainNumber,
      trainName: selectedTrain.trainName,
      from: bookingDetails.origin,
      to: bookingDetails.destination,
      date: bookingDetails.date,
      departureTime: selectedTrain.departureTime,
      arrivalTime: selectedTrain.arrivalTime,
      seatNumbers: selectedSeats,
      class: bookingDetails.trainClass,
      fare: totalAmount,
      status: "Confirmed",
      coach: "C1",
      priority,
    };

    try {
      await ticketsApi.add(newTicketData);
    } catch (e) {
      console.warn("Saving ticket failed, but proceeding to confirmation.", e);
    }

    setTicketData(newTicketData);
    setPaymentSuccess(true);
    setIsProcessing(false);
    onPaymentSuccess();
  };

  if (paymentSuccess && ticketData) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Ticket Confirmed!</h2>
                          <p className="text-gray-600">Your booking has been successfully processed</p>
        </div>
        
        <ETicket ticketData={ticketData} />
        
        <div className="flex gap-4 justify-center">
          <Button onClick={() => window.print()}>Download Ticket</Button>
          <Button variant="outline" onClick={() => navigator.share && navigator.share({
            title: 'Train Ticket',
            text: `PNR: ${ticketData.pnr}`,
            url: window.location.href
          })}>
            Share Ticket
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{selectedTrain.trainNumber} - {selectedTrain.trainName}</p>
              <p className="text-sm text-gray-500">{bookingDetails.origin} → {bookingDetails.destination}</p>
              <p className="text-sm text-gray-500">{bookingDetails.date}</p>
            </div>
            <Badge variant="secondary">{bookingDetails.trainClass}</Badge>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Priority Ticket</p>
              <p className="text-xs text-gray-500">Skip queues and get faster support</p>
            </div>
            <Switch checked={priority} onCheckedChange={setPriority} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tickets ({bookingDetails.passengers}x)</span>
              <span>₹{totalFare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee</span>
              <span>₹{serviceFee.toFixed(2)}</span>
            </div>
            {priority && (
              <div className="flex justify-between">
                <span>Priority Fee</span>
                <span>₹{priorityFee.toFixed(2)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Amount</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>UPI Payment</CardTitle>
          <CardDescription>Scan the QR code with any UPI app to pay</CardDescription>
        </CardHeader>
        <CardContent>
          {!showQR ? (
            <div className="flex flex-col items-center gap-6">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowQR(true)}>
                Show UPI QR Code
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <img src={qrCodeImage} alt="UPI QR Code" className="w-64 h-64 rounded-lg border bg-white p-2" />
              <Button onClick={handlePayment} disabled={isProcessing} className="bg-green-600 hover:bg-green-700">
                {isProcessing ? "Processing..." : `I've Paid, Confirm Payment`}
              </Button>
            </div>
          )}
          <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Your payment information is secured with 256-bit SSL encryption</span>
          </div>
          <div className="mt-6 flex gap-4">
            <Button variant="outline" onClick={onBack} className="flex-1">
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
