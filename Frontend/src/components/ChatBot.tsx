
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Mic, MicOff, User, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

type ChatBotFlow =
  | 'idle'
  | 'select_option'
  | 'booking_source'
  | 'booking_destination'
  | 'booking_date'
  | 'booking_type'
  | 'booking_name'
  | 'booking_email'
  | 'booking_phone'
  | 'booking_seat'
  | 'booking_confirm'
  | 'train_status_pnr'
  | 'train_status_result'
  | 'query';

interface BookingData {
  source?: string;
  destination?: string;
  date?: string;
  type?: string;
  name?: string;
  email?: string;
  phone?: string;
  seat?: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your TrackWise assistant. I can help you book tickets, check train status, or answer any questions about your journey. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
const [flow, setFlow] = useState<ChatBotFlow>('select_option');
const [booking, setBooking] = useState<BookingData>({});
const [pendingOption, setPendingOption] = useState<string | null>(null);
const [trainStatusPNR, setTrainStatusPNR] = useState<string>("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
  if (!inputText.trim()) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    text: inputText,
    isBot: false,
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setInputText("");
  setIsTyping(true);

  // Conversational flow logic
  setTimeout(() => {
    let botResponse = "";
    let nextFlow: ChatBotFlow = flow;
    let updateBooking = { ...booking };

    switch (flow) {
      case 'select_option':
        botResponse = "Please select an option above.";
        break;
      case 'booking_source':
        updateBooking.source = userMessage.text;
        botResponse = "Great! What's your destination station?";
        nextFlow = 'booking_destination';
        break;
      case 'booking_destination':
        updateBooking.destination = userMessage.text;
        botResponse = "What date would you like to travel? (YYYY-MM-DD)";
        nextFlow = 'booking_date';
        break;
      case 'booking_date':
        updateBooking.date = userMessage.text;
        botResponse = "What type of ticket do you want? (General, Sleeper, AC, etc.)";
        nextFlow = 'booking_type';
        break;
      case 'booking_type':
        updateBooking.type = userMessage.text;
        botResponse = "Please enter your name.";
        nextFlow = 'booking_name';
        break;
      case 'booking_name':
        updateBooking.name = userMessage.text;
        botResponse = "Please enter your email address.";
        nextFlow = 'booking_email';
        break;
      case 'booking_email':
        updateBooking.email = userMessage.text;
        botResponse = "Please enter your phone number.";
        nextFlow = 'booking_phone';
        break;
      case 'booking_phone':
        updateBooking.phone = userMessage.text;
        botResponse = "Which seat number would you prefer? (Leave blank for auto-assign)";
        nextFlow = 'booking_seat';
        break;
      case 'booking_seat':
        updateBooking.seat = userMessage.text;
        // --- Integrate ticket booking API ---
        botResponse = "Booking your ticket...";
        nextFlow = 'booking_confirm';
        setIsTyping(true);
        fetch('/api/tickets/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateBooking)
        })
          .then(res => res.json())
          .then(data => {
            setMessages(prev => [...prev, {
              id: (Date.now() + 2).toString(),
              text: data.success ? `Ticket booked!\n\nPNR: ${data.pnr}\nFrom: ${data.source}\nTo: ${data.destination}\nDate: ${data.date}\nSeat: ${data.seat}\n\nRedirecting you to confirmation page...` : `Booking failed: ${data.error || 'Unknown error'}`,
              isBot: true,
              timestamp: new Date()
            }]);
            setIsTyping(false);
            if (data.success) {
              setTimeout(() => {
                window.location.href = '/ticket-confirm';
              }, 2000);
            }
          })
          .catch(() => {
            setMessages(prev => [...prev, {
              id: (Date.now() + 2).toString(),
              text: 'Booking failed: Could not reach server.',
              isBot: true,
              timestamp: new Date()
            }]);
            setIsTyping(false);
          });
        return; // Prevent fallthrough
      case 'train_status_pnr':
        setTrainStatusPNR(userMessage.text);
        botResponse = "Checking status for PNR: " + userMessage.text + "...";
        nextFlow = 'train_status_result';
        setIsTyping(true);
        fetch('/api/train-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pnr: userMessage.text })
        })
          .then(res => res.json())
          .then(data => {
            setMessages(prev => [...prev, {
              id: (Date.now() + 2).toString(),
              text: data.status
                ? `Train Status for PNR ${userMessage.text}:\n${data.status}`
                : `No status found for PNR ${userMessage.text}.`,
              isBot: true,
              timestamp: new Date()
            }]);
            setIsTyping(false);
          })
          .catch(() => {
            setMessages(prev => [...prev, {
              id: (Date.now() + 2).toString(),
              text: 'Could not fetch train status.',
              isBot: true,
              timestamp: new Date()
            }]);
            setIsTyping(false);
          });
        return;
      case 'query':
      default:
        setIsTyping(true);
        fetch('/api/chatbot/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: userMessage.text })
        })
          .then(res => res.json())
          .then(data => {
            setMessages(prev => [...prev, {
              id: (Date.now() + 2).toString(),
              text: data.answer || 'Sorry, I could not answer that.',
              isBot: true,
              timestamp: new Date()
            }]);
            setIsTyping(false);
          })
          .catch(() => {
            setMessages(prev => [...prev, {
              id: (Date.now() + 2).toString(),
              text: 'Could not reach chatbot service.',
              isBot: true,
              timestamp: new Date()
            }]);
            setIsTyping(false);
          });
        return;
    }
    setBooking(updateBooking);
    setFlow(nextFlow);
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      isBot: true,
      timestamp: new Date()
    }]);
    setIsTyping(false);
    // Simulate redirect after booking
    if (nextFlow === 'booking_confirm') {
      setTimeout(() => {
        window.location.href = '/ticket-confirm';
      }, 2000);
    }
  }, 1200);
};

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("book") || input.includes("ticket")) {
      return "I'd be happy to help you book a ticket! To get started, I'll need to know:\n\n1. Your departure station\n2. Your destination station\n3. Travel date\n4. Number of passengers\n\nYou can also use our booking form on the website for a more detailed experience.";
    }
    
    if (input.includes("train status") || input.includes("delay")) {
      return "I can help you check train status! Please provide:\n\n1. Train number (e.g., EXP101)\n- OR -\n2. Route details (departure and destination stations)\n\nI'll give you real-time information about delays, platform numbers, and expected arrival times.";
    }
    
    if (input.includes("cancel")) {
      return "To cancel your booking, I'll need your PNR number. You can find this in your booking confirmation email or ticket. Please note that cancellation charges may apply depending on how close to departure time you are canceling.";
    }
    
    if (input.includes("refund")) {
      return "Refunds are processed based on our cancellation policy:\n\n• More than 24 hours before departure: 90% refund\n• 12-24 hours before: 75% refund\n• 4-12 hours before: 50% refund\n• Less than 4 hours: No refund\n\nRefunds typically take 5-7 business days to process.";
    }
    
    if (input.includes("platform") || input.includes("station")) {
      return "I can help you find platform information! Please provide your train number or departure/arrival stations. Platform assignments are usually confirmed 2 hours before departure.";
    }
    
    return "I understand you're asking about railway services. I can help with:\n\n• Ticket booking\n• Train status and delays\n• Platform information\n• Cancellations and refunds\n• Station facilities\n• Journey planning\n\nCould you please be more specific about what you'd like to know?";
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      // Stop speech recognition
    } else {
      setIsListening(true);
      // Start speech recognition (would require Web Speech API implementation)
      setTimeout(() => {
        setIsListening(false);
        setInputText("I want to book a ticket from New York to Boston");
      }, 3000);
    }
  };


  const handleOptionClick = (option: string) => {
    switch (option) {
      case 'book_ticket':
        setMessages(prev => [...prev, { id: Date.now().toString(), text: 'Book Ticket', isBot: false, timestamp: new Date() }]);
        setFlow('booking_source');
        setIsTyping(true);
        setTimeout(() => {
          setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: 'Sure! What is your departure station?', isBot: true, timestamp: new Date() }]);
          setIsTyping(false);
        }, 800);
        break;
      case 'ask_query':
        setMessages(prev => [...prev, { id: Date.now().toString(), text: 'Ask a Query', isBot: false, timestamp: new Date() }]);
        setFlow('query');
        setIsTyping(true);
        setTimeout(() => {
          setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: 'What would you like to ask?', isBot: true, timestamp: new Date() }]);
          setIsTyping(false);
        }, 800);
        break;
      case 'train_status':
        setMessages(prev => [...prev, { id: Date.now().toString(), text: 'Check Train Status', isBot: false, timestamp: new Date() }]);
        setFlow('train_status_pnr');
        setIsTyping(true);
        setTimeout(() => {
          setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: 'Please enter your PNR number:', isBot: true, timestamp: new Date() }]);
          setIsTyping(false);
        }, 800);
        break;
      default:
        break;
    }
  };

  return (
    <Card className="max-w-xl w-full h-[600px] max-h-[80vh] flex flex-col mx-auto shadow-2xl border border-slate-700 bg-slate-900">
      <CardHeader className="bg-rail-primary text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          TrackWise Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex items-start gap-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isBot ? 'bg-rail-primary text-white' : 'bg-rail-accent text-white'
                }`}>
                  {message.isBot ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={`p-3 rounded-lg break-words ${
                  message.isBot 
                    ? 'bg-slate-800 text-slate-100 border border-slate-700' 
                    : 'bg-rail-accent text-white border border-rail-accent/30'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-rail-primary text-white flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="p-3 rounded-lg bg-gray-100">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Options Area */}
        {flow === 'select_option' && (
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button 
                onClick={() => handleOptionClick('book_ticket')}
                className="bg-rail-primary hover:bg-rail-primary/90"
              >
                Book Ticket
              </Button>
              <Button 
                onClick={() => handleOptionClick('ask_query')}
                className="bg-rail-primary hover:bg-rail-primary/90"
              >
                Ask Query
              </Button>
              <Button 
                onClick={() => handleOptionClick('train_status')}
                className="bg-rail-primary hover:bg-rail-primary/90"
              >
                Train Status
              </Button>
            </div>
          </div>
        )}
        
        {/* Input Area */}
        {flow !== 'select_option' && (
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleVoiceInput}
                className={isListening ? 'bg-red-100 border-red-300' : ''}
              >
                {isListening ? <MicOff className="h-4 w-4 text-red-600" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Input
                placeholder="Type your message or use voice..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-rail-primary hover:bg-rail-primary/90"
                disabled={!inputText.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {isListening && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                Listening... Speak now
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatBot;
