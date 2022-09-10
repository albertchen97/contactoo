/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($roomId: String) {
    onCreateMessage(roomId: $roomId) {
      roomId
      messageId
      message
      name
      created
    }
  }
`;
