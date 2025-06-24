import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editBookmark,deleteBookmark } from '../store/BookSlice';

export default function BookmarkList() {
  const bookmarks = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();

  // Track which bookmark is being edited
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', url: '', category: '' });

  const startEditing = (bm) => {
    setEditingId(bm.id);
    setEditData({
      title: bm.title,
      url: bm.url,
      category: bm.category || '',
    });
  };

  const handleSave = (id) => {
    dispatch(editBookmark({ id, ...editData }));
    setEditingId(null);
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookmarks.length === 0 && (
        <p className="col-span-full text-center text-gray-500">No bookmarks added yet.</p>
      )}
      {bookmarks.map((bm) => (
        <div key={bm.id} className="bg-white shadow p-4 rounded-lg border relative">
          {editingId === bm.id ? (
            <>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="w-full border rounded p-2 mb-2"
              />
              <input
                type="url"
                value={editData.url}
                onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                className="w-full border rounded p-2 mb-2"
              />
              <input
                type="text"
                value={editData.category}
                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                className="w-full border rounded p-2 mb-2"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleSave(bm.id)}
                  className="text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-gray-500 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold mb-1">{bm.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{bm.category || 'Uncategorized'}</p>
              <a
                href={bm.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all text-sm"
              >
                {bm.url}
              </a>
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => startEditing(bm)}
                  className="text-indigo-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteBookmark(bm.id))}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
