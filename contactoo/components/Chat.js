import React, { useEffect, useState } from "react";
import styles from "../styles/Chat.module.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { API, Auth, withSSRContext, graphqlOperation } from "aws-amplify";
import { listMessages } from "../src/graphql/queries";
import { createMessage, updateMessage } from "../src/graphql/mutations";
import { onCreateMessage } from "../src/graphql/subscriptions";
import ChatMessage from "./ChatMessage";
// Use the pre-built UI components provided by Amplify UI (https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-in)
import "@aws-amplify/ui-react/styles.css";

function Chat({ messages }) {
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
    return () => {
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
      <div className={styles.background}>
        <div className={styles.container}>
          <h1 className={styles.title}> Live Chat with the Retailer</h1>
          <div className={styles.chatbox}>
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
          <div className={styles.formContainer}>
            {/* Use form to handle the text submission (the typing bar) */}
            <form onSubmit={handleSubmit} className={styles.formBase}>
              <input
                type="text"
                id="message"
                name="message"
                autoFocus
                required
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="💬 Send a message to the retailer..."
                className={styles.textBox}
              />
              <button style={{ marginLeft: "8px" }}>Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

// Wrap the Chat component in withAuthenticator method.
// Chat component will be rendered only when the user is authenticated.
export default withAuthenticator(Chat);
