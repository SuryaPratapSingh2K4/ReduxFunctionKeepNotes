import React, { useEffect, useState } from 'react'
import { serverLocalhostPort } from '../../../server/config';


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
                donations.length === 0 ?
                    <div>
                        <div className='w-full h-[400px] flex flex-col justify-center items-center gap-5'>
                            <img
                                className='w-24 h-24 object-contain mx-auto'
                                src='https://www.pikpng.com/pngl/b/136-1367340_blood-donation-transparent-images-png-blood-donation-no.png' alt='No donations' />
                            <h1 className='text-2xl font-bold text-center '>
                                You have no blood donations yet!
                            </h1>
                            <Link to='/'>
                                <button className='bg-customRed text-white rounded-full py-2 px-4
                                font-bold flex items-center justify-center'>
                                    <span className='text-2xl'>👉</span>
                                    <span className='text-lg'>new blood donation</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                    : <div></div>
            }
        </div>
    )
}

export default Home
