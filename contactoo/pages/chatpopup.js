import React from 'react'
import Chat from "../components/Chat";

export default function chatpopup() {

  var messages = []

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-slate-300">
      <Chat messages={messages}/>
    </div>

  )
}
