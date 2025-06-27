import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHabit } from '../store/habitSlice';

export default function HabitForm() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addHabit(title));
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Enter habit name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 rounded">Add</button>
    </form>
  );
}
