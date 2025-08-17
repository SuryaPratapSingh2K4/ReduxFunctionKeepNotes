import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../store/postsSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PostList() {
    const posts = useSelector((state) => state.post.posts || []);
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">All Blog Posts</h2>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by title..."
                className="border p-2 rounded w-full mb-6"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* No Blogs Message */}
            {filteredPosts.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded shadow">
                    <p className="text-lg text-gray-600 mb-4">
                        🚫 No blogs found. Create one to get started!
                    </p>
                    <Link to="/create">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                            + Create Blog
                        </button>
                    </Link>
                </div>
            ) : (
                /* Blog List */
                <div className="space-y-6">
                    {filteredPosts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                        >
                            <h3 className="font-bold text-xl text-gray-800">{post.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">by {post.author}</p>

                            {post.image && (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="my-3 rounded-md w-full h-48 object-cover"
                                />
                            )}

                            <p className="text-gray-700">
                                {post.content.length > 120
                                    ? post.content.slice(0, 120) + "..."
                                    : post.content}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-4">
                                <Link to={`/posts/${post.id}`}>
                                    <button className="px-3 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
                                        View
                                    </button>
                                </Link>
                                <Link to={`/edit/${post.id}`}>
                                    <button className="px-3 py-2 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600">
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    onClick={() => dispatch(deletePost(post.id))}
                                    className="px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
