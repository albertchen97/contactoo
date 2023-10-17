import React from 'react';
import Chat from '../components/Chat';
import { useRouter } from 'next/router';
import { listMessages } from '../src/graphql/queries';
import { API, Auth, graphqlOperation } from 'aws-amplify';

export default function chatpopup() {
  // const roomId = '1662854085730fea4079a-9cc3-48fe-9816-b536a45e78f8';

  const [messages, setMessages] = React.useState([]);
  const [roomId, setRoomId] = React.useState(null);

  const router = useRouter();
  React.useEffect(() => {
    if (router.isReady) {
      setRoomId(router.query.roomId);
      console.log('room done');
    }
  }, [router.isReady]);

  React.useEffect(() => {
    // Get messages from DynamoDB
    async function getMessages() {
      try {
        const messageDetail = {
          roomId: roomId,
          limit: 100,
          nextToken: '',
        };

        const messagesReq = await API.graphql({
          query: listMessages,
          variables: messageDetail,
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        });
        setMessages([...messagesReq.data.listMessages.items]);
        console.log('message done');
      } catch (error) {
        console.error(error);
      }
    }
    getMessages();
  }, [roomId]);
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-slate-300">
      {messages.length != 0 ? (
        <Chat messages={messages} roomId={roomId} />
      ) : (
        <div>No messages sent...</div>
      )}
    </div>
  );
}
