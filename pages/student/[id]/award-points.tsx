import React from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { withApollo } from "../../../apollo/apollo";
import { Student } from "../../../typeDefs/typeDefs";
import { FIND_STUDENT } from "../../../graphql/studentQueries";
import { ADD_POINTS } from "../../../graphql/studentMutations";

const AwardPointsPage = () => {
  const [numPoints, setNumPoints] = React.useState(1);
  const router = useRouter();
  const { id }: { id?: string } = router.query;
  const { data, error, loading } = useQuery(FIND_STUDENT, { variables: { studentId: id } });
  const [addPoints, { error: addPointsError, loading: addPointsLoading }] = useMutation(ADD_POINTS);

  const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const noDecimals: string = e.target.value.replace(".", "");
    if (noDecimals) {
      let val: number = parseInt(noDecimals, 10);
      if (val < 0) val = 0;

      setNumPoints(val);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const res = await addPoints({ variables: { studentId: id, numPoints } });
    if (res?.data?.addPoints) router.push(`/student/${id}`);
  };

  if (error) return <h1>Error: {error.message}</h1>;
  if (addPointsError) return <h1>Error: {addPointsError.message}</h1>;
  if (loading || addPointsLoading) return <h1>Loading...</h1>;

  const { findStudent: student }: { findStudent: Student } = data;

  return (
    <div>
      <h1>
        Award how many points to {student.firstName} {student.lastName}?
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          step="1"
          value={numPoints}
          onChange={handleNumChange}
          autoFocus // eslint-disable-line jsx-a11y/no-autofocus
        />
        <button type="submit">{`Award ${numPoints} point${numPoints !== 1 ? "s" : ""}`}</button>
      </form>
    </div>
  );
};

export default withApollo({ ssr: true })(AwardPointsPage);
