import React, { useState } from 'react';
import { Star, Send, X } from 'lucide-react';
import { Feedback } from '../../../../types';

interface FeedbackFormProps {
  onSubmit: (feedback: Feedback) => void;
  onClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, onClose }) => {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: Date.now(),
      name,
      role,
      content,
      rating,
      date: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-4">הוסף משוב</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">דירוג</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="text-yellow-400 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      value <= rating ? 'fill-current' : 'fill-none'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">שם</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
              placeholder="השם שלך"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">תפקיד</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
              placeholder="התפקיד שלך"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">המשוב שלך</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 min-h-[100px]"
              placeholder="כתוב את המשוב שלך כאן..."
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary justify-center"
          >
            <Send className="w-4 h-4" />
            <span>שלח משוב</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;