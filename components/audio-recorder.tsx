"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AudioRecorder({
  onRecordingComplete,
}: {
  onRecordingComplete: (blob: Blob) => void;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    // Check if browser supports required APIs
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      setError(
        "Your browser doesn't support audio recording. Please try using a different browser."
      );
    }
  }, []);

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const options = { mimeType: "audio/mp4" };
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/mp4" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        onRecordingComplete(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError(
        "Unable to access the microphone. Please check your browser settings and try again."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const deleteRecording = () => {
    setAudioURL(null);
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {!audioURL ? (
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          variant={isRecording ? "destructive" : "outline"}
          type="button"
          className={`animate-fade-in border-gold-light/30 hover:bg-gold-light/10 font-cormorant text-lg ${
            isRecording
              ? "bg-roseGold-500 hover:bg-roseGold-600 text-white"
              : "text-gold-dark"
          }`}
        >
          {isRecording ? (
            <Square className="h-4 w-4 mr-2" />
          ) : (
            <Mic className="h-4 w-4 mr-2" />
          )}
          {isRecording ? "Stop Recording" : "Record Voice Note"}
        </Button>
      ) : (
        <div className="flex items-center gap-2 animate-fade-in w-full">
          <audio
            src={audioURL}
            controls
            className="flex-1 h-12 [&::-webkit-media-controls-panel]:bg-white/50 [&::-webkit-media-controls-current-time-display]:text-gold-dark [&::-webkit-media-controls-time-remaining-display]:text-gold-dark"
          />
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={deleteRecording}
            className="hover:bg-gold-light/10 text-gold-dark"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
