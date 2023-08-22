import React, { useEffect, useLayoutEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid'
import { auth, db } from '../firebase'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'


const LikePost = ({ id, likes }) => {
  
  const handleLike = async () => {
    const docRef = doc(db, 'posts', id)
    console.log(id, likes, auth.currentUser.uid)
    if (likes?.includes(auth.currentUser.uid)) {
      await updateDoc(docRef, {
        likes: arrayRemove(auth.currentUser.uid)
      })
    } else {
      await updateDoc(docRef, {
        likes: arrayUnion(auth.currentUser.uid)
      })
    }
  }

  useEffect(() => {} , [likes, id ,db,auth.currentUser.uid])

  return (
    <div className='flex'>
      <span className='mr-2 font-semibold'>{likes.length > 0 && likes.length}</span>
      {likes?.includes(auth.currentUser.uid) ? (
     
      <FilledHeartIcon className='icon text-red-600'  onClick={()=>handleLike()} />) : (<HeartIcon className='icon text-red-600'  onClick={()=>handleLike()} />)}

    </div>
  )

}

export default LikePost