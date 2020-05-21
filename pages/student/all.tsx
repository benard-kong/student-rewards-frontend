import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../../apollo/apollo";
import { Student } from "../../typeDefs/typeDefs";

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
          <Link href="/student/[id]" as={student.id} passHref>
            <a>
              <h2>{`${student.firstName} ${student.lastName}`}</h2>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default withApollo({ ssr: true })(AllStudentsPage);
