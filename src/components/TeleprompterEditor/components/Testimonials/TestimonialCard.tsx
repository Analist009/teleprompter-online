import React from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { Testimonial } from '../../../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
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
  );
};

export default TestimonialCard;