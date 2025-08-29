import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { serverLocalhostPort } from '../../../server/config';
import BackTo from '../components/BackTo';
import Loader from '../components/Loader';

function Delete() {
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();

    const handleDelete = () => {
        setLoading(true);
        fetch(`http://localhost:${serverLocalhostPort}/blood-donations/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify()
        }).then(() => {
            console.log('Blood donation record deleted successfully');
            navigate('/');
            setLoading(false);
        }).catch((error) => {
            console.log('Error deleting blood donation record:', error);
            setLoading(false);
        })
    }

    return (
        <div className='p-4 pt-[120px]'>
            <BackTo/>
            <h1 className='text-xl md:text-2xl md:text-center font-bold mt-20 italic'>This action cannot be undone. If you press the button below the document will be permanently deleted.</h1>

            {loading ? <Loader/> : ''}

            <div className='flex flex-col items-center p-2 w-full max-w-650px mx-auto'>
                <p className='text-2xl md:text-3xl'>You sure you wanna delete this blood donation record?</p>
                <button onClick={handleDelete} className='bg-red-600 text-white p-2 rounded-lg mt-4 hover:bg-red-800'>
                    Yes Permanently Delete
                </button>
            </div>

        </div>
    )
}

export default Delete
