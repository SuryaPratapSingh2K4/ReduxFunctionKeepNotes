import React from 'react';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';

export default function App() {
  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Habit Tracker</h1>
      <HabitForm />
      <HabitList />
    </div>
  );
}
