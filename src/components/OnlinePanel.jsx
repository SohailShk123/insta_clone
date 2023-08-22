import React from 'react'

function OnlinePanel({id,name,avatar}) {
  return (
    <div className='flex flex-col items-center  '>
        <div className=' '>
            <img src={avatar} className='h-14 w-14 rounded-full border-2 border-red-600 p-[1.5px] hover:scale-110 transition transform duration-150 ease-out' alt={name} />

        </div>
        <p className=' text-xs truncate w-14'>{name}</p>
    </div>
  )
}

export default OnlinePanel


    