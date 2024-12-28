import { createSpeechRecognition } from './utils/speechUtils';

export interface SpeechRecognitionOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

export class SpeechRecognitionService {
  private recognition: SpeechRecognition | null = null;
  private lastTranscript = '';

  constructor(private options: SpeechRecognitionOptions = {}) {
    this.recognition = createSpeechRecognition({
      language: options.language || 'he-IL',
      continuous: options.continuous ?? true,
      interimResults: options.interimResults ?? true
    });
  }

  start(callbacks: {
    onResult: (text: string) => void;
    onError: (error: string) => void;
    onStart?: () => void;
    onEnd?: () => void;
  }) {
    if (!this.recognition) {
      callbacks.onError('Speech recognition not supported');
      return;
    }

    this.recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join(' ')
        .trim();

      // Prevent duplicate words
      if (transcript !== this.lastTranscript) {
        this.lastTranscript = transcript;
        callbacks.onResult(transcript);
      }
    };

    this.recognition.onerror = (event) => {
      callbacks.onError(`Speech recognition error: ${event.error}`);
    };

    this.recognition.onstart = () => callbacks.onStart?.();
    this.recognition.onend = () => callbacks.onEnd?.();

    try {
      this.recognition.start();
    } catch (error) {
      callbacks.onError('Failed to start speech recognition');
    }
  }

  stop() {
    this.recognition?.stop();
    this.lastTranscript = '';
  }
}