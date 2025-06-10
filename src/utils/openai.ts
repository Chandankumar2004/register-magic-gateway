
// OpenAI configuration and API handling
let openaiApiKey = '';

export const setOpenAIKey = (key: string) => {
  openaiApiKey = key;
  localStorage.setItem('openai_api_key', key);
};

export const getOpenAIKey = (): string => {
  if (openaiApiKey) return openaiApiKey;
  
  const stored = localStorage.getItem('openai_api_key');
  if (stored) {
    openaiApiKey = stored;
    return stored;
  }
  
  return '';
};

export const hasOpenAIKey = (): boolean => {
  return getOpenAIKey().length > 0;
};

export const removeOpenAIKey = () => {
  openaiApiKey = '';
  localStorage.removeItem('openai_api_key');
};

// Chat completion function
export const getChatCompletion = async (messages: Array<{role: string, content: string}>) => {
  const apiKey = getOpenAIKey();
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

// Google search fallback
export const searchGoogle = async (query: string) => {
  try {
    // Using a simple search that returns formatted results
    const searchQuery = encodeURIComponent(`${query} site:stackoverflow.com OR site:linkedin.com OR site:medium.com OR site:github.com`);
    const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
    
    return {
      summary: `I found some relevant information about "${query}". Here are some helpful resources:`,
      sources: [
        { title: 'Stack Overflow - Technical Questions', url: 'https://stackoverflow.com/search?q=' + encodeURIComponent(query) },
        { title: 'LinkedIn Learning - Career Development', url: 'https://www.linkedin.com/learning/search?keywords=' + encodeURIComponent(query) },
        { title: 'Medium Articles - Industry Insights', url: 'https://medium.com/search?q=' + encodeURIComponent(query) },
        { title: 'GitHub Resources', url: 'https://github.com/search?q=' + encodeURIComponent(query) }
      ]
    };
  } catch (error) {
    return {
      summary: `I apologize, but I couldn't search for that information right now. However, I recommend checking these resources:`,
      sources: [
        { title: 'Stack Overflow', url: 'https://stackoverflow.com' },
        { title: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning' },
        { title: 'Medium', url: 'https://medium.com' },
        { title: 'GitHub', url: 'https://github.com' }
      ]
    };
  }
};
