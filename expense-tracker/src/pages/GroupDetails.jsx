import React from 'react'
import { useNavigate } from 'react-router-dom'

function GroupDetails() {
    const navigate = useNavigate();

    return (
        <div className='max-w-4xl mx-auto'>
            <button
            onClick={() => navigate('/group')}
            className='text-sm text-gray-300 hover:underline flex items-center mb-4'>
                Back to Groups
            </button>
        </div>
    )
}

export default GroupDetails
