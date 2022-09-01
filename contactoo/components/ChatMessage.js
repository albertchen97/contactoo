import React from "react";
import styles from "../styles/ChatMessage.module.css";
// Use uuid to solve the duplicate messages bug
import { v4 as uuidv4 } from "uuid";

export default function ChatMessage({ message, isMe }) {
  message.id = uuidv4();
  return (
    <div
      className={
        isMe ? styles.sentMessageContainer : styles.receivedMessageContainer
      }>
      <p className={styles.senderText}>{message.owner}</p>
      <div className={isMe ? styles.sentMessage : styles.receivedMessage}>
        <p>{message.message}</p>
      </div>
    </div>
  );
}
