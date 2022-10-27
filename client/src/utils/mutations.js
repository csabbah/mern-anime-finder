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

export const ADD_ANIME = gql`
  mutation addAnime($animeToSave: animeInput) {
    addAnime(animeToSave: $animeToSave) {
      _id
      savedAnime {
        title
      }
    }
  }
`;

export const REMOVE_ANIME = gql`
  mutation removeAnime($Id: String!, $userId: String!) {
    removeAnime(Id: $Id, userId: $userId) {
      username
    }
  }
`;
