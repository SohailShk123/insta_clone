import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/features/userSlice'

function MiniProfile() {
  const selector = useSelector(selectUser)
  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
      <img className='w-16 h-16 rounded-full border p-[2px]'
        src={selector?.photoURL || selector?.email[0]} alt="img" />
      <div className='mx-4'>
        <h2 className='font-bold'>{selector?.displayName}</h2>
        <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
      </div>
      <button className='text-blue-400 text-sm font-semibold'>Sign Out</button>
    </div>
  )
}

export default MiniProfile;