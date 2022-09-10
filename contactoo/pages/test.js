import React, { useEffect } from 'react'

import { AmplifyChatbot } from '@aws-amplify/ui-react/legacy';
import { Interactions } from 'aws-amplify';

let userInput = "Roses";
const response = async () => {
  try {
    const data = await Interactions.send("OrderFlowers_dev", userInput)
    console.log(data.message);
    return data
  }
  catch (err) {
    console.error(err)
  }
}
console.log(response())

export default function test() {
  // Log chatbot response

  return (
    <div>test</div>
  );
}
