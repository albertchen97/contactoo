/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession {
    onCreateSession {
      id
      status
      createdAt
      messages {
        id
        owner
        message
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession {
    onUpdateSession {
      id
      status
      createdAt
      messages {
        id
        owner
        message
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession {
    onDeleteSession {
      id
      status
      createdAt
      messages {
        id
        owner
        message
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      owner
      message
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      owner
      message
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      owner
      message
      createdAt
      updatedAt
    }
  }
`;
