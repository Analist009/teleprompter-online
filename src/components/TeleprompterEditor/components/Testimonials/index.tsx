import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { Testimonial, Feedback } from '../../../../types';
import TestimonialCard from './TestimonialCard';
import FeedbackForm from './FeedbackForm';
import { useTestimonials } from '../../hooks/useTestimonials';

const Testimonials: React.FC = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const { testimonials, addTestimonial } = useTestimonials();

  const handleFeedbackSubmit = (feedback: Feedback) => {
    addTestimonial(feedback);
  };

  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">מה המשתמשים אומרים</h2>
          <p className="text-gray-400">אלפי משתמשים כבר נהנים מהכלי שלנו</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button 
            className="btn-primary mx-auto"
            onClick={() => setShowFeedbackForm(true)}
          >
            <ThumbsUp className="w-5 h-5" />
            <span>הוסף משוב</span>
          </button>
        </div>

        {showFeedbackForm && (
          <FeedbackForm
            onSubmit={handleFeedbackSubmit}
            onClose={() => setShowFeedbackForm(false)}
          />
        )}
      </div>
    </section>
  );
};

export default Testimonials;