import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedAnime {
        _id
        genres
        image
        link
        ranking
        title
        episodes
        status
        synopsis
      }
    }
  }
`;

export const GET_ANIME = gql`
  {
    savedAnime {
      _id
      genres
      image
      link
      ranking
      title
      episodes
      status
      synopsis
    }
  }
`;
