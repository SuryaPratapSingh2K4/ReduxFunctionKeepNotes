import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../store/postsSlice';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function PostList() {
    const posts = useSelector((state) => state.post.posts || []);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search by title..."
                className="border p-2 rounded w-full mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="space-y-4">
                {filteredPosts.map(post => (
                    <div key={post.id} className="bg-white p-4 rounded shadow">
                        <h3 className="font-bold text-lg">{post.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">by {post.author}</p>
                        {post.image && <img src={post.image} alt="" className="my-2 rounded" />}
                        <p>{post.content.slice(0, 100)}...</p>
                        <div className="flex gap-2 mt-2">
                            <Link to={`/posts/${post.id}`} className="text-blue-600 text-sm">View</Link>
                            <Link to={`/edit/${post.id}`} className="text-yellow-600 text-sm">Edit</Link>
                            <button onClick={() => dispatch(deletePost(post.id))} className="text-red-600 text-sm">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
