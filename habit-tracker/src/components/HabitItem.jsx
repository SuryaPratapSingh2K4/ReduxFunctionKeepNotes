import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleHabitDay, deleteHabit } from '../store/habitSlice';

export default function HabitItem({ habit }) {
  const dispatch = useDispatch();
  const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

  return (
    <div className="border p-4 rounded bg-white shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{habit.title}</h2>
        <button
          onClick={() => dispatch(deleteHabit(habit.id))}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
      <div className="mt-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={habit.completedDays.includes(today)}
            onChange={() => dispatch(toggleHabitDay({ id: habit.id, date: today }))}
          />
          Mark today ({today}) as done
        </label>
      </div>
    </div>
  );
}
