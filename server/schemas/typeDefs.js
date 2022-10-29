const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type savedAnime {
    _id: ID
    dataId: String
    userId: String
    title: String
    episodes: String
    genres: [String]
    image: String
    link: String
    status: String
    synopsis: String
    ranking: String
  }

  input animeInput {
    dataId: String
    userId: String
    title: String
    episodes: String
    genres: [String]
    image: String
    link: String
    status: String
    synopsis: String
    ranking: String
  }

  type User {
    _id: ID
    username: String
    email: String
    savedAnime: [savedAnime]
  }

  type Query {
    me: User
    savedAnime: [savedAnime]
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addAnime(animeToSave: animeInput): User
    removeAnime(Id: String!, userId: String!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
