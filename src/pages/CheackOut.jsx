import React, { useState ,useEffect} from 'react'
import { Header } from '../components';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectItem } from '../redux/slice';
import {CheackOutProduct} from '../components/index'
import { auth } from '../firebase.js';

function CheackOut() {
  const item = useSelector(selectItem)
  const [name , setName] = useState('')
  
  useEffect(()=>{
  auth.onAuthStateChanged((user)=>{
    if(user){
      setName(user.displayName);
    }else setName('');
  })
},[])
  return (
    <div className='bg-gray-100 '>
        <Header name={name}/>
       <main className='lg:flex max-w-screen-2xl mx-auto'>
       <div>
            <img src="https://links.papareact.com/ikj" alt="add" width={1020} height={250} />
            <div className='flex flex-col p-5 space-y-10 bg-white'>
              <h1 className='text-3xl border-b pb-4 '>{item.length === 0 ? 'Your Amazon basket is empty' : 'Your Shopping Basket'}</h1>
            </div>
            {item?.map((item,i)=>(
              <CheackOutProduct key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                 price={item.price}
                 description={item.description}
                 category={item.category}
                 image={item.image}
                 hasPrime={item.hasPrime}
              />
            ))}

        </div>
        <div className='flex flex-col bg-white p-10 shadow-md w-20%'>
          {item.length > 0 && (
            <>
            <h2 className='whiteSpace-nowrap'>Subtotal ({item.length}) items:
            <span className='font-bold'>

            </span>
            </h2>
            <button type='button' className={`${!name ? ("bg-gray-500") :("btn")}`}>{name ?  'Process to pay' : 'Sign in first'}</button>
            </>
          )}
        </div>
        
       </main>
    </div>
  )
}

export default CheackOut