
import { useState, useEffect, useRef } from "react";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface VoiceButtonProps {
  onTranscription: (text: string) => void;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
}

const VoiceButton = ({ onTranscription, isListening, setIsListening }: VoiceButtonProps) => {
  const { toast } = useToast();
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in this browser. Please try Chrome, Edge, or Safari.",
        variant: "destructive"
      });
      return;
    }

    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscription(transcript);
      setIsListening(false);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      toast({
        title: "Recognition Error",
        description: `Error: ${event.error}. Please try again.`,
        variant: "destructive"
      });
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onTranscription, setIsListening, toast]);

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.start();
          setIsListening(true);
        }
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        toast({
          title: "Failed to Start",
          description: "Could not start voice recognition. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Pulsing circle animation when listening */}
      {isListening && (
        <div className="absolute w-full h-full rounded-full bg-assistant-primary/30 animate-pulse-ring" />
      )}
      <button
        onClick={toggleListening}
        className={cn(
          "relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
          isListening 
            ? "bg-assistant-accent text-white scale-110" 
            : "bg-assistant-primary text-white hover:bg-assistant-primary/90"
        )}
        aria-label={isListening ? "Stop listening" : "Start listening"}
      >
        <Mic size={30} className={cn(
          "transition-transform duration-300",
          isListening && "animate-pulse"
        )} />
      </button>
    </div>
  );
};

export default VoiceButton;

// Add TypeScript definition for SpeechRecognition since it may not be in the default types
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
