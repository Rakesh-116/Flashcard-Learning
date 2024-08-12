import React, { useEffect, useState } from 'react';
import "../styles.css";

const Flashcard = ({ flashcard, showAnswer, setShowAnswer }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [flashcard, showAnswer]);

  const handleFlip = () => setFlipped(prevState => !prevState);

  return (
    <div className="relative w-96 h-64 perspective-1000 cursor-pointer" onClick={handleFlip}>
      <div
        className={`absolute w-full h-full transition-transform duration-500 transform ${flipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute w-full h-full bg-green-200 border border-gray-300 rounded-lg shadow-lg p-4 backface-hidden flex flex-col justify-center items-center">
          <div className="text-xl font-semibold mb-4">{flashcard.question}</div>
        </div>
        <div className="absolute w-full h-full bg-blue-200 border border-gray-300 rounded-lg shadow-lg p-4 backface-hidden flex flex-col justify-center items-center transform rotate-y-180">
          <div className="text-lg font-medium text-gray-700 text-center">{flashcard.answer}</div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
