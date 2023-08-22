import { addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState,useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import { CameraIcon } from '@heroicons/react/24/outline';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const EditModal = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const params  = useParams()

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

const getData = async()=> {
  const docRef = doc(db,'posts', params.id)
  const docSnap = await getDoc(docRef)
  console.log(docSnap.data().image)
  setSelectedFile(docSnap.data().image)
  captionRef.current.value = (docSnap.data().caption) 
}
  const handleUpload = async (e) => {

    const docRef = doc(db,'posts', params.id)

 
    await updateDoc(docRef,{
      caption : captionRef.current.value
    })

    console.log('new doc with id' , docRef.id)

    const imageRef = ref(storage,`posts/${docRef.id}/image`);
    await uploadString(imageRef,selectedFile,'data_url').then(async snapshot => {
      const downloadURL = await getDownloadURL(imageRef)
      await updateDoc (doc(db,'posts',docRef.id),{
        image : downloadURL
      })
    })

    setSelectedFile(null)
  };


useEffect(()=>{
  getData()
  
},[])
  return (
   
      <div className="flex justify-center items-center h-screen ">
      
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg max-w-md">
          <div className="bg-white rounded-lg shadow-lg z-10 w-96 p-4 transform transition-all duration-300">
            {selectedFile ? (
              <img src={selectedFile} onClick={() => setSelectedFile(null)}
                className='border border-black mb-3 w-full object-contain cursor-pointer '
                alt="" />
            ) : (
              <>
                <div className='flex items-center relative justify-center w-full bg-red-300 hover:bg-red-400 rounded-full mb-3 h-26 mt-5 z-100'
                  onClick={() => filePickerRef.current.click()}
                >
                  <CameraIcon className='h-10 w-10 text-red-900' />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={filePickerRef}
                    onChange={addImgToPost}
                    className="w-full h-26"
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
          </div>
        </div>
     
    </div>
   
  
  );
};

export default EditModal;
