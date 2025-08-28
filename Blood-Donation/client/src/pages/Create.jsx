import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { serverLocalhostPort } from '../../../server/config';
import BackTo from '../components/BackTo';
import Loader from '../components/Loader';

function Create() {

    const [month, setMonth] = useState('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAdd = () => {
        const data = {
            month,
            location,
            notes,
        }
        setLoading(true);
        fetch(`http://localhost:${serverLocalhostPort}/blood-donations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.data)
            .then((data) => {
                console.log('Donation has been successfully added', data);
                setLoading(false);
                navigate('/');
            }).catch((error) => {
                console.error('Error adding donation:', error);
                setLoading(false);
            })
    }

    return (
        <div className='p-4 pt-[150px]'>
            <BackTo />
            <h1 className='text-2xl md:text-3xl text-center
            my-5 font-bold'>
                Register New Blood Donation
            </h1>

            {loading ? <Loader /> : ''}

            <div className='flex flex-col w-full md:max-w-[50%] p-4 mx-auto'>
                <div className=''>
                    <label className='text-xl text-gray-500 '>Month/Year</label>
                    <input type="text"
                        placeholder='In what month did you do this blood donation?'
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full mt-2 rounded-lg'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl text-gray-500'>Location</label>
                    <input type="text"
                        placeholder='Where was this blood donation made?'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full mt-2 rounded-lg'
                    />
                </div>
                <div className=''>
                    <label className='text-xl text-gray-500'>Notes</label>
                    <textarea
                        rows={4}
                        placeholder='Register any notes about this blood donation'
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full mt-2 rounded-lg row-span-4'
                    />
                </div>
                <button onClick={handleAdd} className='bg-customRed rounded-lg py-3 my-6 text-white'>
                    Update Details
                </button>
            </div>
        </div>
    )
}

export default Create
