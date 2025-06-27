import {createSlice} from '@reduxjs/toolkit'

const loadFromLocalStorage = JSON.parse(localStorage.getItem('flashcards')) || []

// const SettoLocalStorage = (state) =>{ localStorage.setItem('flashcards',JSON.stringify(state))
// }

const initialState = {
    decks: loadFromLocalStorage
}

const flashcardSlice = createSlice({
    name: "flashcard",
    initialState,
    reducers: {
        addDeck: (state,action) => {
            const newDeck = {
                id: Date.now(),
                title: action.payload,
                cards: []
            }
            state.decks.push(newDeck);
            localStorage.setItem("flashcards",JSON.stringify(state.decks))
            // SettoLocalStorage(state.decks)
        },

        deleteDeck: (state,action) => {
            state.decks = state.decks.filter((d) => d.id !== action.payload)
            localStorage.setItem("flashcards",JSON.stringify(state.decks))
            // SettoLocalStorage(filtered)
        },

        addCard: (state,action) => {
            const {deckId,question,answer} = action.payload
            const deck = state.decks.find(deck => deck.id === deckId)
            if(deck){
                deck.cards.push(
                    {
                    id: Date.now(),
                    question,
                    answer
                    }
                )
            }
            localStorage.setItem("flashcards",JSON.stringify(state.decks))
            // SettoLocalStorage(state)
        },

        deleteCard: (state,action) => {
            const {deckid,cardid} = action.payload
            const deck = state.decks.find((d) => d.id === deckid)
            if(deck){
                deck.cards = deck.cards.filter(card => card.id !== cardid)
            }
            localStorage.setItem("flashcards",JSON.stringify(state.decks))
            // SettoLocalStorage(state)
        }
    }
})

export const {addCard,addDeck,deleteCard,deleteDeck} = flashcardSlice.actions

export default flashcardSlice.reducer