import React, {useState}from 'react'
import {useDispatch} from 'react-redux'
import { addCard } from '../store/flashcardSlice';

function Flashcardform({deckId}) {
    const [question,setQuestion] = useState("");
    const [answer,setAnswer] = useState("");
    const dispatch = useDispatch();
    const HandleSubmit = (e) => {
        e.preventdefault()
        if(question.trim() && answer.trim()){
            dispatch(addCard({
            deckId,
            question,
            answer,
            
        }))
        setAnswer("")
        setQuestion("")
        }
    }
    return (
    <form onSubmit={HandleSubmit} className='mt-4 grid grid-cols-1 sm:grid-cols gap-2'>
        <input type="text"
        placeholder='question'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className='p-2 border rounded col-span-1 sm:col-span-1'
        />
        <input type="text"
        placeholder='answer'
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className='p-2 border rounded col-span-1 sm:col-span-1'
        />
        <button 
        className='bg-green-500 text-white rounded px-4 py-2'
        >Add Card</button>
    </form>
    )
}

export default Flashcardform
