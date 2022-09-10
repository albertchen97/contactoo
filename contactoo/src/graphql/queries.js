/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRoom = /* GraphQL */ `
  query GetRoom($id: String!, $roomId: String!) {
    getRoom(id: $id, roomId: $roomId) {
      id
      roomId
      session
      created
    }
  }
`;
export const listRooms = /* GraphQL */ `
  query ListRooms($id: String!, $limit: Int, $nextToken: String) {
    listRooms(id: $id, limit: $limit, nextToken: $nextToken) {
      items {
        id
        roomId
        session
        created
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($roomId: String!, $messageId: String!) {
    getMessage(roomId: $roomId, messageId: $messageId) {
      roomId
      messageId
      message
      name
      created
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages($roomId: String!, $limit: Int, $nextToken: String) {
    listMessages(roomId: $roomId, limit: $limit, nextToken: $nextToken) {
      items {
        roomId
        messageId
        message
        name
        created
      }
      nextToken
    }
  }
`;
