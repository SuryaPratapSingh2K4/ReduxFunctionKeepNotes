import React, { useEffect, useState } from 'react'
import { serverLocalhostPort } from '../../../server/config';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';


function Home() {

    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:${serverLocalhostPort}/blood-donations`)
            .then(response => response.json())
            .then(data => {
                setDonations(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching donations:', error);
                setLoading(false);
            });
    }, []);
    console.log(donations);

    // axios.get(`http://localhost:${serverLocalhostPort}/blood-donations`)
    //     .then(response => {
    //         setDonations(response.data);
    //         setLoading(false);
    //     })
    //     .catch(error => {
    //         console.error('Error fetching donations:', error);
    //         setLoading(false);
    //     });

    return (
        <div>
            {
                donations.length > 0 ?
                    <div>
                        {
                            loading ? <Loader/> :
                            <>
                                
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
        </div>
    )
}

export default Home
