import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { addDeck } from '../store/flashcardSlice'

function DeckForm() {
    const [deckName, setDeckName] = useState("")
    const dispatch = useDispatch()
    const HandleSubmit = (e) => {
        e.preventdefault();
        if(deckName.trim()){
            dispatch(addDeck(deckName))
            setDeckName("")
        }
    }
    return (
    <form onSubmit={HandleSubmit} className='flex gap-2 mb-4'>
        <input type="text" 
        placeholder='enter new deck name'
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
        className='border p-2 rounded w-full'
        />
        <button className='bg-blue-500 text-white px-4 rounded'>
            Add
        </button>
    </form>
    )
}

export default DeckForm
