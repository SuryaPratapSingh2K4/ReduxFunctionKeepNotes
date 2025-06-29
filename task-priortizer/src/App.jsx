import React from 'react';
import TaskBoard from './components/TaskBoard';
import TaskForm from './components/TaskForm';
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-center mb-6">Task Prioritizer Board</h1>
        <TaskForm />
        <TaskBoard />
      </div>
    </div>
  );
}