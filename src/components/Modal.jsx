import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectOpen, selectUser, setOpen } from '../redux/features/userSlice'
import { CameraIcon } from '@heroicons/react/24/outline'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const Modal = () => {
  const dispatch = useDispatch()
  const modal = useSelector(selectOpen)
  const user = useSelector(selectUser)
  // console.log(user)
  const [isUploading, setIsUploading] = useState(false);
  const filePickerRef = useRef(null)
  const captionRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const addImgToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  }

  const handleUpload = async (e) => {

    if (isUploading) return;
    setIsUploading(true);

    // 1. Create a post and to firestore 'posts' collection
    // 2. Get the post id for the newly created post
    // 3. Upload the img to firebase storage with the post id
    // 4. Get a download URL from firebase storage and upload to update the original post with image 

    const docRef = await addDoc(collection(db,'posts'),{
      username : user.displayName,
      caption : captionRef.current.value,
      likes : [],
      timeStamp : serverTimestamp()
    })

    console.log('new doc with id' , docRef.id)

    const imageRef = ref(storage,`posts/${docRef.id}/image`);
    await uploadString(imageRef,selectedFile,'data_url').then(async snapshot => {
      const downloadURL = await getDownloadURL(imageRef)
      await updateDoc (doc(db,'posts',docRef.id),{
        image : downloadURL
      })
    })

    dispatch(setOpen(false))
    setSelectedFile(null)
    setIsUploading(false)
  };
  return (
    <>
      {modal &&
        (<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" onClick={() => dispatch(setOpen(false))} ></div>
          <div className="bg-white rounded-lg shadow-lg z-10 w-96 p-4 transform transition-all duration-300">
            {selectedFile ? (
              <img src={selectedFile} onClick={() => setSelectedFile(null)}
                className='border border-black mb-3 w-full object-contain cursor-pointer '
                alt="" />
            ) : (
              <>
                <div className='flex items-center relative justify-center w-full bg-red-300 hover:bg-red-400 rounded-full mb-3 mt-5 z-100'
                  onClick={() => filePickerRef.current.click()}
                >
                  <CameraIcon className='h-10 w-10 text-red-900' />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={filePickerRef}
                    onChange={addImgToPost}
                    className="w-full absolute"
                  />
                </div>
                <p className='text-center font-bold mb-3 '>Upload a photo</p>
              </>
            )}

            <input
              type="text"
              ref={captionRef}
              placeholder="Enter a caption"
              className="w-full mb-4 p-2 border rounded-lg"
            />
            <button
              disabled={isUploading}
              onClick={handleUpload}
              className={`w-full bg-red-500 text-white font-semibold py-2 rounded-lg ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
                }`}
            >
              {isUploading ? 'Uploading...' : 'Upload Post'}
            </button>
          </div>
        </div>)
      }
    </>
  );
};

export default Modal