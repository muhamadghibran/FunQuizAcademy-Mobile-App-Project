import { useState, useCallback } from "react";

export const useVoiceInput = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = useCallback(() => {
    setIsListening(true);
    // Simulate listening
    setTimeout(() => {
      setTranscript("Example voice input");
      setIsListening(false);
    }, 2000);
  }, []);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
  };
};
