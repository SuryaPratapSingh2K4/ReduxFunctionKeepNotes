import { NavLink, Outlet } from 'react-router-dom';

export default function App() {
  const navClass = ({ isActive }) =>
      isActive
        ? 'font-bold border-black-600 text-black-600'
        : 'text-gray-700 hover:text-black'
    ;
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex gap-4">
        <NavLink to="/" className={navClass}>Home</NavLink>
        <NavLink to="/posts" className={navClass}>All Posts</NavLink>
        <NavLink to="/create" className={navClass}>Create</NavLink>
      </nav>
      <main className="p-6 max-w-4xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}