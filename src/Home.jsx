import React ,{useState,useEffect} from 'react'
import { Header, Banner, ProductFeed } from './components/index'
import axios from 'axios';
import { auth } from './firebase';



export default function Home() {
  const [data, setData] = useState()
  const [name,setName] = useState("")

  const getProductFeed = async()=>{
    const {data} = await axios('https://fakestoreapi.com/products')
    setData(data)
    
  }
  useEffect(() =>{
getProductFeed()
  },[])
  useEffect(()=>{

    auth.onAuthStateChanged((user)=>{
      if(user){
        setName(user.displayName);
      }else setName('');
    })
  },[])
  return (
    <div className='bg-gray-100'>
      <Header name={name}/>
      <main className='max-w-screen-2xl mx-auto'>
        {/* Banner */}
        <Banner />
        {/* Product Feed  */}
        <ProductFeed product={data}/>
      </main>


    </div>
  )
}


