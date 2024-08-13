import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/admin/Navbar';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('/api/flashcards');
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/flashcards/${id}`);
      setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <div className="p-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {flashcards.map(flashcard => (
            <div key={flashcard.id} className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Q: {flashcard.question}</h3>
              <p className="text-gray-700 mb-4">A: {flashcard.answer}</p>
              <div className="flex space-x-2">
                <Link 
                  to={`/admin/update/${flashcard.id}`} 
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  Update
                </Link>
                <button 
                  onClick={() => handleDelete(flashcard.id)} 
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
