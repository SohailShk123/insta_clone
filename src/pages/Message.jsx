import React, { useEffect, useRef, useState } from 'react'
import {Chat,Send} from '../components'
import { useSelector } from 'react-redux'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'


const s = {
  container : `max-w-3xl mx-auto text-center`,
  section1 : `flex flex-col h-screen bg-gray-100 shadow-xl border `,
  main : `flex flex-col p-[10px] relative`
}

const Message = () => {
  const [msg , setMsg] = useState([])
  const scroll = useRef()
 
  useEffect(()=>{
    const q = query(collection(db,'chat'),orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q,(querySnapShot)=>{
      let message = [];
      querySnapShot.forEach((doc)=>{
        message.push({...doc.data(),id : doc.id})
      });
      setMsg(message);
    })
    return unsubscribe
  },[])
  return (
    <div className={s.container}>
      <section className={s.section1}>
        <main className={s.main}>
          {msg && msg.map((mgs) => (
            <Chat key={msg.id} mgs={mgs}/>

        ))}
        </main>
          <Send scroll={scroll}/>
          <span ref={scroll}></span>
      </section>
    </div>
  )
}

export default Message