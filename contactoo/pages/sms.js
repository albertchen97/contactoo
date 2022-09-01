import React from "react";
import { Component, useState } from "react";

export default function Sms() {
  let [text, setText] = useState("");
  const [recipientValue, setRecipientValue] = useState("");

  const onChangeHandler = (event) => {
    setRecipientValue(event.target.value);
  };

  const onChangeHandler2 = (event) => {
    setText(event.target.value);
  };

  let sendText = () => {
    fetch(
      `http://127.0.0.1:4000/send-text?recipient=${recipientValue}&textmessage=${text}`
    ).catch((err) => console.error(err));
  };

  return (
    <div className="SMS">
      <div style={{ marginTop: 10 }}>
        <h2> Send Text Message </h2>
        <label> Your Phone Number </label>
        <br />

        <input
          type="text"
          name="recipient"
          onChange={onChangeHandler}
          value={recipientValue}
        />

        <input
          type="text"
          name="text"
          rows="3"
          onChange={onChangeHandler2}
          value={text}
        />

        <div />
        <button onClick={sendText}> Send Text </button>
      </div>
    </div>
  );
}
