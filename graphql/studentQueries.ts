import gql from "graphql-tag";

export const FIND_STUDENT = gql`
  query findStudent($studentId: ID!) {
    findStudent(studentId: $studentId) {
      id
      studentNumber
      firstName
      lastName
      numPoints
      transactions {
        numPoints
        createdAt
      }
    }
  }
`;

export const QUERY_ALL_STUDENTS = gql`
  query {
    allStudents {
      id
      firstName
      lastName
      numPoints
      transactions {
        id
        numPoints
        createdAt
        studentName
        teacherName
      }
    }
  }
`;
