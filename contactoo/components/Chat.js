import React, { useEffect, useState } from "react";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { API, Auth, withSSRContext, graphqlOperation } from "aws-amplify";
import { listMessages } from "../src/graphql/queries";
import { createMessage, updateMessage } from "../src/graphql/mutations";
import { onCreateMessage } from "../src/graphql/subscriptions";
import ChatMessage from "./ChatMessage";
// Use the pre-built UI components provided by Amplify UI (https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-in)
import "@aws-amplify/ui-react/styles.css";

export default function Chat({ messages }) {
  const [stateMessages, setStateMessages] = useState([...messages]);
  const [messageText, setMessageText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the current user's information from Amplify Auth
    const fetchUser = async () => {
      try {
        const amplifyUser = await Auth.currentAuthenticatedUser();
        setUser(amplifyUser);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();

    // Subscribe to the creation of message in DynamoDB table
    // Update the messages whenever new messages is been sent to the DynamoDB table.
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: ({ provider, value }) => {
        setStateMessages((stateMessages) => [
          ...stateMessages,
          value.data.onCreateMessage,
        ]);
      },
      error: (error) => console.warn(error),
    });
    // Always cleanup your useEffect()
    return () => {
      // Unsubscribe to the current subscription to avoid duplicate messages
      subscription.unsubscribe();
    };
  }, []);

  // Update the chat messages whenever the user changes.
  useEffect(() => {
    // Get messages from DynamoDB
    async function getMessages() {
      try {
        const messagesReq = await API.graphql({
          query: listMessages,
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        setStateMessages([...messagesReq.data.listMessages.items]);
      } catch (error) {
        console.error(error);
      }
    }
    getMessages();
  }, [user]);

  const handleSubmit = async (event) => {
    // Prevent the page from reloading
    event.preventDefault();
    setMessageText("");
    const input = {
      // id is auto populated by AWS Amplify
      message: messageText, // the message content the user submitted (from state)
      owner: user.username, // this is the username of the current user
    };

    // Try make the mutation to graphql API
    try {
      await API.graphql({
        authMode: "AMAZON_COGNITO_USER_POOLS",
        query: createMessage,
        variables: {
          input: input,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (user) {
    return (
      // chat window
      <div className="flex justify-center h-full bg-white shadow-2xl">
        
        {/* chat container */}
        <div className="flex flex-col items-center justify-center w-full h-full">
          
          {/* header greeting div */}
          <div className="w-full p-3 pl-5 text-white bg-gradient-to-r from-black to-slate-100">Chat with us</div>
          
          {/* chat box containing the messages */}
          <div className="flex flex-col-reverse w-full h-full pb-4 overflow-y-auto text-sm md:text-lg">
            {stateMessages
              // sort messages oldest to newest client-side
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .map((message) => (
                // map each message into the message component with message as props
                <ChatMessage
                  message={message}
                  user={user}
                  // isMe - A Boolean that detects if the current user is the owner of the message.
                  isMe={user.username === message.owner}
                  key={message.id}
                />
              ))}
          </div>
          
          {/* form for writing and sending message */}
          <div className="w-full border-t border-slate-400 h-14">
            {/* Use form to handle the text submission (the typing bar) */}
            <form onSubmit={handleSubmit} className="flex items-center justify-between w-full h-full p-2">
              <input
                type="text"
                id="message"
                name="message"
                autoFocus
                required
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your messsage here"
                className="w-full h-full pl-2 pr-2 text-lg focus:outline-none"
              />
              <button className="ml-2 ">Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}
