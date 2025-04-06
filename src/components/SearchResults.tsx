
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

export interface SearchResult {
  title: string;
  content: string;
  url?: string;
  type: 'text' | 'knowledge' | 'link' | 'definition';
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  query: string;
}

const SearchResults = ({ results, isLoading, query }: SearchResultsProps) => {
  if (query === '' && results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
        <Search size={48} className="mb-4 opacity-50" />
        <p className="text-xl font-medium">Ask me anything</p>
        <p className="text-sm mt-2">Click the microphone button and speak your question</p>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-4/5" />
      </div>
    );
  }
  
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
        <p className="text-xl font-medium">No results found</p>
        <p className="text-sm mt-2">Try asking another question</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-4">
        {results.map((result, index) => (
          <Card key={index} className="overflow-hidden animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
            <CardContent className="p-4">
              {result.type === 'knowledge' && (
                <div className="flex items-center gap-2 mb-2 text-assistant-primary">
                  <Search size={16} />
                  <span className="text-xs font-medium">Knowledge</span>
                </div>
              )}
              
              {result.type === 'definition' && (
                <div className="flex items-center gap-2 mb-2 text-assistant-secondary">
                  <Search size={16} />
                  <span className="text-xs font-medium">Definition</span>
                </div>
              )}
              
              <h3 className="font-medium mb-2">{result.title}</h3>
              <p className="text-gray-700 text-sm">{result.content}</p>
              
              {result.url && (
                <a 
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-assistant-primary text-xs mt-2 hover:underline inline-block"
                >
                  Learn more
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default SearchResults;
