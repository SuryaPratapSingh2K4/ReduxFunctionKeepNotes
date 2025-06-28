import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteCard } from '../store/flashcardSlice';

function flashcardList({deck}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();

    return (
        <div>
            {
                deck.cards.length() === 0 ? (
                    <>
                    <p className="text-gray-500">No flashcards yet.</p>
                    </>
                ) : (
                    deck.cards.map(card => (
                        <div key={card.id}
                        className='bg-gray-100 p-3 rounded flex justify-between items-center'
                        >
                            <div>
                                <p><strong>Q:</strong>{card.question}</p>
                                <p><strong>A:</strong>{card.answer}</p>
                            </div>
                            <button
                            onClick={dispatch(deleteCard({deckid: deck.id, cardid: card.id}))}
                            className='text-red-500 hover:underline'>
                                Delete
                            </button>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default flashcardList
