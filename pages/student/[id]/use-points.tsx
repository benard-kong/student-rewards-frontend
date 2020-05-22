import React from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { withApollo } from "../../../apollo/apollo";
import { USE_POINTS } from "../../../graphql/studentMutations";
import { FIND_STUDENT } from "../../../graphql/studentQueries";
import { Student } from "../../../typeDefs/typeDefs";

const depletePointsError = "Validation error: Points cannot be less than 0";

const UsePointsPage: React.FC = () => {
  const router = useRouter();
  const { id }: { id?: string } = router.query;
  const { loading, error, data } = useQuery(FIND_STUDENT, { variables: { studentId: id } });

  const [depletePoints, { error: usePointsError }] = useMutation(USE_POINTS);

  const insufficientPoints = React.useMemo(() => {
    let msg = "";
    if (usePointsError?.message?.toLowerCase().includes(depletePointsError.toLowerCase()))
      msg = "Student does not have enough points";
    return msg;
  }, [usePointsError?.message?.toLowerCase]);

  const handleClickParticipationPoints = async () => {
    await depletePoints({ variables: { studentId: id, numPoints: 1 } });
    router.push(`/student/${id}`);
  };

  const handleClickLateMarks = async () => {
    await depletePoints({ variables: { studentId: id, numPoints: 15 } });
    router.push(`/student/${id}`);
  };

  const handleClickDetention = async () => {
    await depletePoints({ variables: { studentId: id, numPoints: 35 } });
    router.push(`/student/${id}`);
  };

  const handleClickDropQuiz = async () => {
    await depletePoints({ variables: { studentId: id, numPoints: 50 } });
    router.push(`/student/${id}`);
  };

  const handleClickNoUniform = async () => {
    await depletePoints({ variables: { studentId: id, numPoints: 100 } });
    router.push(`/student/${id}`);
  };

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
      {insufficientPoints && <h1>{insufficientPoints}</h1>}
      <p>Use Points for...</p>
      <div>
        <button type="submit" onClick={handleClickParticipationPoints}>
          Participation Points (1 point)
        </button>
        <button type="submit" onClick={handleClickLateMarks}>
          Late Attendance (15 points)
        </button>
        <button type="submit" onClick={handleClickDetention}>
          Detention (35 points)
        </button>
        <button type="submit" onClick={handleClickDropQuiz}>
          Drop an Assignment (50 points)
        </button>
        <button type="submit" onClick={handleClickNoUniform}>
          No Uniform (100 points)
        </button>
      </div>
    </div>
  );
};

export default withApollo({ ssr: true })(UsePointsPage);
