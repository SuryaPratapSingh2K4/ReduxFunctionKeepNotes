import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {useParams} from 'react-dom'
import e from 'express'
import { updatePost } from '../store/postSlice'
import {useNavigate} from 'react-dom'

function EditPost() {
    const [title,setTitle] = useState("")
    const [author,setAuthor] = useState("")
    const [content,setContent] = useState("")
    const [image,setImage] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams();
    const post = useSelector(state => state.post.posts.find(p => p.id === Number(id)))

    const handleSubmit = () => {
        e.preventdefault(),
        dispatch(updatePost({
            id: post.id,
            title,
            author,
            image,
            content
        }))
        navigate('/posts')
    };

    useEffect(() => {
        if(post){
            setTitle(post.title)
            setAuthor(post.author)
            setContent(post.content)
            setImage(post.image || "")
        }
    },[post])

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader;
        reader.onloadend = () => setImage(reader.result)
        if(file){
            return reader.readAsDataURL(file)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded shadow'>
            <h2 className='text-xl font-bold'>Edit Post</h2>
            <input type="text"
            placeholder='Post Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full p-2 border rounded'
            />
            <input type="text"
            placeholder='Author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='w-full p-2 border rounded'
            />
            <input type="text"
            placeholder='Write your content here...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='w-full p-2 border rounded'
            />
            <input type="file"
            onChange={handleImageUpload}
            className='w-full p-2 border rounded'
            />
            <button
            type='submit'
            className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800'
            >Update Post</button>
        </form>
    )
}

export default EditPost
