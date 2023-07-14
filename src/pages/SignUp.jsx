import React, { useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile, } from 'firebase/auth';
import { auth } from '../firebase';

function SignUp() {
  const [value, setValue] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!value.name || !value.email || !value.password) {
      setError('Fill all the fields')
      return
    }
    setError('')
    console.log(value)
    const {user} = await createUserWithEmailAndPassword(auth, value.email, value.password);
    await updateProfile(user, { displayName: value.name })
    console.log("user", user)
    if(user.email){
      navigate('/')
    }
  }

  return (
    <div className='flex flex-col'>
      <Header />
      <h1 className='text-center text-3xl text-red-900 font-extrabold'>Sign Up {error}</h1>

      <label htmlFor="name">Name</label>
      <input type="name" name='name' id="email" placeholder='Entered name will be displayed on your profile'
        onChange={(e) => setValue((pre) => ({ ...pre, name: e.target.value }))} />

      <label htmlFor="email">Email</label>
      <input type="email" name='email' id="email" placeholder='Enter your email' onChange={(e) => setValue((pre) => ({ ...pre, email: e.target.value }))} />

      <label htmlFor="password">Password</label>
      <input type="password" placeholder='Enter your password'
        onChange={(e) => setValue((pre) => ({ ...pre, password: e.target.value }))}
      />
      <button onClick={handleSubmit} className='btn mt-3'>Submit</button>
      <p className='text-center font-bold'>Already have an account ?<span className='text-orange-600 ml-1 cursor-pointer' onClick={() => navigate('/signin')}>Login</span></p>
    </div>
  )
}

export default SignUp