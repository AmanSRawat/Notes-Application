import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Trash } from 'lucide-react';
import { Pencil } from 'lucide-react';

const HomePage = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/routes') 
        setNotes(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  const handleDelete = async (id)=>{
    try{
      await axios.delete(`http://localhost:3000/api/routes/${id}`)
      setNotes(notes.filter(note => note._id != id))
      alert('Note Deleted Successfully!');
    }catch(error){
        setError(error)
    }
  }

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
          <div key={note._id} className='bg-gray-800 text-white p-4 rounded-lg shadow  transition'>
            <Link to={`/note/${note._id}`}   className='block'>
              <h2 className='text-xl font-bold mb-2'>{note.title}</h2>
              <p className='text-sm text-gray-300'>{note.content.slice(0, 100)}...</p>
              <p className='text-sm, text-gray-300'>{new Date(note.createdAt).toLocaleString()}</p>
            </Link>
            <div className='flex justify-end mt-4'>
                <button 
                  className='ml-2 p-2 rounded-full hover:bg-red-500 cursor-pointer focus:outline-none'
                  onClick={(e)=>{
                    e.preventDefault()
                    handleDelete(note._id)
                  }}
                >
                  <Trash className='w-6 h-6'/>
                </button>
                <Link
                  to={`/edit/${note._id}`}
                  className='ml-2 p-2 rounded-full hover:bg-green-500 cursor-pointer focus:outline-none'
                  title='Edit Note'
                >
                  <Pencil className='w-6 h-6'/>
                </Link>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default HomePage
