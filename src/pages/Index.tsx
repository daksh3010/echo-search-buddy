
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VoiceButton from "@/components/VoiceButton";
import GoogleLogin from "@/components/GoogleLogin";
import GoogleLogout from "@/components/GoogleLogout";
import SearchResults, { SearchResult } from "@/components/SearchResults";
import { searchInternet } from "@/services/searchService";
import { useAuth } from "@/contexts/AuthContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Mic, Search } from "lucide-react";

const AssistantApp = () => {
  const { user, isAuthenticated } = useAuth();
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  
  const handleTranscription = async (text: string) => {
    setQuery(text);
    setIsSearching(true);
    
    try {
      const results = await searchInternet(text);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([{
        title: "Error",
        content: "Sorry, there was an error processing your request. Please try again.",
        type: "text"
      }]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-assistant-primary text-white">
              <Mic size={20} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Echo Search Buddy</h1>
          </div>
          
          <div>
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img 
                    src={user?.picture} 
                    alt={user?.name} 
                    className="w-8 h-8 rounded-full" 
                  />
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                    {user?.name}
                  </span>
                </div>
                <GoogleLogout />
              </div>
            ) : (
              <GoogleLogin />
            )}
          </div>
        </header>
        
        {isAuthenticated ? (
          <div className="grid gap-6">
            <Card className="overflow-hidden shadow-lg border-0">
              <CardHeader className="bg-white border-b border-gray-100">
                <CardTitle className="text-center text-lg font-medium text-gray-800">
                  {query ? (
                    <div className="flex items-center justify-center gap-2">
                      <Search size={18} />
                      <span>{query}</span>
                    </div>
                  ) : (
                    "Voice Assistant"
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-96">
                <SearchResults 
                  results={searchResults} 
                  isLoading={isSearching} 
                  query={query}
                />
              </CardContent>
            </Card>
            
            <div className="flex justify-center pt-6">
              <VoiceButton 
                onTranscription={handleTranscription} 
                isListening={isListening} 
                setIsListening={setIsListening}
              />
            </div>
            
            {query && (
              <p className="text-center text-sm text-gray-500 mt-2">
                Click the microphone button to ask another question
              </p>
            )}
          </div>
        ) : (
          <Card className="p-8 text-center shadow-lg border-0">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <Search size={36} className="text-assistant-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome to Echo Search Buddy</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Sign in with your Google account to use the voice assistant and search the internet with your voice.
              </p>
              <div className="mt-4">
                <GoogleLogin />
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

const Index = () => (
  <AuthProvider>
    <AssistantApp />
  </AuthProvider>
);

export default Index;
