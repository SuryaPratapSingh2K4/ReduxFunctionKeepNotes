import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PostDetails() {
    const { id } = useParams();
    const post = useSelector((state) => state.post.posts.find(p => p.id === parseInt(id)));

    if (!post) return <p>Post not found.</p>;

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-600 mb-2">By {post.author}</p>
            {post.image && <img src={post.image} alt="" className="my-2 rounded" />}
            <p>{post.content}</p>
            <Link to="/posts" className="text-blue-600 mt-4 inline-block">← Back to Posts</Link>
        </div>
    );
}