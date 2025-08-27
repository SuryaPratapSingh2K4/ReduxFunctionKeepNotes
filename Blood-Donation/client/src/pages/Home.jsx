import React, { useEffect, useState } from 'react'
import { serverLocalhostPort } from '../../../server/config';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import CardGrid from '../components/CardGrid';

// import axios from 'axios';


function Home() {

    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:${serverLocalhostPort}/blood-donations`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched donations:", data);
                setDonations(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching donations:", error);
                setLoading(false);
            });

    }, [])

    // useEffect(() => {
    //     setLoading(true);
    //     axios.get(`http://localhost:${serverLocalhostPort}/blood-donations`)
    //         .then(response => {
    //             setDonations(response.data.data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching donations:', error);
    //             setLoading(false);
    //         });
    // }, []);

    return (
        <>
            {donations.length > 0 ?
                <div className='w-full pt-[120px] md:pt-[100px] '>
                    {loading ? <Loader /> :
                        <>
                            <div className='bg-gray-200 h-[200px] md:h-[100px] flex flex-col md:flex-row justify-center items-center px-8 mt-1 md:pb-4'>
                                <div className='w-full h-full flex justify-center md:justify-start items-center'>
                                    <p className='text-2xl font-bold'>
                                        Blood Donation so far:
                                        <span className='text-3xl text-customRed'> {donations.length}</span>
                                    </p>
                                </div>

                                <div className='w-full h-full flex justify-center items-center md:justify-end'>
                                    <Link to='/blood-donations/create'>
                                        <button className='bg-customRed text-white rounded-full py-2 px-4 font-bold flex items-center justify-center mt-2'>
                                            <span className='text-2xl mb-1'>👉</span>
                                            <span className='text-lg'>New Blood Donation</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <CardGrid donations={donations} />
                        </>
                    }
                </div>
                :
                <div className='w-full h-screen'>
                    <div className='w-full h-full bg-[url("src/assets/blood-donating.jpg")] bg-no-repeat bg-cover bg-center bg-fixed flex justify-center items-center'>

                        <div className='flex flex-col justify-center items-center p-5 z-10'>
                            <h1 className='text-2xl font-bold text-center '>
                                You have no blood donations yet!
                            </h1>
                            <Link to='/blood-donations/create'>
                                <button className='bg-customRed text-white rounded-full py-2 px-4
                                font-bold flex items-center justify-center mt-2'>
                                    <span className='text-2xl'>👉</span>
                                    <span className='text-lg'>new blood donation</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Home
