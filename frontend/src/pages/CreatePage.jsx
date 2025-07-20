import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const CreatePage = () => {
  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')
  const [error,setError] = useState(null)
  const navigate = useNavigate()


  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!title || !content){
      alert('Both fields are required')
      return
    }

    try {
      await axios.post('http://localhost:3000/api/routes',{
        title,
        content,
      })
      alert('Note created successfully!')
      navigate('/')
    } catch (error) {
      console.error(error)
      setError('Error occured while creating note!');
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-900'>
      <form 
        onSubmit={handleSubmit} 
        className=" w-full max-w-md p-6 rounded-xl bg-gray-800 shadow-lg"
      >
        <h2 className="text-white text-2xl font-semibold mb-4 text-center">Create A Note</h2>
        {error && <p className="block text-white mb-1">{error}</p>}
        <div className="mb-4">
          <label className="block text-white mb-1">Title </label>
          <input type="text"  
            placeholder="Enter the title of the node" 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
            <label className="block text-white mb-1">Cotnent</label>
            <textarea type="textarea" placeholder="Enter the content..."
            rows={6}
            value={content}
              onChange={(e)=>setContent(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
          <button
            type="submit"
            className=" w-full py-2 px-4 bg-blue-600 rounded-lg hove:bg-blue-700 transition cursor-pointer"
          >
            Submit
          </button>
      </form>
    </div>
  )
}

export default CreatePage