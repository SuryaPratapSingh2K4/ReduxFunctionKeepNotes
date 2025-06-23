import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNotes } from './store/noteSlice';
import NoteCard from './components/NoteCard';
import { v4 } from 'uuid';
import NotesList from './components/NotesList';

function App() {
  const notes = useSelector((state) => state.notes)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('')
  const dispatch = useDispatch();


  const HandleAddNote = () => {
    if (title && content) {
      dispatch(addNotes({ id: v4(), title, content }))
      setTitle('')
      setContent('')
    }
  }


  return (
    <div className='min-h-screen bg-gray-100 px-96 items-center'>
      <h1 className='text-3xl font-bold mb-6 text-center text-black'>📝 My Notes</h1>
      <div className='bg-white shadow-lg rounded p-6 w-full max-w-md mb-6'>
        <input type="text" name="" id="" placeholder='Note-Title'
          className='w-full p-2 mb-2 border rounded'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea name="" id="" rows='4'
          className='w-full p-2 mb-2 border rounded'
          placeholder='Note Content'
          value={content}
          onChange={(e) => { setContent(e.target.value) }}
        />
        <button
          onClick={HandleAddNote}
          className='bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full'
        >Add Note</button>
      </div>

      <div className="flex flex-wrap gap-4 justify-center z-0 relative">
        {Array.isArray(notes) && notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

    </div>
  )
}

export default App
