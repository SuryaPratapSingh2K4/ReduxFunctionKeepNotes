import React from 'react'
import { useSelector } from 'react-redux'
import {useParams} from 'react-dom'

function PostDetails() {
    const {id} = useParams()
    const post = useSelector((state) => state.post.posts.find((p) => p.id === Number(id)));
    if(!post){
        <p className='text-red-500'>Post Not Found</p>
    }
    return (
        <div className='bg-white p-6 rounded shadow'>
            <h2 className='text-2xl font-bold mb-2'>{post.title}</h2>
            <p className='text-sm text-gray-500 mb-2'>{post.author}</p>
            {post.image && <img src={post.image} alt='cover' className='nb-4 max-h-60 rounded'/>}
            <p className='text-gray-700 whitespace-pre-wrap'>{post.content}</p>
        </div>
    )
}

export default PostDetails
