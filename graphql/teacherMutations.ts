import gql from "graphql-tag";

export const CREATE_TEACHER = gql`
  mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const CREATE_ADMIN = gql`
  mutation createAdminUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createAdminUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      id
      firstName
      lastName
      email
    }
  }
`;
