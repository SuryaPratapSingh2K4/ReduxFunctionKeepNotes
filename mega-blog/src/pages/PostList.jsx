import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../store/postSlice';

function PostList() {
    const [search,setSearch] = useState("");
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.post.posts)
    const filterPosts = posts.filter(post => {
        const matchedSearch = post.title.toLowerCase().includes(search.toLowerCase())
        return matchedSearch;
    })

    return (
        <div>
            <div className='flex gap-4 mb-4'>
                <input type="text"
                placeholder='Search posts...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='border p-2 rounded w-full'
                />
            </div>
            {
                filterPosts.length === 0 ? (
                    <p className='text-gray-500'>No posts available</p>
                ) : (
                    <ul className='space-y-4'>
                        {
                            filterPosts.map((post) => {
                                <li key={post.id} className='p-4 bg-white shadow rounded'>
                                    <Link to={`/posts/${post.id}`} className='mt-2 max-h-48 pbjext-cover rounded'>{post.title}
                                    </Link>
                                    <p
                                    className='text-sm text-gray-500'>
                                        By{post.author}
                                    </p>
                                    <p
                                    className='text-gray-600 text-sm mt-1'>
                                        {post.content.slice(0,100)}...
                                    </p>
                                    {
                                        post.image && (
                                            <img src={post.image} alt='cover' className='mt-2 max-h-48 object-cover rounded'/>
                                        )
                                    }
                                    <div className='flex gap-3 mt-2 text-sm'>
                                        <Link to={`/edit/${post.id}`} className='text-blue-500'>Edit</Link>
                                        <button
                                        className='text-red-500'
                                        onClick={dispatch(deletePost(post.id))}
                                        >Delete
                                        </button>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default PostList
