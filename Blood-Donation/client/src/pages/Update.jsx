import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { serverLocalhostPort } from '../../../server/config';
import BackTo from '../components/BackTo';
import Loader from '../components/Loader';


function Update() {

    const [month, setMonth] = useState('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:${serverLocalhostPort}/blood-donations/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setMonth(data.month);
                setLocation(data.location);
                setNotes(data.notes);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching donation data:', error);
                setLoading(false);
            });
    }, [id]);

    const handleEdit = () => {
        const data = {
            month,
            location,
            notes,
        };
        fetch(`http://localhost:${serverLocalhostPort}/blood-donations/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Donation updated successfully:', data);
                navigate('/');
            })
            .catch((error) => {
                console.error('Error updating donation:', error);
            });
    }

    return (
        <div className='p-4 pt-[120px]'>
            <BackTo />

            <h1 className='text-2xl md:text-3xl text-center
            my-5 font-bold'>Update Blood Donation Details</h1>

            {loading ? <Loader /> : " "}

            <div className='flex flex-col w-full md:max-w-[50%] p-4 mx-auto'>
                <div className=''>
                    <label className='text-xl text-gray-500 '>Month/Year</label>
                    <input type="text"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full mt-2 rounded-lg'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl text-gray-500'>Location</label>
                    <input type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full mt-2 rounded-lg'
                    />
                </div>
                <div className=''>
                    <label className='text-xl text-gray-500'>Notes</label>
                    <textarea
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full mt-2 rounded-lg'
                    />
                </div>
                <button onClick={handleEdit} className='bg-customRed rounded-lg py-3 my-6 text-white'>
                    Update Details
                </button>
            </div>

        </div>
    )
}

export default Update
