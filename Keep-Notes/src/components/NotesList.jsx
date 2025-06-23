import React from 'react'
import { useSelector } from 'react-redux'

function NotesList() {
    const notes = useSelector((state) => state.notes)
    return (
        <div>
            {Array.isArray(notes) && notes.map((note) => (
                <NoteCard key={note.id} note={note} />
            ))}
        </div>
    )
}

export default NotesList
