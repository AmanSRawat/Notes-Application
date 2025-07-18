import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/routes') // <-- Update with your actual backend URL
        setNotes(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  if (loading) {
    return <div className='text-green-500 text-2xl text-center mt-10'>Loading notes...</div>
  }

  if (error) {
    return <div className='text-red-500 text-2xl text-center mt-10'>Error fetching data: {error.message}</div>
  }

  return (
    <div className='p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {notes.length === 0 ? (
        <p className='text-white text-lg'>No notes found. Click "Create" to add one.</p>
      ) : (
        notes.map((note) => (
          <Link to={`/note/${note._id}`} key={note._id} className='bg-gray-800 text-white p-4 rounded-lg shadow hover:bg-gray-700 transition'>
            <h2 className='text-xl font-bold mb-2'>{note.title}</h2>
            <p className='text-sm text-gray-300'>{note.content.slice(0, 100)}...</p>
          </Link>
        ))
      )}
    </div>
  )
}

export default HomePage
