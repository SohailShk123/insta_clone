import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';
import { MiniProfile, OnlinePanel, Post, Suggestion } from '../components';

function Home() {
  const [data, setData] = useState([])
  useEffect(() => {
    const suggestion = [...Array(20)].map((_, i) => ({
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
      id: i
    }))
    // console.log(suggestion)
    setData(suggestion)


  }, [])

  return (
    <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto '>
      {/* online bar  */}
      <section className='col-span-2'>
        <div className='flex overflow-x-scroll space-x-2 p-6 mt-3 border-gray-200 bg-white border rounded-sm scrollbar-thin scrollbar-thumb-black'>
          {data.map(item => (
            <OnlinePanel key={item.id}
              id={item.id}
              name={item.name}
              avatar={item.avatar}
            />

          ))}
        </div>

          <Post />
      </section>

            <section className='hidden xl:inline-grid md:col-span-1 '>
              <div className='fixed top-20'>
              <MiniProfile />
              <Suggestion />
              </div>
            </section>
    </main>
  )
}

export default Home