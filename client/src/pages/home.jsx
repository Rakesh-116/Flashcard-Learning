import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from "../components/Flashcard";

const Home = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flashcards');
        setFlashcards(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
        setError('Failed to load flashcards');
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, []);

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="p-4 w-full min-h-screen bg-container1">
      <h1 className="text-2xl font-bold mb-4 text-center text-white pb-20">Welcome to the Flashcard App!</h1>
      <div className="flex flex-col justify-center items-center">
        {currentFlashcard && (
          <Flashcard
            flashcard={currentFlashcard}
            showAnswer={showAnswer}
            setShowAnswer={setShowAnswer}
          />
        )}
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevious}
            className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
