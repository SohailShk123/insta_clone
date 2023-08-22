import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { login } from '../redux/features/userSlice';
import { useDispatch } from 'react-redux';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profileImage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profileImage: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
    console.log(user)
    await updateProfile(user, { displayName: formData.username, photoURL: formData.profileImage })
    dispatch(login({
      email : user.email,
      uid : user.uid,
      displayName : user.displayName,
      photoURL : formData.profileImage,
    }))
    if(user.email){
      navigate('/')
    }
  };



  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 sm:w-80 md:w-96 lg:w-1/3" onSubmit={handleSubmit}>
        <div className="mb-4">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="block mx-auto w-32 h-32 rounded-full mb-4 object-cover"
            />
          ) : null}
          <label
            className="block text-blue-500 font-bold mb-2 cursor-pointer"
            htmlFor="profileImage"
          >
            {/* {previewImage ? 'Change Profile Image' : 'Upload Profile Image'} */}
          </label>
          <input
            className="hidden"
            id="profileImage"
            name="profileImage"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange} required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange} required
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Sign up
          </button>
          <NavLink to='/signin'
            className='text-sm text-blue-500 hover:text-blue-700 cursor-pointer pt-3'
          >Already a user?</NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
