import React, { useEffect, useState } from 'react';
import { EllipsisHorizontalIcon, HeartIcon, ChatBubbleLeftEllipsisIcon, PaperAirplaneIcon, BookmarkIcon, FaceSmileIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { addDoc, collection, deleteDoc, doc, getDocs,  serverTimestamp } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/features/userSlice';
import { auth, db } from '../firebase';
import EditModal from './EditModal';
import { LikePost } from '../components'
import { useNavigate } from 'react-router-dom';

const PostCard = ({ id, userName, userImg, img, caption, likes }) => {
    const navigate  = useNavigate()
    const user = useSelector(selectUser)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [edit, setEdit] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [update, setUpdate] = useState(false)

    const sendComment = async (e) => {
        e.preventDefault();
        const saveComment = comment;
        setComment('');
        await addDoc(collection(db, 'posts', id, 'comments'), {
            comments: saveComment,
            username: user.displayName,
            timestamp: serverTimestamp()
        })
    }

    const fetch = async (e) => {
        const getComment = [];
        const querySnapshot = await getDocs(collection(db, 'posts', id, 'comments'));
        querySnapshot.forEach((doc) => {
            getComment.push({ ...doc.data() })
        })
        setComments(getComment)
    }
    useEffect(() => {
        fetch()
    }, [id,db,auth,comments])
    useEffect(() => { }, [id, likes,comments])

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, 'posts', id))
        console.log('delete successfully')
      
    }
    const handleUpdate = (id) => {
        setUpdate(pre=>!pre)
        console.log(id)
    }

    return (
        <div className='bg-white my-7 border rounded-sm'
        >

            {/* header  */}
            <div className='flex items-center p-5'>
                <img src={userImg} className='h-8 w-8 rounded-full object-contain border p-1' alt="img" />
                <p className='flex-1 ml-2 text-xs'>{userName}</p>
                <div className='relative'>
                    <EllipsisHorizontalIcon className='h-5 w-5 '
                        onClick={(e) => setEdit(pre => !pre)}
                    />
                    {edit &&
                        <div
                            onClick={() => setIsModalOpen(pre => !pre)}
                            className='absolute top-4 right-5 bg-gray-100 border-solid border-2 border-sky-500 w-[100px] h-[100px]  pt-5  space-y-3 cursor-pointer'>
                            <div
                                onClick={(e) => { handleUpdate(id) ;
                                    navigate(`/update/${id}`)
                                }}
                                className='flex text-sm items-center space-x-3 '>
                                <PencilIcon className='icons' />
                                <button>Edit</button>
                                {update && <EditModal />}
                            </div>

                            <div
                                onClick={(e) => handleDelete(id)}
                                className='flex text-sm items-center space-x-3'>
                                <TrashIcon className='icons' />
                                <button>Delete</button>
                            </div>
                        </div>}
                </div>
            </div>

            {/* img */}
            <img src={img} className='object-contain w-full p-2' alt="img" />

            {/* icons  */}
            <div className=' flex justify-between px-4 pt-4'>
                <div className='flex space-x-4 '>
                    <LikePost id={id}
                        likes={likes}
                    />
                    <ChatBubbleLeftEllipsisIcon className='icon' />
                    <PaperAirplaneIcon className='icon' />

                </div>

                <BookmarkIcon className='icon' />
            </div>

            {/* like count and caption */}
            <p className='p-5 truncate'>
                <span className='font-bold mr-1'>{userName}</span>{caption}
            </p>

            {/* comments  */}

            {comments.length > 0 && comments.map((item) => (
                <div key={item.comments} className='flex pl-10 scroll-x'>
                    <p className='font-bold mr-2'>{item.username}</p>
                    <p className='font-semibold'>{item.comments}</p>
                   
                </div>
            ))}

            {/* add cmnt sec  */}
            <form className='flex items-center p-4'>
                <FaceSmileIcon className='h-6' />
                <input type="text" placeholder='Add a comment...'
                    className='border-none flex-1 focus:ring-0 outline-none'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button disabled={!comment.trim()}
                    onClick={sendComment}
                    className='font-semibold text-blue-500'>Post</button>
            </form>


        </div>
    )
}

export default PostCard