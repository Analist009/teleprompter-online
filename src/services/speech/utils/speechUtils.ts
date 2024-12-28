export function createSpeechRecognition(options: {
  language: string;
  continuous: boolean;
  interimResults: boolean;
}): SpeechRecognition | null {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = options.language;
  recognition.continuous = options.continuous;
  recognition.interimResults = options.interimResults;

  return recognition;
}