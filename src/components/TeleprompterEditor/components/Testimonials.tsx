import React from 'react';
import { Star, MessageCircle, ThumbsUp } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "יוסי כהן",
    role: "מנחה טלוויזיה",
    content: "הכלי הזה שינה את חיי המקצועיים. הממשק נוח והתכונות מדהימות!",
    rating: 5
  },
  {
    id: 2,
    name: "רחל לוי",
    role: "קריינית",
    content: "השימוש בפרומפטר פרו הפך את העבודה שלי לקלה הרבה יותר. ממליצה בחום!",
    rating: 5
  },
  {
    id: 3,
    name: "דוד ישראלי",
    role: "מרצה",
    content: "תוכנה מצוינת עם תמיכה בעברית. בדיוק מה שחיפשתי!",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">מה המשתמשים אומרים</h2>
          <p className="text-gray-400">אלפי משתמשים כבר נהנים מהכלי שלנו</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">{testimonial.content}</p>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
                <MessageCircle className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="btn-primary mx-auto">
            <ThumbsUp className="w-5 h-5" />
            <span>הוסף משוב</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;