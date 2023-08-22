import React, { useState } from 'react';
import { MagnifyingGlassIcon, HomeIcon, ShoppingBagIcon } from '@heroicons/react/24/solid'
import { PaperAirplaneIcon, PlayCircleIcon, HeartIcon, PlusCircleIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { signOut } from 'firebase/auth';
import { logout, selectOpen, selectUser, setOpen } from '../redux/features/userSlice';
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {

    const dispatch = useDispatch()
    const selector = useSelector(selectUser)
    const modal = useSelector(selectOpen)
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await auth.signOut()
        dispatch(logout())
        navigate('/signin')

    }
    return (
        <div className='shadow-sm sticky top-0 bg-white z-10'>
            <div className='p-2 max-w-6xl mx-5 lg:mx-auto flex justify-between items-center '>
                {/* logo  */}
                <div>
                    <div className='hidden lg:inline-flex'>
                        <img src="https://links.papareact.com/ocw"
                            className='w-10 object-contain'
                            alt="logo" />
                    </div>
                    <div className='inline-flex lg:hidden flex-shrink-0'>
                        <img src="https://links.papareact.com/jjm" alt="logo"
                            className=' w-10 object-contain'
                        />
                    </div>
                </div>
                {/* search  */}
                <div className='flex relative rounded-md ml-3'>
                    <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-500 " />
                    </div>
                    <input type="text" placeholder='Search..' className='bg-gray-50 w-full pl-10 block sm:text-sm  border-gray-300 rounded-md focus:ring-black  focus:border-black ' />
                </div>
                {/* icons */}
                <div className='flex'>
                    <div className='flex items-center space-x-4'>
                        <HomeIcon
                            onClick={() => navigate('/')}
                            className='icons' />
                        <PlusCircleIcon className='icons'
                            onClick={() => dispatch(setOpen(true))}
                        />
                        <PaperAirplaneIcon className='icons -rotate-45' onClick={() => navigate('/message')} />
                        <ShoppingBagIcon className='icons hidden md:inline-flex' />
                        <HeartIcon className='icons hidden md:inline-flex' />
                        {/* <Bars3Icon className='icons' /> */}
                    </div>
                    <div className='flex flex-col items-center '
                        onClick={handleSignOut}
                    >
                        <p className="h-8 w-8 bg-gray-200 rounded-full ml-4 " >
                        </p>
                        <p className='ml-4'>{selector?.displayName || 'Me'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header




