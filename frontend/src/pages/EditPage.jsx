import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/routes/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        setError('Failed to fetch note');
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/routes/${id}`, { title, content });
      navigate('/'); 
    } catch (err) {
      setError('Failed to update note');
    }
  };

  if (loading) return <div className="text-white text-xl">Loading note...</div>;
  if (error) return <div className="text-red-500 text-xl">{error}</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Content</label>
          <textarea
            rows="5"
            className="w-full p-2 rounded bg-gray-700 text-white resize-none focus:outline-none focus:ring focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold"
        >
          Update Note
        </button>
      </form>
    </div>
  );
};

export default EditPage;
