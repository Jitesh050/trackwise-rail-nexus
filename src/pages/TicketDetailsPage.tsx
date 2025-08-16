import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// This would be replaced by a real data fetch in a real app
const mockTickets: Record<string, any> = {
  DEMO1234: {
    pnr: "DEMO1234",
    passengerName: "John Doe",
    trainNumber: "12345",
    trainName: "Express Line",
    from: "Station A",
    to: "Station B",
    date: "2025-08-16",
    departureTime: "10:00",
    arrivalTime: "14:00",
    seatNumbers: ["A1", "A2"],
    class: "AC",
    fare: 1500,
    status: "Confirmed"
  }
};

const TicketDetailsPage = () => {
  const { pnr } = useParams<{ pnr: string }>();
  const ticket = mockTickets[pnr || ""];

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-2">Ticket Not Found</h2>
          <p>No ticket found for the provided PNR.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center bg-rail-primary text-white rounded-t-lg">
          <h3 className="text-xl font-semibold">Ticket Details</h3>
          <p className="text-sm opacity-90">PNR: {ticket.pnr}</p>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div><strong>Passenger Name:</strong> {ticket.passengerName}</div>
          <div><strong>Train:</strong> {ticket.trainNumber} - {ticket.trainName}</div>
          <div><strong>From:</strong> {ticket.from}</div>
          <div><strong>To:</strong> {ticket.to}</div>
          <div><strong>Date:</strong> {ticket.date}</div>
          <div><strong>Departure:</strong> {ticket.departureTime}</div>
          <div><strong>Arrival:</strong> {ticket.arrivalTime}</div>
          <div><strong>Seat Numbers:</strong> {ticket.seatNumbers.join(', ')}</div>
          <div><strong>Class:</strong> {ticket.class}</div>
          <div><strong>Fare:</strong> ₹{ticket.fare}</div>
          <div><strong>Status:</strong> {ticket.status}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketDetailsPage;
