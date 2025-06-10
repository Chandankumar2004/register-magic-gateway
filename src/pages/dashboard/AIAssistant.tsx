
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, ExternalLink, Sparkles, Mic, MicOff, Trash2, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { useChat } from '@/contexts/ChatContext';
import { generateAIResponse } from '@/services/aiService';
import { hasOpenAIKey, removeOpenAIKey } from '@/utils/openai';
import ApiKeySetup from '@/components/ai/ApiKeySetup';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  sources?: { title: string; url: string }[];
}

const AIAssistant: React.FC = () => {
  const { messages, addMessage, clearMessages, isLoading, setIsLoading } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [apiKeyConfigured, setApiKeyConfigured] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Quick suggestion questions
  const quickQuestions = [
    "Best companies for freshers in 2025?",
    "Difference between React and Angular",
    "Sample cover letter for frontend developer",
    "Trending technologies in software development",
    "How to prepare for technical interviews?",
    "Tips for salary negotiation",
  ];

  useEffect(() => {
    setApiKeyConfigured(hasOpenAIKey());
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (text: string = inputMessage) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    addMessage(userMessage);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Prepare chat history for context
      const chatHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await generateAIResponse(text.trim(), chatHistory);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'assistant',
        timestamp: new Date(),
        sources: response.sources
      };
      
      addMessage(assistantMessage);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
        sender: 'assistant',
        timestamp: new Date()
      };
      addMessage(errorMessage);
      toast.error('Failed to get AI response');
    } finally {
      setIsLoading(false);
    }
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

  const handleClearChat = () => {
    clearMessages();
    toast.success('Chat history cleared');
  };

  const handleReconfigureAPI = () => {
    removeOpenAIKey();
    setApiKeyConfigured(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!apiKeyConfigured) {
    return <ApiKeySetup onKeySet={() => setApiKeyConfigured(true)} />;
  }

  return (
    <div className="flex flex-col h-full max-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Job Assistant</h1>
              <p className="text-gray-600 dark:text-gray-300">Your intelligent career partner powered by OpenAI</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearChat}
              className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReconfigureAPI}
              className="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Settings className="h-4 w-4 mr-1" />
              API Key
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="p-6 bg-white/50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Quick Questions
        </h2>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-900 dark:hover:text-blue-400 transition-all duration-200"
              onClick={() => handleSendMessage(question)}
              disabled={isLoading}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <Card className="flex-1 m-6 mb-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border-gray-200 dark:border-gray-700">
        <CardContent className="p-0 h-full flex flex-col">
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 dark:bg-blue-700 text-white'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {message.sender === 'assistant' && (
                        <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                          <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                      )}
                      {message.sender === 'user' && (
                        <div className="p-1 bg-blue-500 dark:bg-blue-600 rounded-full">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                        
                        {/* Sources */}
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-600">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">📚 Helpful Resources:</p>
                            <div className="space-y-2">
                              {message.sources.map((source, index) => (
                                <a
                                  key={index}
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  {source.title}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <p className={`text-xs mt-2 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 max-w-[85%] shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Input Area */}
      <div className="p-6 pt-0">
        <div className="flex gap-3 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex-1 relative">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything about careers, technology, job search, or professional development..."
              className="border-0 bg-transparent text-base placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-white"
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
                <Mic className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              )}
            </Button>
          </div>
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white transition-all duration-300 transform hover:scale-105 rounded-xl px-6"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          AI Assistant powered by OpenAI GPT • Get career guidance, tech help, and professional insights
        </p>
      </div>
    </div>
  );
};

export default AIAssistant;
