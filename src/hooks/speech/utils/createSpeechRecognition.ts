interface SpeechRecognitionOptions {
  language: string;
  continuous?: boolean;
  interimResults?: boolean;
}

export function createSpeechRecognition({
  language,
  continuous = true,
  interimResults = true
}: SpeechRecognitionOptions): SpeechRecognition | null {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = language;
  recognition.continuous = continuous;
  recognition.interimResults = interimResults;

  return recognition;
}