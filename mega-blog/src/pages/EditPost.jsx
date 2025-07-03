import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editPost } from '../store/postsSlice';
import imageCompression from 'browser-image-compression';

export default function EditPost() {
    const { id } = useParams();
    const post = useSelector((state) => state.post.posts.find(p => p.id === Number(id)));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState(post?.title || '');
    const [author, setAuthor] = useState(post?.author || '');
    const [content, setContent] = useState(post?.content || '');
    const [image, setImage] = useState(post?.image || '');

    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();

    //     reader.onloadend = () => {
    //         setImage(reader.result);
    //     };

    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

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
  }
};

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editPost({ id: post.id, title, content, image, author }));
        navigate('/posts');
    };

    if (!post) return <p>Post not found.</p>;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                className="border p-2 rounded w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                className="border p-2 rounded w-full"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
            <textarea
                className="border p-2 rounded w-full"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border p-2 rounded w-full"
            />
            {image && <img src={image} alt="Preview" className="rounded w-32" />}
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Save Changes
            </button>
        </form>
    );
}
