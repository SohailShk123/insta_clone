import React, { useEffect, useState } from 'react'
import { PostCard } from '../components'
import { db } from '../firebase'
import { collection, getDocs } from "firebase/firestore";

const Post = () => {
    const [info, setInfo] = useState([])

    const fetch = async (e) => {
        const getPost = []
        const querySnapshot = await getDocs(collection(db, "posts"))
        querySnapshot.forEach((doc) => {
            getPost.push({ ...doc.data(), id: doc.id })
        });
        setInfo(getPost)
    }

    useEffect(() => {
        fetch()

        return fetch
    }, [])


    return (
        <div>
            {
                info?.map((item) => 
                
                    (
                        <PostCard
                            key={item.id}
                            caption={item.caption}
                            userName={item.username}
                            img={item.image}
                            id={item.id}
                            likes={item.likes}
                        />
                    )
                
                )
            }
        </div>
    )

}
export default Post