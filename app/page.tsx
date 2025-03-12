"use client"
import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBookmark } from 'react-icons/fa';
import Logo from './Assets/Logo.png';
import Picture from './Assets/Picture.png'
import ProfileCard from './components/ProfileCard';
import cardLogo from './Assets/card logo.png'
import axios from 'axios';
import 'boxicons/css/boxicons.min.css';

interface Job {
    id: number;
    title: string;
    location: string;
    created_at: string;
}

const pages = ['Top Companies', 'Job Tracker', 'My Calendar', 'Documents', 'Messages', 'Notification'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar: React.FC = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
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
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white text-grey shadow-md sticky top-0 z-50">
                <div className="container mx-auto flex items-center justify-between p-4">
                    <Link href="/">
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <Image src={Logo} alt="Logo" width={42} height={38} />
                            <span className="text-2xl font-bold" style={{ color: '#0154AA' }}>Find Jobs</span>
                        </div>
                    </Link>
                    <div className="hidden lg:flex items-center space-x-6">
                        {pages.map((page) => (
                            <Link key={page} href={`/${page.toLowerCase().replace(/\s/g, '-')}`}>
                                <button className="hover:text-gray-500 transition-colors">{page}</button>
                            </Link>
                        ))}
                        <div className="hidden lg:flex items-center px-4" style={{ backgroundColor: '#f6f9ff', fontSize: '18px', borderRadius: '10px' }}>
                            <i className='bx bx-search-alt-2' style={{ color: '#737a91', fontSize: '24px', marginTop: '4px' }}></i>
                            <input type="text" placeholder="Search" className="p-2  rounded-md w-48" />
                        </div>
                        <button className="bg-blue-600 text-white p-2 rounded transition-colors hover:bg-blue-700" style={{ backgroundColor: '#0154AA', borderRadius: '10px' }}>Resume Builder</button>
                        <button className="focus:outline-none" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                            <Image src={Picture} alt="User Avatar" width={38} height={38} className="rounded-full" />
                        </button>
                        {userMenuOpen && (
                            <div className="absolute right-4 mt-12 bg-white text-black rounded-lg shadow-lg w-48">
                                {settings.map((setting) => (
                                    <button key={setting} className="w-full text-left px-4 py-2 hover:bg-gray-200">
                                        {setting}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="lg:hidden flex items-center">
                        <button onClick={() => setNavOpen(!navOpen)} className="focus:outline-none">
                            {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
                {navOpen && (
                    <div className="lg:hidden bg-blue-700 p-4 text-white">
                        {pages.map((page) => (
                            <Link key={page} href={`/${page.toLowerCase().replace(/\s/g, '-')}`}>
                                <button className="block w-full text-left py-2 hover:bg-blue-800">{page}</button>
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
            <div className="container mx-auto p-4 flex flex-col lg:flex-row">
                <div className="lg:w-3/12 mb-6">
                    <ProfileCard
                        name="Albert Flores"
                        description="Senior Product Designer | UI/UX Designer | Graphic Designer | Web Developer"
                        location="Clinton, Maryland"
                        profileVisitors={140}
                        resumeViewers={20}
                        myJobs={88}
                    />
                </div>
                <div className="lg:w-9/12">
                    {/* Header */}
                    <div className="items-center mt-5 mb-6">
                        <h1 className="text-3xl font-bold">Find your Dream Job, <span style={{ color: '#0154AA' }}>Albert!</span></h1>
                        <p>Explore the latest job openings and apply for the best opportunities available today!</p>
                    </div>

                    {/* Search Bar & Filters */}
                    <div className="w-full flex flex-col md:flex-row items-center bg-white p-4 rounded gap-3 mb-8 justify-between" style={{ width: '100%', borderRadius: '12px' }}>
                        {/* Search Input */}
                        <div >
                            <input
                                type="text"
                                placeholder="Job Title, Company..."
                                className=" w-full md:w-auto flex-grow p-3 rounded bg-white"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
                            {/* Dropdown 1 */}
                            <select className="w-full md:w-auto p-3 rounded text-gray-500 bg-white">
                                <option value="">Select Location</option>
                                <option value="china">China</option>
                                <option value="pakistan">Pakistan</option>
                            </select>

                            {/* Dropdown 2 */}
                            <select className="w-full md:w-auto p-3 rounded text-gray-500 bg-white">
                                <option value="">Job Type</option>
                                <option value="remote">Remote</option>
                                <option value="onsite">On-site</option>
                                <option value="hybrid">Hybrid</option>
                            </select>

                            {/* Search Button */}
                            <button
                                className="md:w-auto text-white px-4 py-2 rounded flex items-center justify-center gap-2 mt-3 md:mt-0"
                                style={{ backgroundColor: '#0154AA', fontSize: '18px', borderRadius: '12px' }}
                            >
                                <i className='bx bx-search-alt-2' style={{ color: '#ffffff', fontSize: '24px' }}></i>
                                Search
                            </button>
                        </div>
                    </div>




                    <div className='flex item-center gap-4 pb-3'>
                        <p className='p-2 text-gray-500'>Similar :</p>
                        <button className='p-2 rounded border border-gray-400 text-gray-500'>Frontend</button>
                        <button className='p-2 rounded border border-gray-400 text-gray-500'>Backend</button>
                        <button className='p-2 rounded border border-gray-400 text-gray-500'>Graphic Designer</button>
                    </div>
                    <hr className="border-t border-gray-300 my-2" />
                    <h2 className="text-2xl font-bold mb-4">Featured Jobs</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4" >
                        {jobs.slice(0, 8).map(job => (
                            <div key={job.id} className="bg-white rounded-xl shadow p-4" style={{ width: '222px', height: '185px' }}>
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
                    <hr className="border-t border-gray-300 my-6" />
                    <h2 className="text-2xl font-bold mb-4">Recommended Jobs</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {jobs.slice(0, 7).map(job => (
                            <div key={job.id} className="bg-white rounded-xl shadow p-4" style={{ width: '222px', height: 'auto' }}>
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
                                    </button>                                    <FaBookmark className="text-gray-400 cursor-pointer"  style={{ fontSize: '24px' }}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResponsiveAppBar;

