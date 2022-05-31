// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Journal {
    _id: ID
    heading: String
    journalText: String
    image: String
    createdAt: String
    username: String
  }

  type User {
    _id: ID
    username: String
    email: String
    journals: [Journal]
  }
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    journals(username: String): [Journal]
    journal(_id: ID!): Journal
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addJournal(heading: String!, journalText: String!, image: String!): Journal
    updateJournal(
      heading: String!
      journalText: String!
      image: String!
    ): Journal
    deleteJournal(
      heading: String!
      journalText: String!
      image: String!
    ): Journal
  }
  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;
