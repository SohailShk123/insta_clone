import React from 'react'
import { auth } from '../firebase'

const s = {
    main : `flex item-center shadow-xl p-2  m-2 rounded-tl-full rounded-tr-full relative`,
    name :  `absolute mt-[-1.7rem] text-gray-600 text-xs`,
    sent : `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full`,
    received : `bg-[#e5e5ea] text-block float-left rounded-br-full`
}

const Chat = ({mgs}) => {

    const messageClass = mgs.uid === auth.currentUser.uid ? `${s.sent} `: `${s.received}` 

  return (
    <div>
        <div className={`${s.main} ${messageClass}`} key={mgs.id}>
            <p className={s.name}>{mgs.name}</p>
            <p >{mgs.text}</p>
        </div>
    </div>
  )
}

export default Chat