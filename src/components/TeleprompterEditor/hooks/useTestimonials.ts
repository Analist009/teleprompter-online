import { useState } from 'react';
import { Testimonial } from '../../../types';

const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "יוסי כהן",
    role: "מנחה טלוויזיה",
    content: "הכלי הזה שינה את חיי המקצועיים. הממשק נוח והתכונות מדהימות!",
    rating: 5,
    date: new Date('2024-01-15').toISOString()
  },
  {
    id: 2,
    name: "רחל לוי",
    role: "קריינית",
    content: "השימוש בפרומפטר פרו הפך את העבודה שלי לקלה הרבה יותר. ממליצה בחום!",
    rating: 5,
    date: new Date('2024-01-20').toISOString()
  },
  {
    id: 3,
    name: "דוד ישראלי",
    role: "מרצה",
    content: "תוכנה מצוינת עם תמיכה בעברית. בדיוק מה שחיפשתי!",
    rating: 5,
    date: new Date('2024-02-01').toISOString()
  }
];

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  const addTestimonial = (testimonial: Testimonial) => {
    setTestimonials(prev => [testimonial, ...prev]);
  };

  return {
    testimonials,
    addTestimonial
  };
}