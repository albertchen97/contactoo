import React, { useState, useEffect } from 'react'
import { Interactions } from 'aws-amplify';

export default function test() {
  const [userInput, setUserInput] = useState("")

  const response = async (userInput) => {
    try {
      const data = await Interactions.send("serviceBot_dev", userInput)
      return data.message
    }
    catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const msg = await response(userInput)
    console.log(msg)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => setUserInput(e.target.value)}
          required
        />

        <button>submit</button>
      </form>
    </div>
  );
}
