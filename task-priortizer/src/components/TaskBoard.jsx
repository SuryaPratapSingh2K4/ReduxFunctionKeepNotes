import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { deleteTask } from '../redux/taskSlice';
import { deleteTask } from '../store/taskslice';

export default function TaskBoard() {
  const tasks = useSelector((state) =>
    // Array.isArray(state.task?.tasks) ? state.task.tasks : []
  state.task.tasks
  );
  const dispatch = useDispatch();

  const priorities = ['High', 'Medium', 'Low'];
  const colors = {
    High: 'bg-red-100 border-red-500',
    Medium: 'bg-yellow-100 border-yellow-500',
    Low: 'bg-green-100 border-green-500',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {priorities.map((priority) => (
        <div key={priority} className="p-4 bg-gray-50 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">{priority} Priority</h2>
          {tasks
            .filter((task) => task.priority === priority)
            .map((task) => (
              <div
                key={task.id}
                className={`mb-3 p-3 border-l-4 rounded ${colors[task.priority]}`}
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{task.title}</p>
                  <button
                    onClick={() => dispatch(deleteTask(task.id))}
                    className="text-red-600 hover:underline text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}