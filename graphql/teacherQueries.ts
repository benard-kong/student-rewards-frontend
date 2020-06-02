import gql from "graphql-tag";

export const FIND_USER = gql`
  query findUser($email: String!) {
    findStudent(email: $email) {
      id
      firstName
      lastName
      transactions {
        id
        numPoints
        createdAt
      }
    }
  }
`;

export const QUERY_ALL_TEACHERS = gql`
  query {
    allUsers {
      id
      firstName
      lastName
      email
    }
  }
`;
