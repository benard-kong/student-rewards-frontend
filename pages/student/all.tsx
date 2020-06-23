import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import ContainerCenteredContent from "../../components/styledComponents/ContainerCenteredContent";
import { withApollo } from "../../apollo/apollo";
import { QUERY_ALL_STUDENTS } from "../../graphql/studentQueries";
import { Student } from "../../typeDefs/typeDefs";
import { compareStudents } from "../../utils/compareFunctions";

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
  const students = allStudents.sort(compareStudents);

  return (
    <ContainerCenteredContent>
      <h1>Students List</h1>
      {students.map((student) => (
        <Link key={student.id} href="/student/[id]" as={student.id} passHref>
          <a>
            <h2>{`${student.lastName}, ${student.firstName}`}</h2>
          </a>
        </Link>
      ))}
    </ContainerCenteredContent>
  );
};

export default withApollo({ ssr: true })(AllStudentsPage);
