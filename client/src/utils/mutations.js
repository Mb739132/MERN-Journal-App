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

export const ADD_JOURNAL = gql`
  mutation addJournal(
    $heading: String!
    $journalText: String!
    $image: String!
  ) {
    addJournal(heading: $heading, journalText: $journalText, image: $image) {
      _id
      heading
      journalText
      image
      createdAt
      username
    }
  }
`;
export const UPDATE_JOURNAL = gql`
  mutation updateJournal(
    $id: String
    $heading: String
    $journalText: String
    $image: String
  ) {
    updateJournal(
      journalID: $journalID
      heading: $heading
      journalText: $journalText
      image: $image
    ) {
      _id
      heading
      journalText
      image
      createdAt
    }
  }
`;

export const DELETE_JOURNAL = gql`
  mutation deleteJournal($id: String) {
    deleteJournal(JournalId: $id) {
      _id
      heading
      journalText
      image
      createdAt
    }
  }
`;
