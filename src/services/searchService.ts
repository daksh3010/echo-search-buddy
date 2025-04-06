
import { SearchResult } from "@/components/SearchResults";

// This is a mock service to simulate internet search results
// In a real application, you would replace this with actual API calls

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function searchInternet(query: string): Promise<SearchResult[]> {
  console.log(`Searching for: ${query}`);
  
  // Simulate network delay
  await delay(Math.random() * 1000 + 1000);
  
  // Normalize query
  const normalizedQuery = query.toLowerCase().trim();
  
  // Define some mock results for different types of queries
  
  // Weather related queries
  if (normalizedQuery.includes('weather') || normalizedQuery.includes('temperature') || normalizedQuery.includes('forecast')) {
    return [
      {
        title: 'Current Weather',
        content: 'Currently 72°F (22°C) with partly cloudy skies. Humidity at 45% with a gentle breeze from the northwest.',
        type: 'knowledge'
      },
      {
        title: 'Weather Forecast',
        content: 'Tomorrow: Sunny with a high of 75°F (24°C). The week ahead looks clear with temperatures gradually rising to 80°F by Friday.',
        type: 'knowledge'
      }
    ];
  }
  
  // Time related queries
  if (normalizedQuery.includes('time') || normalizedQuery.includes('date') || normalizedQuery.includes('day')) {
    const now = new Date();
    return [
      {
        title: 'Current Time & Date',
        content: `It is currently ${now.toLocaleTimeString()} on ${now.toLocaleDateString()} (${now.toLocaleDateString(undefined, { weekday: 'long' })}).`,
        type: 'knowledge'
      }
    ];
  }
  
  // Definition queries
  if (normalizedQuery.includes('what is') || normalizedQuery.includes('definition of') || normalizedQuery.includes('define')) {
    let term = normalizedQuery;
    
    if (normalizedQuery.includes('what is')) {
      term = normalizedQuery.split('what is ')[1];
    } else if (normalizedQuery.includes('definition of')) {
      term = normalizedQuery.split('definition of ')[1];
    } else if (normalizedQuery.includes('define')) {
      term = normalizedQuery.split('define ')[1];
    }
    
    // AI assistant definition
    if (term.includes('ai') || term.includes('artificial intelligence')) {
      return [
        {
          title: 'Artificial Intelligence (AI)',
          content: 'Artificial Intelligence refers to computer systems designed to perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and translation between languages.',
          type: 'definition',
          url: 'https://en.wikipedia.org/wiki/Artificial_intelligence'
        },
        {
          title: 'AI Applications',
          content: 'AI is used in many fields including voice assistants (like Siri and Alexa), recommendation systems, autonomous vehicles, medical diagnosis, and more.',
          type: 'knowledge'
        }
      ];
    }
    
    // Generic definition response
    return [
      {
        title: `Definition of "${term}"`,
        content: `I found some information about "${term}", but please note this is simulated data for demonstration purposes.`,
        type: 'definition'
      }
    ];
  }
  
  // For any other queries, return generic information
  return [
    {
      title: 'Search Results',
      content: `I found some information about "${query}", but please note this is simulated data for demonstration purposes.`,
      type: 'knowledge'
    },
    {
      title: 'How This Works',
      content: 'This is a demo application that simulates voice search and internet browsing. In a production environment, this would connect to real search engines or AI APIs to retrieve accurate information.',
      type: 'text'
    },
    {
      title: 'Try Example Queries',
      content: 'Try asking about the weather, current time, or "What is artificial intelligence?" to see different types of responses.',
      type: 'text'
    }
  ];
}
