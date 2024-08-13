import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flashcard, setFlashcard] = useState({ question: '', answer: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        const response = await axios.get(`/api/flashcards/${id}`);
        setFlashcard(response.data);
      } catch (error) {
        console.error('Error fetching flashcard:', error);
        setErrorMessage('Failed to load flashcard.');
      }
    };
  
    fetchFlashcard();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/flashcards/${id}`, flashcard);

      if (response.data.success) {
        setSuccessMessage('Flashcard updated successfully!');
        setErrorMessage('');

        navigate('/admin');
      }
    } catch (error) {
      console.error('Error updating flashcard:', error);
      setErrorMessage('Failed to update flashcard.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlashcard(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Update Flashcard</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Question</label>
          <input
            type="text"
            name="question"
            value={flashcard.question}
            onChange={handleChange}
            className="mt-2 px-1 h-10 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Answer</label>
          <input
            type="text"
            name="answer"
            value={flashcard.answer}
            onChange={handleChange}
            className="mt-2 px-1 h-10 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Update Flashcard
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

export default Update;
