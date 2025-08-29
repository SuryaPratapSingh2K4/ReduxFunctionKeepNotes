import React from 'react'
import { AiOutlineCalendar, AiOutlineClear, AiOutlineClose } from 'react-icons/ai'
import { FaHospitalUser } from 'react-icons/fa'

function Modal({donation, onClose}) {
    return (
        <div className='fixed bg-black bg-opacity-60 top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center'>
            <div
            onClick={(e) => e.stopPropagation()}
            className='w-[600px] max-w-full h-auto bg-white rounded-xl p-6 flex flex-col relative'>
                <AiOutlineClose className='absolute right-6 top-6 text-3xl text-customRed cursor-pointer'
                onClick={onClose}
                />
                <h2 className='text-gray-600 font-bold'>Donation ID: <span className='font-normal mt-2'> {donation._id}</span></h2>
                <div className='flex justify-start items-center gap-x-2'>
                    <AiOutlineCalendar className='text-red-300 text-2xl'/>
                    <h2 className='my-1'>{donation.month}</h2>
                </div>
                <div className='flex justify-start items-center gap-x-2'>
                    <FaHospitalUser className='text-red-300 text-2xl'/>
                    <h2 className='my-1'>{donation.location}</h2>
                </div>
                <div className='mt-4 flex flex-col'>
                    <label className='text-gray-600 font-bold'>Notes:</label>
                    {donation.notes}
                </div>
            </div>
        </div>
    )
}

export default Modal
