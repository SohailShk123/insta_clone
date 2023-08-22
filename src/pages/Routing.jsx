import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Message, SignIn, SignUp,PNF } from './index'
import { Header, Modal } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from '../redux/features/userSlice'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import EditModal from '../components/EditModal'


function Routing() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }))
      }
      else (logout())
    })
  }, [])

  return (
    <div className='bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'>
      {!user ? (
        <Routes>
          <Route path='/signup' Component={SignUp} />
          <Route path='/signin' Component={SignIn} />
          <Route path='*' Component={PNF} />
        </Routes>
      ) :
        (
          <>
            <Modal />
            <Header />
            <Routes>
              <Route path='/' Component={Home} />
              <Route path='/message' Component={Message} />
              <Route path='/update/:id' Component={EditModal} />
              <Route path='*' Component={PNF} />
            </Routes>
          </>
        )
      }



    </div>
  )
}

export default Routing