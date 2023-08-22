import React, { useState } from 'react'
import { auth, db } from '../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

const s = {
    form : `h-14 w-full max-w-3xl flex text-xl  absolute bottom-0 z-10`,
    input : `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
    btn : `w-[20%] bg-green-500`
}

const Send = ({scroll}) => {

    // console.log(auth.currentUser) user info get by current user

    const [input,setInput] = useState('')
    const handleSendMsg =async (e) => {
        e.preventDefault();
        if(input === '') return;
        const {uid,displayName} = auth.currentUser;
        await addDoc(collection(db,'chat'),{
            text : input,
            name : displayName,
            uid : uid,
            timestamp : serverTimestamp(),
        })
        setInput('')
        scroll.current.scrollIntoView({behavior: 'smooth'})

    }


  return (
    <form onSubmit={handleSendMsg} className={s.form}>
        <input type="text" className={s.input} 
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        placeholder='Mesasges' />
        <button className={s.btn}>Submit</button>
    </form>
  )
}

export default Send