import React from 'react';
import { useSelector } from 'react-redux';
import HabitItem from './HabitItem';

export default function HabitList() {
  const habits = useSelector((state) => state.habits) || [];

  return (
    <div className="space-y-4">
      {habits.map(habit => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  );
}
