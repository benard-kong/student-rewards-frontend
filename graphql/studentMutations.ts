import gql from "graphql-tag";

export const CREATE_STUDENT_MUTATION = gql`
  mutation createStudent($firstName: String!, $lastName: String!, $studentNumber: String!, $grade: Int) {
    createStudent(firstName: $firstName, lastName: $lastName, studentNumber: $studentNumber, grade: $grade) {
      id
      firstName
      lastName
      numPoints
      grade
      studentNumber
    }
  }
`;

export const dummy = "hi";
