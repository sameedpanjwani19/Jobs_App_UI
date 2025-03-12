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
    company: string;
    type: string;
    applicants: string;
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
        return `${daysAgo}days ago`;
    };


    useEffect(() => {
        axios.get('/data.json')
            .then(response => setJobs(response.data.jobs))
            .catch(error => console.error('Error fetching jobs:', error));
    }, []);

  return (
    <div>
         <div className="flex flex-wrap sm:w-[320px] md:w-[100%] 2xl:w-[100%]  " style={{gap:'16px'}} >
                                {jobs.slice(0, 8).map(job => (
                                    <div key={job.id}className="bg-white rounded-xl shadow min-w-[150px] sm:w-[320px] w-full md:w-[186px] xl:w-[186px] 2xl:w-[186px] p-4 flex flex-col justify-between" 
                                    style={{ padding: '10px 20px' }}>
                                        <div className="flex items-center " >
                                            <Image src={cardLogo} alt="Logo" width={50} height={50} />
                                            <div className='flex flex-col'>
                                            <p className="text-md font-bold" style={{ fontSize:'12px' }}>{job.title}</p>
                                            <p style={{ fontSize:'12px' }}>{job.company}</p>
                                            </div>
        
                                        </div>
                                        <div className='flex item-centre '>
                                            <i className='bx bx-map' style={{ color: '#585d6e', marginTop: '2px', marginRight: '2px' }}></i>
                                            <p className="text-gray-500" style={{ fontSize:'12px' }}>{job.location.length > 20 ? `${job.location.substring(0, 13)}...` : job.location}</p>
                                            <p className='text-gray-500' style={{ fontSize:'12px' }}>({job.type})</p></div>
                                        <div className="text-sm flex item-centre text-gray-500 mb-4">
                                            <i className='bx bx-time-five' style={{ fontSize:'12px' , color: '#585d6e', marginTop: '2px' , marginLeft:'2px', marginRight:'2px'}}></i>
                                            <div className='flex' style={{ fontSize:'12px'}}>
                                            <p >{convertDateToDays(job.created_at)}</p> <span>|</span> <p style={{color: '#0154AA'}}> {job.applicants} Applicants</p>
                                            </div>
                                           
                                           </div>
        
                                        <div className="flex justify-between items-center">
                                            <button
                                                // onClick={/* Handle Apply Now button click */}
                                                className="bg-[#0154AA] text-white py-2 px-6 rounded transition-all duration-300 hover:bg-black"
                                                style={{ fontSize: '12px', borderRadius: '8px' }}
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