import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

function BackTo() {
    return (
        <div className='flex'>
            <Link to='/'
            className='bg-customRed text-white rounded-full py-2 px-4 text-lg mt-4 hover:bg-red-800'
            >
                <FaArrowLeft className='inline-block mr-2 mb-1' />
                Back
            </Link>
        </div>
    )
}

export default BackTo
