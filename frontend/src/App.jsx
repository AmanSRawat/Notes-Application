import {Route, Routes} from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import Navbar from './component/Navbar'
import EditPage from './pages/EditPage'

function App() {

  return (
    <div className='relative h-full w-full'>
      <Navbar/>
      <div className='absolute inset-0 -z-10 h-full w-ful items-center px-5 py-24 '>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/create' element={<CreatePage/>} />
          <Route path='/note/:id' element={<NoteDetailPage/>} />
          <Route path='/edit/:id' element={<EditPage/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
