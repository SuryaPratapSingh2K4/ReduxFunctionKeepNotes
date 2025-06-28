import './App.css'
import DeckForm from './components/DeckForm'
import Decklist from './components/Decklist'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Flashcard Learning App</h1>
        <DeckForm />
        <Decklist />
      </div>
    </div>
  )
}

export default App
