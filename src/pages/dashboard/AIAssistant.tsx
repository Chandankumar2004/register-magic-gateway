import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, ExternalLink, Sparkles, Mic, MicOff } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  sources?: { title: string; url: string }[];
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI Career Assistant. I can help you with anything - from job search strategies and resume tips to technical questions about programming, career advice, and industry insights. What would you like to know?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
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

    // Simulate AI response with intelligent analysis
    setTimeout(() => {
      const aiResponse = generateIntelligentResponse(text.trim());
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'assistant',
        timestamp: new Date(),
        sources: aiResponse.sources
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500 + Math.random() * 2000);
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

  const generateIntelligentResponse = (userInput: string): { text: string; sources?: { title: string; url: string }[] } => {
    const input = userInput.toLowerCase();
    
    // Career and job-related queries
    if (input.includes('companies') && (input.includes('fresher') || input.includes('2025'))) {
      return {
        text: "Here are some of the best companies for freshers in 2025:\n\n**Technology Giants:**\n• Google - Excellent training programs and mentorship\n• Microsoft - Strong learning culture and career growth\n• Amazon - Fast-paced environment with leadership principles\n• Meta - Innovation-focused with competitive packages\n\n**Indian IT Leaders:**\n• TCS - Comprehensive training and global exposure\n• Infosys - Strong foundation programs for freshers\n• Wipro - Focus on emerging technologies\n• HCL - Good work-life balance and learning opportunities\n\n**Emerging Unicorns:**\n• Zomato, Swiggy - Fast growth and startup culture\n• Paytm, PhonePe - Fintech innovation leaders\n• Flipkart, Meesho - E-commerce giants\n\n**Key Tips:**\n• Focus on companies with structured training programs\n• Look for mentorship opportunities\n• Consider company culture and growth potential\n• Research their tech stack and learning resources",
        sources: [
          { title: "Top Tech Companies Hiring Guide 2025", url: "https://www.glassdoor.com/blog/best-tech-companies/" },
          { title: "Fresher Career Guide - LinkedIn", url: "https://www.linkedin.com/advice/0/what-best-companies-freshers-work" }
        ]
      };
    }

    // React vs Angular comparison
    if (input.includes('react') && input.includes('angular')) {
      return {
        text: "Here's a comprehensive comparison between React and Angular:\n\n**React:**\n✅ **Pros:**\n• Lightweight library (not a framework)\n• Flexible and easy to learn\n• Large ecosystem and community\n• Better performance with Virtual DOM\n• Used by Facebook, Netflix, Airbnb\n\n❌ **Cons:**\n• Requires additional libraries for full functionality\n• Frequent updates can be overwhelming\n• JSX learning curve for beginners\n\n**Angular:**\n✅ **Pros:**\n• Complete framework with everything built-in\n• TypeScript by default\n• Powerful CLI and development tools\n• Great for large enterprise applications\n• Used by Google, Microsoft, Samsung\n\n❌ **Cons:**\n• Steeper learning curve\n• Can be overkill for simple projects\n• Larger bundle size\n\n**When to choose React:**\n• Smaller to medium projects\n• Need flexibility in architecture\n• Team prefers JavaScript\n• Rapid prototyping\n\n**When to choose Angular:**\n• Large enterprise applications\n• Team prefers TypeScript\n• Need comprehensive tooling\n• Long-term maintenance projects",
        sources: [
          { title: "React vs Angular - Official Comparison", url: "https://reactjs.org/" },
          { title: "Angular Documentation", url: "https://angular.io/" },
          { title: "Stack Overflow Developer Survey", url: "https://stackoverflow.com/insights/survey/2024" }
        ]
      };
    }

    // Cover letter sample
    if (input.includes('cover letter') && input.includes('frontend')) {
      return {
        text: "Here's a sample cover letter for a Frontend Developer position:\n\n**Subject: Application for Frontend Developer Position**\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the Frontend Developer position at [Company Name]. With [X] years of experience in modern web development and a passion for creating intuitive user experiences, I am excited about the opportunity to contribute to your team.\n\n**Key Highlights:**\n• Proficient in React.js, JavaScript (ES6+), HTML5, and CSS3\n• Experience with responsive design and cross-browser compatibility\n• Built [X] projects including [specific project example]\n• Familiar with modern tools like Webpack, Git, and Agile methodologies\n\n**Why [Company Name]:**\nI'm particularly drawn to your company's commitment to [specific company value/project]. Your recent work on [specific project/initiative] aligns perfectly with my interests in [relevant technology/field].\n\n**What I Bring:**\n• Strong problem-solving skills and attention to detail\n• Experience collaborating with designers and backend developers\n• Passion for clean, maintainable code and user-centered design\n• Continuous learning mindset - recently completed [relevant course/certification]\n\nI would welcome the opportunity to discuss how my skills and enthusiasm can contribute to your team's success. Thank you for considering my application.\n\nBest regards,\n[Your Name]\n\n**Pro Tips:**\n• Customize for each company\n• Include specific project examples\n• Show knowledge about the company\n• Keep it concise (under 400 words)",
        sources: [
          { title: "Cover Letter Best Practices", url: "https://www.indeed.com/career-advice/cover-letter" },
          { title: "Frontend Developer Resume Guide", url: "https://www.freecodecamp.org/news/how-to-write-a-great-developer-resume/" }
        ]
      };
    }

    // Trending technologies
    if (input.includes('trending') && input.includes('technolog')) {
      return {
        text: "Here are the trending technologies in software development for 2025:\n\n**Frontend Technologies:**\n🔥 **Next.js 14** - Full-stack React framework with App Router\n🔥 **Svelte/SvelteKit** - Compile-time optimized framework\n🔥 **Astro** - Content-focused static site generator\n🔥 **Tailwind CSS** - Utility-first CSS framework\n\n**Backend & Cloud:**\n🚀 **Serverless Architecture** - AWS Lambda, Vercel Functions\n🚀 **Edge Computing** - Cloudflare Workers, Deno Deploy\n🚀 **GraphQL** - Flexible API query language\n🚀 **Supabase** - Open source Firebase alternative\n\n**AI & Machine Learning:**\n🤖 **LLM Integration** - OpenAI API, Anthropic Claude\n🤖 **AI Code Generation** - GitHub Copilot, Cursor\n🤖 **Vector Databases** - Pinecone, Weaviate\n🤖 **Prompt Engineering** - LangChain, LlamaIndex\n\n**DevOps & Tools:**\n⚡ **Bun** - Fast JavaScript runtime and package manager\n⚡ **Turbo** - High-performance build system\n⚡ **Docker & Kubernetes** - Containerization at scale\n⚡ **GitHub Actions** - CI/CD automation\n\n**Mobile Development:**\n📱 **React Native** - Cross-platform mobile apps\n📱 **Flutter** - Google's UI toolkit\n📱 **Expo** - React Native development platform\n\n**Emerging Areas:**\n🌟 **WebAssembly (WASM)** - High-performance web applications\n🌟 **Web3 & Blockchain** - Decentralized applications\n🌟 **IoT Development** - Internet of Things applications\n🌟 **Quantum Computing** - Future of computation",
        sources: [
          { title: "State of JS Survey 2024", url: "https://stateofjs.com/" },
          { title: "GitHub Octoverse Report", url: "https://github.blog/2024-01-08-the-state-of-open-source-and-rise-of-ai/" },
          { title: "Stack Overflow Developer Survey", url: "https://stackoverflow.com/insights/survey/2024" }
        ]
      };
    }

    // Technical interview preparation
    if (input.includes('interview') && (input.includes('technical') || input.includes('prepare'))) {
      return {
        text: "Here's a comprehensive guide to technical interview preparation:\n\n**📋 Interview Preparation Roadmap:**\n\n**1. Data Structures & Algorithms (4-6 weeks)**\n• Arrays, Linked Lists, Stacks, Queues\n• Trees, Graphs, Heaps\n• Sorting and Searching algorithms\n• Dynamic Programming basics\n• Time and Space complexity analysis\n\n**2. System Design (2-3 weeks)**\n• Scalability principles\n• Database design (SQL vs NoSQL)\n• Caching strategies (Redis, Memcached)\n• Load balancing and microservices\n• API design best practices\n\n**3. Programming Language Deep Dive**\n• Master your primary language (JavaScript, Python, Java)\n• Understand language-specific concepts\n• Practice coding without IDE assistance\n• Learn debugging techniques\n\n**4. Frontend-Specific Topics**\n• DOM manipulation and Event handling\n• Async JavaScript (Promises, async/await)\n• React/Vue/Angular framework concepts\n• CSS layout techniques (Flexbox, Grid)\n• Web performance optimization\n• Browser networking and security\n\n**📚 Study Resources:**\n• **Coding Practice:** LeetCode, HackerRank, CodeSignal\n• **System Design:** Educative.io, Grokking the System Design\n• **Mock Interviews:** Pramp, InterviewBit\n• **Books:** Cracking the Coding Interview, System Design Interview\n\n**🎯 Interview Day Tips:**\n• Think out loud during problem-solving\n• Ask clarifying questions\n• Start with brute force, then optimize\n• Test your code with examples\n• Discuss trade-offs and alternatives\n• Be honest about what you don't know\n\n**⏰ Timeline:**\n• **8-12 weeks** for comprehensive preparation\n• **Daily practice:** 2-3 coding problems\n• **Weekly:** 1-2 system design problems\n• **Mock interviews:** 2-3 per week in final month",
        sources: [
          { title: "Technical Interview Preparation Guide", url: "https://www.techinterviewhandbook.org/" },
          { title: "LeetCode Study Plans", url: "https://leetcode.com/study-plan/" },
          { title: "System Design Interview Guide", url: "https://github.com/donnemartin/system-design-primer" }
        ]
      };
    }

    // Salary negotiation
    if (input.includes('salary') && input.includes('negotiat')) {
      return {
        text: "Here's a strategic guide to salary negotiation:\n\n**🔍 Research Phase:**\n• Use Glassdoor, PayScale, Levels.fyi for salary data\n• Research company-specific compensation\n• Consider total compensation (base + equity + benefits)\n• Know your market value in current location\n\n**💼 Preparation Strategy:**\n• Document your achievements and impact\n• Quantify your contributions with metrics\n• Prepare specific examples of value delivered\n• Research the company's financial health\n• Have a clear range in mind (minimum to ideal)\n\n**🗣️ Negotiation Tactics:**\n\n**Do:**\n• Wait for the offer before discussing salary\n• Express enthusiasm for the role first\n• Use data to support your request\n• Negotiate the entire package, not just base salary\n• Be professional and collaborative\n• Give them time to consider your counter-offer\n\n**Don't:**\n• Accept the first offer immediately\n• Lie about other offers or current salary\n• Make ultimatums or threats\n• Negotiate over email for complex discussions\n• Focus only on salary (ignore equity, PTO, etc.)\n\n**📝 Sample Scripts:**\n\n**Initial Response:**\n\"Thank you for the offer! I'm excited about the opportunity. I'd like to take some time to review the complete package. Could we schedule a call to discuss the details?\"\n\n**Counter-Offer:**\n\"Based on my research and experience, I was hoping for a salary in the range of $X-Y. Given my expertise in [specific skills] and track record of [achievements], I believe this reflects my potential contribution to the team.\"\n\n**🎯 Beyond Base Salary:**\n• Equity/Stock options\n• Signing bonus\n• Annual bonus structure\n• Additional PTO days\n• Professional development budget\n• Remote work flexibility\n• Health benefits upgrade\n\n**⚠️ Red Flags:**\n• Pressure to accept immediately\n• Unwillingness to negotiate at all\n• Significant below-market offers\n• Vague equity details\n\n**📊 Negotiation Success Factors:**\n• 85% of people who negotiate get some increase\n• Average increase: 7-10% of initial offer\n• Best time to negotiate: When you have leverage (multiple offers)\n• Junior roles: Focus on learning opportunities\n• Senior roles: Focus on equity and leadership scope",
        sources: [
          { title: "Salary Negotiation Guide - Harvard Business Review", url: "https://hbr.org/2021/06/salary-negotiation-guide" },
          { title: "Levels.fyi Compensation Data", url: "https://www.levels.fyi/" },
          { title: "Glassdoor Salary Calculator", url: "https://www.glassdoor.com/Salaries/" }
        ]
      };
    }

    // Default intelligent response
    return {
      text: "I'd be happy to help you with that! As your AI Career Assistant, I can provide detailed guidance on a wide range of topics including:\n\n🚀 **Career Development:**\n• Job search strategies and company research\n• Resume and cover letter optimization\n• Interview preparation and salary negotiation\n• Career transition planning\n\n💻 **Technical Knowledge:**\n• Programming languages and frameworks\n• Software development best practices\n• Technology trends and comparisons\n• System design and architecture\n\n📚 **Learning & Growth:**\n• Skill development roadmaps\n• Course and certification recommendations\n• Industry insights and market analysis\n• Networking and personal branding\n\nCould you be more specific about what you'd like to know? I'm here to provide detailed, actionable advice tailored to your needs!",
      sources: [
        { title: "Career Development Resources", url: "https://www.linkedin.com/learning/" },
        { title: "Tech Industry Insights", url: "https://stackoverflow.com/insights/" }
      ]
    };
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col h-full max-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Career Assistant</h1>
            <p className="text-gray-600 dark:text-gray-300">Your intelligent career partner for job search, tech guidance, and professional growth</p>
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
          AI Assistant powered by advanced language models • Get career guidance, tech help, and professional insights
        </p>
      </div>
    </div>
  );
};

export default AIAssistant;
