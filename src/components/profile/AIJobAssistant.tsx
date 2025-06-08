
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Bot, Send, Mic, MicOff, ChevronDown, ChevronUp, User } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const AIJobAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI Job Assistant. I can help you with resume tips, job search advice, interview preparation, and career guidance. What would you like to know?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Predefined quick questions
  const quickQuestions = [
    "How to improve my resume?",
    "What jobs should I apply for?",
    "Tips for frontend developer interview?",
    "How to write a cover letter?",
    "Best practices for LinkedIn profile?"
  ];

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (text: string = inputMessage) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = generateAIResponse(text.trim());
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('resume') && input.includes('improve')) {
      return "Here are some tips to improve your resume:\n\n• Use action verbs like 'developed', 'implemented', 'optimized'\n• Quantify your achievements with numbers and percentages\n• Tailor your resume to each job application\n• Keep it concise (1-2 pages)\n• Include relevant keywords from job descriptions\n• Highlight your most recent and relevant experience\n• Proofread for grammar and spelling errors";
    }
    
    if (input.includes('job') && (input.includes('apply') || input.includes('search'))) {
      return "For effective job searching:\n\n• Use job boards like LinkedIn, Indeed, Glassdoor\n• Network with professionals in your field\n• Attend industry events and meetups\n• Consider working with recruiters\n• Apply to 5-10 jobs per day consistently\n• Follow up on applications after 1-2 weeks\n• Customize your application for each role";
    }
    
    if (input.includes('interview') && input.includes('frontend')) {
      return "Frontend developer interview tips:\n\n• Review JavaScript fundamentals (closures, promises, async/await)\n• Practice coding challenges on platforms like LeetCode\n• Be ready to explain your projects in detail\n• Know popular frameworks (React, Vue, Angular)\n• Understand CSS layouts, responsive design\n• Prepare for system design questions\n• Have questions ready about the company's tech stack";
    }
    
    if (input.includes('cover letter')) {
      return "Cover letter best practices:\n\n• Address it to a specific person when possible\n• Start with a compelling opening statement\n• Highlight 2-3 key achievements relevant to the role\n• Show knowledge about the company and role\n• Keep it to one page\n• End with a strong call to action\n• Match the tone to the company culture";
    }
    
    if (input.includes('linkedin')) {
      return "LinkedIn profile optimization:\n\n• Use a professional headshot\n• Write a compelling headline beyond just your job title\n• Craft a summary that tells your story\n• List all relevant skills and get endorsements\n• Share industry-related content regularly\n• Connect with colleagues and industry professionals\n• Ask for recommendations from past colleagues";
    }
    
    // Default response
    return "That's a great question! I'd be happy to help you with career advice. Could you be more specific about what you'd like to know? I can assist with resume writing, interview preparation, job search strategies, skill development, and career planning.";
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        toast.success('Voice recognition started', {
          description: 'Speak your question now...',
        });
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
        toast.error('Voice recognition failed', {
          description: 'Please try again or type your message.',
        });
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      toast.error('Voice recognition not supported', {
        description: 'Your browser does not support voice recognition.',
      });
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="bg-white/95 shadow-xl backdrop-blur-sm border border-gray-200 hover:shadow-2xl transition-all duration-300">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
            <CardTitle className="flex items-center justify-between text-xl font-semibold text-blue-600">
              <div className="flex items-center">
                <Bot className="mr-2 h-6 w-6" />
                AI Job Assistant
              </div>
              {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {/* Quick Questions */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Quick Questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                    onClick={() => handleSendMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="border rounded-lg bg-gray-50/50">
              <ScrollArea className="h-80 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-200 text-gray-800'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.sender === 'assistant' && (
                            <Bot className="h-4 w-4 mt-0.5 text-blue-600" />
                          )}
                          {message.sender === 'user' && (
                            <User className="h-4 w-4 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-[80%]">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-blue-600" />
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about jobs, resumes, interviews..."
                  className="pr-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  onClick={startVoiceRecognition}
                  disabled={isLoading || isListening}
                >
                  {isListening ? (
                    <MicOff className="h-4 w-4 text-red-500" />
                  ) : (
                    <Mic className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default AIJobAssistant;
