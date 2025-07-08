import { NavLink, Outlet } from "react-router-dom"

function App() {
  const navClass = ({ isActive }) =>
    isActive
      ? 'font-bold border-black-600 text-black-600'
      : 'text-gray-700 hover:text-black'
    ;
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex gap-6">
        {/* <NavLink to='/' className={navClass}>Group</NavLink> */}
        <NavLink to='/group' className={navClass}>GroupList</NavLink>
      </nav>
      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Trip Expense Tracker</h1>
        <Outlet/>
      </main>
    </div>
  )
}

export default App
