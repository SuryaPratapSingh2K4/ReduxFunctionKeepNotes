import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editPost } from '../store/postsSlice';
import imageCompression from 'browser-image-compression';

export default function EditPost() {
    const { id } = useParams();
    const post = useSelector((state) =>
        state.post.posts.find((p) => p.id === Number(id))
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState(post?.title || '');
    const [author, setAuthor] = useState(post?.author || '');
    const [content, setContent] = useState(post?.content || '');
    const [image, setImage] = useState(post?.image || '');
    const [loading, setLoading] = useState(false);

    if (!post) return <p className="text-center text-red-600">Post not found.</p>;

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);

        const options = {
            maxSizeMB: 0.2,
            maxWidthOrHeight: 800,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            const base64 = await imageCompression.getDataUrlFromFile(compressedFile);
            setImage(base64);
        } catch (err) {
            console.error('Image compression error:', err);
            alert('Image upload failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editPost({ id: post.id, title, content, image, author }));
        navigate('/posts');
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Edit Blog Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    className="border p-2 rounded w-full"
                    value={title}
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="border p-2 rounded w-full"
                    value={author}
                    placeholder="Author"
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <textarea
                    className="border p-2 rounded w-full"
                    rows="8"
                    value={content}
                    placeholder="Content"
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">
                        Change Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="border p-2 rounded w-full"
                    />
                    {loading && <p className="text-blue-500 text-sm">Compressing image...</p>}
                    {image && (
                        <img
                            src={image}
                            alt="Preview"
                            className="rounded w-40 h-28 object-cover border"
                        />
                    )}
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate('/posts')}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
