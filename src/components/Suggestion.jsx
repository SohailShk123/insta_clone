import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';

const Suggestion = () => {
const [data, setData] = useState([])
  useEffect(() => {
    const suggest = [...Array(5)].map(item => (
      {
        avatar: faker.image.avatar(),
        workat: faker.name.jobTitle(),
        name: faker.person.fullName(),
        id : faker.number.int(),

      }
    ))
    // console.log(suggest)
    setData(suggest)
  }, [])
  return (
    <div className='mt-4 ml-10'>
      {/* header  */}
      <div className='flex justify-between text-sm '>
        <h3 className='text-gray-400 font-bold'>Suggestion for you</h3>
        <button className='text-gray-600 font-semibold'>See All</button>
      </div>
{data.map(item=>(
  <div key={item.id} className='flex  py-3 items-center justify-between '>
    <img src={item.avatar} 
    className='h-14 w-14 rounded-full border p-[2px]'
    alt="img" />
    <div className='flex-1 ml-4'>
      <h2 className='text-sm font-bold'>{item.name}</h2>
      <h3 className='text-gray-400'>{item.workat}</h3>
    </div>
      <button className='text-blue-400 truncate'>Follow</button>
  </div>
))}
    </div>
  )
}

export default Suggestion