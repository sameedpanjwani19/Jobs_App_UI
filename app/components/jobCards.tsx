"use client"
import React, { useEffect, useState } from 'react'
import cardLogo from '../Assets/card logo.png'
import Image from 'next/image';
import axios from 'axios';
import { FaBookmark } from 'react-icons/fa';

interface Job {
    id: number;
    title: string;
    location: string;
    created_at: string;
}

const JobCards = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const convertDateToDays = (dateString: string): string => {
        const date = new Date(dateString);
        const today = new Date();

        const differenceInTime = today.getTime() - date.getTime();
        const daysAgo = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

        if (daysAgo === 0) return "Today";
        if (daysAgo === 1) return "1 day ago";
        return `${daysAgo} days ago`;
    };


    useEffect(() => {
        axios.get('https://jsonfakery.com/jobs')
            .then(response => setJobs(response.data))
            .catch(error => console.error('Error fetching jobs:', error));
    }, []);

  return (
    <div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4" >
                        {jobs.slice(0, 8).map(job => (
                            <div key={job.id} className="bg-white sm:centre rounded-xl shadow p-4" style={{ minWidth: '222px', minHeight: 'auto' }}>
                                <div className="flex items-center">
                                    <Image src={cardLogo} alt="Logo" width={50} height={50} />
                                    <h3 className="text-md font-bold">{job.title.split(" ")[0]}</h3>
                                </div>
                                <div className='flex item-centre'>
                                    <i className='bx bx-map' style={{ color: '#585d6e', marginTop: '4px', marginRight: '2px' }}></i>
                                    <p className="text-gray-600">{job.location.length > 20 ? `${job.location.substring(0, 13)}...` : job.location}</p></div>
                                <div className="text-sm flex item-centre text-gray-500 mb-4">
                                    <i className='bx bx-time-five' style={{ color: '#585d6e', marginTop: '4px', marginRight: '4px' }}></i>
                                    {convertDateToDays(job.created_at)}</div>
                                <div className="flex justify-between items-center">
                                    <button
                                        // onClick={/* Handle Apply Now button click */}
                                        className="bg-[#0154AA] text-white py-2 px-6 rounded transition-all duration-300 hover:bg-black"
                                        style={{ fontSize: '16px', borderRadius: '8px' }}
                                    >
                                        Apply Now
                                    </button>
                                    <FaBookmark className="text-gray-400 cursor-pointer" style={{ fontSize: '24px' }} />
                                </div>
                            </div>
                        ))}
                    </div>
    </div>
  )
}

export default JobCards