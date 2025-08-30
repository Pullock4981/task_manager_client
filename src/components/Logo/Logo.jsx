import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/RootX.webp'

const Logo = () => {
    return (
        <div>
            <Link to='/'>
                <div className='flex items-center gap-2'>
                    <img src={logo} alt="RootX Logo" className="h-8" />
                <h1 className='text-2xl font-bold lg:block hidden'>
                    <span className="text-[#2563EB]">Root</span>
                    <span className='text-[#64748B]'>X</span>
                    <span className="text-[#2563EB]">_Task</span>
                </h1>
                </div>
            </Link>
        </div>
    );
};

export default Logo;