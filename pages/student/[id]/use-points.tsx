import React from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Box, Button, styled, TextField } from "@material-ui/core";
import ContainerCenteredContent from "../../../components/styledComponents/ContainerCenteredContent";
import { withApollo } from "../../../apollo/apollo";
import { USE_POINTS } from "../../../graphql/studentMutations";
import { FIND_STUDENT } from "../../../graphql/studentQueries";
import { Student } from "../../../typeDefs/typeDefs";

const ButtonsContainer = styled(Box)({
  display: "flex",
  "flex-direction": "column",
});

const Input = styled(TextField)({
  flex: "0 1 25%",
  "margin-right": "0.8em",
});

const ButtonContainer = styled(Box)({
  display: "flex",

  "&:not(last-of-type)": {
    "margin-bottom": "0.8em",
  },
});

const SubmitButton = styled(Button)({
  flex: "1",
});

const depletePointsError = "Validation error: Points cannot be less than 0";

const UsePointsPage: React.FC = () => {
  const router = useRouter();
  const { id }: { id?: string } = router.query;
  const { loading, error, data } = useQuery(FIND_STUDENT, { variables: { studentId: id } });
  const [singlePointsValue, setSinglePointsValue] = React.useState(1);

  const [depletePoints, { error: usePointsError }] = useMutation(USE_POINTS);

  const insufficientPoints = React.useMemo(() => {
    let msg = "";
    if (usePointsError?.message?.toLowerCase().includes(depletePointsError.toLowerCase()))
      msg = "Student does not have enough points";
    return msg;
  }, [usePointsError?.message?.toLowerCase]);

  const handleSinglePointsValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const noDecimals: string = e.target.value.replace(".", "");
    if (noDecimals) {
      let val: number = parseInt(noDecimals, 10);
      if (val < 0) val = 0;

      setSinglePointsValue(val);
    }
  };

  const handleClickParticipationPoints = async () => {
    await depletePoints({ variables: { studentId: id, numPoints: singlePointsValue * 1 } });
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
    <ContainerCenteredContent>
      <h1>
        {student.firstName} {student.lastName}
      </h1>
      <h2>Student Number: {student.studentNumber}</h2>
      <h3>Points: {student.numPoints}</h3>
      {insufficientPoints && <h1>{insufficientPoints}</h1>}
      <p>Use Points for...</p>
      <ButtonsContainer>
        <ButtonContainer>
          <Input
            type="number"
            value={singlePointsValue}
            onChange={handleSinglePointsValueChange}
            variant="outlined"
            autoFocus
          />
          <SubmitButton type="submit" variant="contained" color="primary" onClick={handleClickParticipationPoints}>
            Participation Points ({singlePointsValue} point{singlePointsValue !== 1 && "s"})
          </SubmitButton>
        </ButtonContainer>
        <ButtonContainer>
          <SubmitButton type="submit" variant="contained" color="primary" onClick={handleClickLateMarks}>
            Late Attendance (15 points)
          </SubmitButton>
        </ButtonContainer>
        <ButtonContainer>
          <SubmitButton type="submit" variant="contained" color="primary" onClick={handleClickDetention}>
            Detention (35 points)
          </SubmitButton>
        </ButtonContainer>
        <ButtonContainer>
          <SubmitButton type="submit" variant="contained" color="primary" onClick={handleClickDropQuiz}>
            Drop an Assignment (50 points)
          </SubmitButton>
        </ButtonContainer>
        <ButtonContainer>
          <SubmitButton type="submit" variant="contained" color="primary" onClick={handleClickNoUniform}>
            No Uniform (100 points)
          </SubmitButton>
        </ButtonContainer>
      </ButtonsContainer>
    </ContainerCenteredContent>
  );
};

export default withApollo({ ssr: true })(UsePointsPage);
