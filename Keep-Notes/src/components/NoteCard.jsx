import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteNotes, editNotes } from '../store/noteSlice';

function NoteCard({note}) {
    const [title,setTitle] = useState(note.title);
    const [content,setContent] = useState(note.content);
    const [editing,setEditing] = useState(false);
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(editNotes({id: note.id,title,content}))
        setEditing(false);
    }

    const DeleteNote = () => {
        dispatch(deleteNotes(note.id))
    }

    return (
        <div className='bg-white text-black shadow-md border border-gray-300 rounded-lg p-4 w-[300px] min-h-[150px] z-10'>
            {
                editing ? (
                    <>
                    <input type="text" value={title} className='w-full p-2 border mb-2'
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea name="" id="" rows="4" className='w-full p-2 border mb-2'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <button onClick={handleSave}
                    className='bg-green-600 hover:bg-green-800 text-white px-4 rounded mr-2'
                    >Save
                    </button>
                    <button onClick={() => setEditing(false)}
                    className='text-gray-400 hover:bg-gray-600'    
                    >Cancel
                    </button>
                    </>
                ) : (
                    <>
                    <h2 className='text-xl font-semibold mb-1'>{note.title}</h2>
                    <p className='text-gray-700 mb-3'>{note.content}</p>
                    <button onClick={() => setEditing(true)}
                    className='bg-blue-400 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2'    
                    >Edit</button>
                    <button onClick={DeleteNote}
                    className='bg-red-600 hover:bg-red-800 text-white px-4 py-1 rounded'
                    >Delete</button>
                    </>
                )
            }
        </div>
    )
}

export default NoteCard
