import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../../apollo/apollo";

export type Transaction = {
  id: string;
  numPoints: number;
  createdAt: Date;
  studentName: string;
  teacherName: string;
};

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  numPoints: number;
  transactions: Transaction;
};

const QUERY_ALL_STUDENTS = gql`
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

const AllStudentsPage: React.FC = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(QUERY_ALL_STUDENTS);

  if (error) {
    const msg = error.message;
    if (msg.toLowerCase().includes("not authorised")) router.push("/teacher/login");
    return <h1>Error: {msg}</h1>;
  }
  if (loading) return <h1>Loading...</h1>;

  const { allStudents }: { allStudents: Student[] } = data;

  return (
    <div>
      {allStudents.map((student) => (
        <div key={student.id}>
          <h1>ID: {student.id}</h1>
          <h2>Name: {`${student.firstName} ${student.lastName}`}</h2>
        </div>
      ))}
    </div>
  );
};

export default withApollo({ ssr: true })(AllStudentsPage);
