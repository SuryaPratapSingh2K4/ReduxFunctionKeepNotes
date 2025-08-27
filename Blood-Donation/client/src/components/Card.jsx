import React, { useState } from 'react'
import { truncateString } from '../utils/truncateString';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { FaHospitalUser } from 'react-icons/fa';

function Card({ donation }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='bg-yellow-400 rounded-lg p-5 hover:shadow-xl w-full h-full max-h-[600px] cursor-pointer
        ' onClick={() => { setShowModal(true) }}>
            <div className='flex justify-between items-center py-4'>
                <Link to={`/blood-donations/edit/${donation._id}`}>
                    <AiOutlineEdit className='text-2xl text-black hover:text-white' />
                </Link>

                <Link to={`/blood-donations/delete/${donation._id}`}>
                    <AiOutlineDelete className='text-2xl text-black hover:text-customRed' />
                </Link>
            </div>

            <h2 className='p-2 bg-customRed text-white rounded-lg font-bold my-6'>
                {donation.month}
            </h2>

            <div className='flex justify-start items-center gap-x-2'>
                <FaHospitalUser className='text-2xl text-customRed hover:text-black' />
                <h2>{donation.location}</h2>
            </div>

            <div className='flex justify-start items-center gap-x-2 mb-4 py-2'>
                <h2 className='font-semibold'>My Notes: <span className='font-normal'>{truncateString(donation.notes)}</span></h2>
            </div>

            <div className=''>
                <p className='text-sm mr-2 my-3 text-gray-500'>
                    Created: <span>{new Date(donation.createdAt).toString()}</span></p>
                <p className='text-sm mr-2 my-3 text-gray-500'>
                    Updated: <span>{new Date(donation.updatedAt).toString()}</span>
                </p>
            </div>

            {
                showModal && (
                    <Modal donation={donation} onClose={() => setShowModal(false)} />
                )
            }

        </div>
    )
}

export default Card
