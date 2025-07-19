import React from 'react'
import { BadgePlus } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-black p-4 flex justify-between items-center text-white shadow-md'>
      <Link to="/" className='text-2xl font-semibold tracking-wide hover:text-gray-300 transition'>
        NotesApp
      </Link>


      <Link to="/create">
        <button className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition'>
          <BadgePlus size={18} />
          Create
        </button>
      </Link>
    </nav>
  )
}

export default Navbar
