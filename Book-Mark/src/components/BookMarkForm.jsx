import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBookmark } from '../store/BookSlice';
// import { v4 as uuidv4 } from 'uuid';
import { nanoid } from '@reduxjs/toolkit';

export default function BookmarkForm() {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !url) return;

    dispatch(addBookmark({ id: nanoid(), title, url, category }));
    setTitle('');
    setUrl('');
    setCategory('');
    };

    return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Bookmark</h2>

        <div className="grid md:grid-cols-3 gap-4">
        <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded w-full text-white"
        />
        <input
            type="url"
            placeholder="https://example.com"
            value={url}
                onChange={(e) => setUrl(e.target.value)}
            className="p-2 border rounded w-full text-white"
        />
        <input
            type="text"
            placeholder="Category (optional)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded w-full text-white"
        />
        </div>

        <button
        type="submit"
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
        Save Bookmark
        </button>
    </form>
    );
}
