import BookMarkForm from "./components/BookMarkForm"
import BookMarkList from "./components/BookMarkList"

function App() {

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-indigo-600 text-white p-6 shadow">
        <h1 className="text-3xl font-bold text-center">🔖 Bookmark Manager</h1>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-10">
        <BookMarkForm/>
        <BookMarkList/>
      </main>
    </div>
  )
}

export default App
