import React, { useEffect, useState } from "react";
// Use uuid to solve the duplicate messages bug
import { v4 as uuidv4 } from "uuid";
import Chat from "./Chat";

export default function ChatMessage({ message, isMe }) {
  console.log("In ChatMessage():");
  console.log("message.message = ", message.message);
  // console.log("isMe = ", isMe);

  // // const [messageId, setMessageId] = useState(uuidv4());
  // const [messageId, setMessageId] = useState(() => {
  //   console.log("messageId: ", messageId);
  //   return uuidv4();
  //   // return null;
  // });
  // useEffect(() => {
  //   setMessageId(uuidv4());
  //   console.log("messageId: ", messageId);
  // }, [message]);

  // Chat(messageId);
  // useEffect(() => {
  //   messageId = uuidv4();
  // });

  // function handleChatMessage() {
  //   console.log("message updated, generating new messageId");

  //   // // generate a uuid for the messageId
  //   // setMessageId(uuidv4());

  //   console.log("messageId for ", message, ": ", messageId);
  // }

  // console.log("In ChatMessage(): message: ", message);
  return (
    <div
      className={
        // if isMe then style as Sender, if notMe then style as Receiver
        isMe ? "flex break-words flex-col float-right items-end justify-end m-2 ml-9 mr-5": "flex flex-col float-right items-start justify-start m-2 ml-5 mr-9"
      }>
      <p className="mb-2 text-sm text-black/70">{message.owner}</p>
      <div className={isMe ? "p-2 text-white bg-gradient-to-r from-slate-900 to-slate-400 rounded-xl" : "p-2 bg-gray-200 text-black rounded-xl"}>
        <p>{message.message}</p>
      </div>
      {/* <Chat messageId={messageId} /> */}
    </div>
  );
}
