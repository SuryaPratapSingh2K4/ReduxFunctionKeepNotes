    import React, { useState } from 'react';
    import { useDispatch } from 'react-redux';
    // import { addTask } from '../redux/taskSlice';
    import { addTask } from '../store/taskslice';

    export default function TaskForm() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('High');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
        dispatch(addTask({ title, priority }));
        setTitle('');
        setPriority('High');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 mb-6">
        <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />
        <select
            className="border p-2 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
        >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </select>
        <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
            Add Task
        </button>
        </form>
    );
    }
