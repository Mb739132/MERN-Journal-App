// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql `
  type Journal {
    _id: ID
    journalText: String
    createdAt: String
    username: String
    commentCount: Int
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
  }
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
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
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    addJournal(heading: String!, journalText: String!, img: String!): User
    deleteJournal(heading: String!, journalText: String!, img: String!): User
    addComment(journalId: ID!): User

  }
  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;