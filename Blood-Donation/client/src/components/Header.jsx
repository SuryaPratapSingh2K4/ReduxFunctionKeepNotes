import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className='bg-customRed text-white p-6 fixed w-full z-10 h-auto'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-center w-full max-w-full mx-auto'>
                <Link to='/'>
                    <p className='font-bold text-2xl'>Give Blood today
                        <span className='hidden md:inline-block ml-2'>🫵</span>
                    </p>
                </Link>

                <p className='font-bold text-2xl'>
                    Donate Life tomorrow
                    <span className='hidden md:inline-block'>👍</span>
                </p>
            </div>
        </header>
    )
}

export default Header
