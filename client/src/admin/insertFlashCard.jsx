import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Insert = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/flashcards', {
        question,
        answer
      });

      if (response.data.success) {
        setSuccessMessage('Flashcard added successfully!');
        setQuestion('');
        setAnswer('');
        setErrorMessage('');

        navigate('/admin');
      }
    } catch (error) {
      console.error('Error inserting flashcard:', error);
      setErrorMessage('Failed to add flashcard.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Insert New Flashcard</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mt-2 px-1 h-10 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Answer</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="mt-2 px-1 h-10 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Flashcard
        </button>
        {successMessage && (
          <div className="mt-4 text-green-500">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="mt-4 text-red-500">{errorMessage}</div>
        )}
      </form>
    </div>
  );
};

export default Insert;
