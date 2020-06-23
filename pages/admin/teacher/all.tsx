import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import ContainerCenteredContent from "../../../components/styledComponents/ContainerCenteredContent";
import { withApollo } from "../../../apollo/apollo";
import { QUERY_ALL_TEACHERS } from "../../../graphql/teacherQueries";
import { Teacher } from "../../../typeDefs/typeDefs";
import { compareTeachers } from "../../../utils/compareFunctions";

const AllStudentsPage: React.FC = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(QUERY_ALL_TEACHERS);

  if (error) {
    const msg = error.message;
    if (msg.toLowerCase().includes("not authorised")) router.push("/login");
    return <h1>Error: {msg}</h1>;
  }
  if (loading) return <h1>Loading...</h1>;

  const { allUsers }: { allUsers: Teacher[] } = data;
  const teachers = allUsers.sort(compareTeachers);

  return (
    <ContainerCenteredContent>
      <h1>Teachers List</h1>
      {teachers.map((teacher) => (
        <div key={teacher.id}>
          <Link href="/admin/teacher/[id]" as={`${teacher.id}`} passHref>
            <a>
              <h2>{`${teacher.lastName}, ${teacher.firstName}`}</h2>
            </a>
          </Link>
        </div>
      ))}
    </ContainerCenteredContent>
  );
};

export default withApollo({ ssr: true })(AllStudentsPage);
