import gql from "graphql-tag";

export const CREATE_STUDENT = gql`
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

export const ADD_POINTS = gql`
  mutation addPoints($studentId: ID!, $numPoints: Int!) {
    addPoints(studentId: $studentId, numPoints: $numPoints)
  }
`;

export const USE_POINTS = gql`
  mutation usePoints($studentId: ID!, $numPoints: Int!) {
    usePoints(studentId: $studentId, numPoints: $numPoints)
  }
`;
