import React from 'react';
import CustomerTicket from '../components/CustomerTicket';
import { API, Auth, withSSRContext, graphqlOperation } from 'aws-amplify';
import { listRooms } from '../src/graphql/queries';

export default function CustomerList() {
  const [roomList, setRoomList] = React.useState([]);

  React.useEffect(() => {
    async function getRooms() {
      try {
        const roomDetail = {
          id: '1234',
          limit: 99,
          nextToken: '',
        };
        const roomsReq = await API.graphql({
          query: listRooms,
          variables: roomDetail,
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        });
        setRoomList([...roomsReq.data.listRooms.items]);
        console.log(roomsReq.data.listRooms.items);
      } catch (error) {
        console.error(error);
      }
    }
    getRooms();
  }, []);

  return (
    <ul className="w-full h-full divide-y divide-gray-500 ">
      {roomList.map((room) => (
        <CustomerTicket name="Smith" email="Smith@gmail" roomId={room.roomId} />
      ))}
    </ul>
  );
}
