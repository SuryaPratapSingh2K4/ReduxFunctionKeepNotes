import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { deleteDeck } from '../store/flashcardSlice';
import Flashcardform from './Flashcardform';

function Decklist() {
    const decks = useSelector((state) => state.flashcard.decks)
    const dispatch = useDispatch();
    return (
        <div>
            {
                decks.map(deck => {
                    <div key={deck.id} className='border p-4 rounded shadow'>
                        <div className='flex justfy-between items-center'>
                            <h2 className='text-xl font-semibold'>
                                {deck.title}
                            </h2>
                            <button
                            onClick={() => dispatch(deleteDeck(deck.id))}
                            className='text-red-500 hover:underline'>
                                Delete
                            </button>
                        </div>
                        <Flashcardform deckId={deck.id}/>
                        <flashcardList deck={deck}/>
                    </div>
                })
            }
        </div>
    )
}

export default Decklist
