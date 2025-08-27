import React from 'react'
import Card from './Card'

function CardGrid({ donations }) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 p-7'>
            {
                donations.map((item) => (
                    <div key={item._id}>
                        <Card donation={item} />
                    </div>
                ))
            }
        </div>
    )
}

export default CardGrid
