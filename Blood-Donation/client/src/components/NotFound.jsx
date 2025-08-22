import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className='text-center py-5 font-bold text-4xl pt-[200px]'>
            <img
                className='w-24 h-24 object-contain mx-auto'
                src='https://static.vecteezy.com/system/resources/previews/019/152/949/non_2x/hand-holding-a-drop-of-blood-world-blood-donor-day-blood-donation-illustration-donor-symbol-blood-donation-symbol-free-png.png' alt='Blood Drop'
            />
            <p className='font-bold text-customRed'>404 Error</p>
            <p>Page Not Found</p>
            <p className='text-lg'>Do not waste more time! Donate Blood Today <span className='hidden md:inline-block'>🙏</span></p>

            <Link to='/'>
                <button className='bg-customRed text-white rounded-full py-2 px-4 text-lg mt-4'>Register Donation</button>
            </Link>
        </div>
    )
}

export default NotFound
