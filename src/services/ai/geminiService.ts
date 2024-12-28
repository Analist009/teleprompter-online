import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export interface TextImprovementOptions {
  style: 'professional' | 'informative' | 'casual' | 'technical';
  industry: string;
  tone: 'formal' | 'friendly' | 'authoritative';
  length: 'concise' | 'detailed';
}

export async function improveText(text: string, options: TextImprovementOptions) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    שפר את הטקסט הבא בעברית. שמור על המשמעות המקורית אך שפר את הניסוח והבהירות.
    
    סגנון: ${getHebrewStyle(options.style)}
    תחום: ${getHebrewIndustry(options.industry)}
    טון: ${getHebrewTone(options.tone)}
    אורך: ${getHebrewLength(options.length)}
    
    טקסט מקורי:
    ${text}
    
    הנחיות:
    - שפר את הניסוח והקריאות
    - שמור על שפה תקנית
    - הוסף פיסוק נכון
    - וודא שהטקסט ברור ומובן
    - שמור על סגנון מקצועי
    - הימנע מחזרות מיותרות
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('שגיאה בשיפור הטקסט:', error);
    throw new Error('שגיאה בשיפור הטקסט');
  }
}

function getHebrewStyle(style: string): string {
  const styles = {
    professional: 'מקצועי',
    informative: 'אינפורמטיבי',
    casual: 'יומיומי',
    technical: 'טכני'
  };
  return styles[style] || 'מקצועי';
}

function getHebrewIndustry(industry: string): string {
  const industries = {
    general: 'כללי',
    tech: 'טכנולוגיה',
    medical: 'רפואה',
    legal: 'משפטים',
    education: 'חינוך'
  };
  return industries[industry] || 'כללי';
}

function getHebrewTone(tone: string): string {
  const tones = {
    formal: 'פורמלי',
    friendly: 'ידידותי',
    authoritative: 'סמכותי'
  };
  return tones[tone] || 'פורמלי';
}

function getHebrewLength(length: string): string {
  const lengths = {
    concise: 'תמציתי',
    detailed: 'מפורט'
  };
  return lengths[length] || 'מפורט';
}