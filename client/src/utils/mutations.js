import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_NOTE = gql`
  mutation addNote($noteToSave: noteInput!) {
    addNote(noteToSave: $noteToSave) {
      _id
      notes {
        text
      }
    }
  }
`;

export const REMOVE_NOTE = gql`
  mutation removeNote($Id: String!, $userId: String!) {
    removeNote(Id: $Id, userId: $userId) {
      username
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation updateNote($_id: String!, $text: String!) {
    updateNote(_id: $_id, text: $text) {
      _id
      text
    }
  }
`;
