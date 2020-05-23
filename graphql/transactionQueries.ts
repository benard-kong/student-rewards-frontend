import gql from "graphql-tag";

export const ALL_TRANSACTIONS = gql`
  query allTransactions($startDate: String, $endDate: String) {
    allTransactions(startDate: $startDate, endDate: $endDate) {
      id
      studentName
      teacherName
      numPoints
      createdAt
    }
  }
`;

export const ALL_POSITIVE_TRANSACTIONS = gql`
  query allPositiveTransactions($startDate: String, $endDate: String) {
    allPositiveTransactions(startDate: $startDate, endDate: $endDate) {
      id
      studentName
      teacherName
      numPoints
      createdAt
    }
  }
`;

export const ALL_NEGATIVE_TRANSACTIONS = gql`
  query allNegativeTransactions($startDate: String, $endDate: String) {
    allNegativeTransactions(startDate: $startDate, endDate: $endDate) {
      id
      studentName
      teacherName
      numPoints
      createdAt
    }
  }
`;
