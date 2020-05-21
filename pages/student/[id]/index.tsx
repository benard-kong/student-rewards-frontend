import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../../../apollo/apollo";
import { Student } from "../../../typeDefs/typeDefs";

const FIND_STUDENT = gql`
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

const AllStudentsPage: React.FC = () => {
  const router = useRouter();
  const { id }: { id?: string } = router.query;
  const { loading, error, data } = useQuery(FIND_STUDENT, { variables: { studentId: id } });

  if (error) {
    const msg = error.message;
    if (msg.toLowerCase().includes("not authorised")) router.push("/teacher/login");
    return <h1>Error: {msg}</h1>;
  }

  if (loading) return <h1>Loading...</h1>;

  const { findStudent: student }: { findStudent: Student } = data;

  return (
    <div>
      <h1>
        {student.firstName} {student.lastName}
      </h1>
      <h2>Student Number: {student.studentNumber}</h2>
      <h3>Points: {student.numPoints}</h3>
      <Link href="/student/[id]/award-points" as={`${id!}/award-points`}>
        <a>Award Points</a>
      </Link>
    </div>
  );
};

export default withApollo({ ssr: true })(AllStudentsPage);
