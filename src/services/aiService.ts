
import { getChatCompletion, searchGoogle } from '@/utils/openai';

interface AIResponse {
  text: string;
  sources?: { title: string; url: string }[];
}

export const generateAIResponse = async (userInput: string, chatHistory: Array<{role: string, content: string}> = []): Promise<AIResponse> => {
  try {
    // Prepare the conversation context
    const systemMessage = {
      role: 'system',
      content: `You are an AI Job Assistant that helps users with career guidance, job search, resume building, interview tips, technical questions, and professional development. 

Key guidelines:
- Provide detailed, actionable advice
- Be friendly and professional
- Include specific examples when helpful
- For technical questions, explain concepts clearly
- For career advice, consider current market trends
- Always aim to be helpful and supportive

If you cannot provide a complete answer, acknowledge this and suggest alternative resources.`
    };

    const messages = [
      systemMessage,
      ...chatHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: userInput }
    ];

    // Try to get response from OpenAI
    const aiResponse = await getChatCompletion(messages);
    
    // Generate relevant sources based on the query
    const sources = generateRelevantSources(userInput, aiResponse);
    
    return {
      text: aiResponse,
      sources
    };
  } catch (error) {
    console.error('AI Service Error:', error);
    
    // Fallback to search-based response
    const searchResult = await searchGoogle(userInput);
    
    return {
      text: `I'm having trouble connecting to the AI service right now, but I can help you find relevant information about "${userInput}".\n\n${searchResult.summary}`,
      sources: searchResult.sources
    };
  }
};

const generateRelevantSources = (query: string, response: string): { title: string; url: string }[] => {
  const lowerQuery = query.toLowerCase();
  const sources: { title: string; url: string }[] = [];
  
  // Career and job-related sources
  if (lowerQuery.includes('job') || lowerQuery.includes('career') || lowerQuery.includes('interview')) {
    sources.push(
      { title: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/' },
      { title: 'Indeed Career Guide', url: 'https://www.indeed.com/career-advice' },
      { title: 'Glassdoor Interview Questions', url: 'https://www.glassdoor.com/Interview/' }
    );
  }
  
  // Resume-related sources
  if (lowerQuery.includes('resume') || lowerQuery.includes('cv')) {
    sources.push(
      { title: 'Resume Templates', url: 'https://www.canva.com/resumes/templates/' },
      { title: 'Resume Writing Guide', url: 'https://www.indeed.com/career-advice/resumes-cover-letters' }
    );
  }
  
  // Technical sources
  if (lowerQuery.includes('react') || lowerQuery.includes('javascript') || lowerQuery.includes('programming')) {
    sources.push(
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/' },
      { title: 'Stack Overflow', url: 'https://stackoverflow.com/' },
      { title: 'GitHub', url: 'https://github.com/' }
    );
  }
  
  // Company information
  if (lowerQuery.includes('company') || lowerQuery.includes('companies')) {
    sources.push(
      { title: 'Glassdoor Company Reviews', url: 'https://www.glassdoor.com/Reviews/' },
      { title: 'Crunchbase', url: 'https://www.crunchbase.com/' }
    );
  }
  
  // If no specific sources, add general helpful resources
  if (sources.length === 0) {
    sources.push(
      { title: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning/' },
      { title: 'Coursera', url: 'https://www.coursera.org/' },
      { title: 'FreeCodeCamp', url: 'https://www.freecodecamp.org/' }
    );
  }
  
  return sources.slice(0, 4); // Limit to 4 sources
};
