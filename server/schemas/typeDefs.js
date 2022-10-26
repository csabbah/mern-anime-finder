const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: User
    notes: [Note]
  }

  type Note {
    _id: ID
    text: String
    userId: String
  }

  input noteInput {
    text: String
    userId: String
  }

  type User {
    _id: ID
    username: String
    email: String
    notes: [Note]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addNote(noteToSave: noteInput): User
    removeNote(Id: String!, userId: String!): User
    updateNote(_id: String!, text: String!): Note
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
