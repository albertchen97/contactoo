import React, { useEffect, useState } from "react";
import styles from "../styles/ChatMessage.module.css";
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
        isMe ? styles.sentMessageContainer : styles.receivedMessageContainer
      }>
      <p className={styles.senderText}>{message.owner}</p>
      <div className={isMe ? styles.sentMessage : styles.receivedMessage}>
        <p>{message.message}</p>
      </div>
      {/* <Chat messageId={messageId} /> */}
    </div>
  );
}
