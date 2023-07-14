import React from 'react'
import logo from '../assets/logo.png'
import {
    MagnifyingGlassIcon, ShoppingCartIcon, Bars3Icon
} from '@heroicons/react/24/outline'
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useSelector } from 'react-redux';
import { selectItem } from '../redux/slice';


function Header({ name }) {
    const navigate = useNavigate()
    const handleSignOut = async () => {
        await signOut(auth)
    }
    const item = useSelector(selectItem)

    return (
        <header>
            {/* top nav  */}
            <div className="flex items-center bg-[#131921] p-1 py-2 flex-grow">
                <div onClick={() => navigate('/')}
                    className='mt-2 flex items-center flex-grow sm:flex-grow-0 mr-2'>
                    <img src={logo} alt="logo" width={150}
                        className='cursor-pointer object-contain px-5 ' />
                </div>
                <div className='hidden sm:flex bg-yellow-400 hover:bg-yellow-500 h-10 rounded-md flex-grow cursor-pointer items-center'>
                    <input type="text" className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4' />
                    <MagnifyingGlassIcon className="h-12 p-4 text-blue-500 " />
                </div>
                <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
                    <div onClick={handleSignOut} className='link'>
                        <Link to='/signup'>
                            <p>{name ? (`Welcome ${name}`) : ("Sign IN")}</p>
                            <p className='font-extrabold md:text-sm'>Account & List</p>
                        </Link>
                    </div>
                    <div className='link'>
                        <p>Return</p>
                        <p className='font-extrabold md:text-sm'>& Orders</p>
                    </div>
                    <div onClick={() => navigate('/cheackout')} className='link relative flex items-center'>
                        <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 rounded-full text-center text-black font-bold'>{item.length}</span>
                        <ShoppingCartIcon className='h-10' />
                        <p className='hidden md:inline font-extrabold md:text-sm mt-2 '>Basket</p>
                    </div>
                </div>
            </div>
            {/* bottom nav */}
            <div className='flex items-center space-x-3 p-2 pl-6 bg-[#232F3E] text-white text-sm'>
                <p className='link flex items-center'
                ><Bars3Icon className='h-6 mr-1' />All
                </p>
                <p className='link'>Prime Video</p>
                <p className='link'>Amazon Business</p>
                <p className='link'>Today's Deals</p>
                <p className='link hidden lg:inline-flex'>Electronics</p>
                <p className='link hidden lg:inline-flex'>Food & Grocry</p>
                <p className='link hidden lg:inline-flex'>Prime</p>
                <p className='link hidden lg:inline-flex'>Buy Again</p>
                <p className='link hidden lg:inline-flex'>Shopper Tool </p>
                <p className='link hidden lg:inline-flex'>Health & Personal Care</p>
            </div>
        </header>
    )
}

export default Header
