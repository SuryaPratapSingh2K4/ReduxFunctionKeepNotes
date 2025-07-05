import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../store/postsSlice';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

export default function CreatePost() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

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
        dispatch(addPost({ title, content, image, author }));
        navigate('/posts');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Title"
                className="border p-2 rounded w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Author"
                className="border p-2 rounded w-full"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
            <textarea
                placeholder="Content"
                rows="10"
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
            <button type="submit" className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded">
                Create Post
            </button>
        </form>
    );
}