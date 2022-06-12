import { gql } from "@apollo/client";

export const QUERY_JOURNALS = gql`
  query journals($username: String) {
    journals(username: $username) {
      _id
      heading
      journalText
      image
      createdAt
      username
    }
  }
`;

export const QUERY_JOURNAL = gql`
  query journal($id: ID!) {
    journal(_id: $id) {
      _id
      heading
      journalText
      image
      createdAt
      username
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      journals {
        _id
        heading
        journalText
        image
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      journals {
        _id
        heading
        journalText
        image
        createdAt
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;
