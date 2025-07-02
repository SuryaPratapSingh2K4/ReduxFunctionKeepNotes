import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { UploadPost } from '../store/postSlice'
import {useNavigate} from 'react-dom'

function CreatePost() {
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const [author,setAuthor] = useState("")
    const [image,setImage] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventdefault();
        if(title && author && content){
            dispatch(UploadPost({
                title,
                author,
                content,
                image
            })),
            navigate('/posts');
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result)
        if(file) {
            reader.readAsDataURL(file)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded shadow'>
            <h2 className='text-xl font-bold'>Create New Post</h2>
            <input type="text"
            placeholder='Post Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full p-4 border rounded'
            />
            <input type="text"
            placeholder='Author Name'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='w-full p-4 border rounded'
            />
            <input type="text"
            placeholder='Write your content here'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='w-full p-4 border rounded'
            />
            <input type="file"
            accept='image/*'
            onChange={handleImageUpload}
            className='block'
            />
            <button
            type='submit'
            className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800'
            >Publish Post</button>
        </form>
    )
}

export default CreatePost
