import React from "react";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { Box, Button, TextField, styled as muiStyled, Typography } from "@material-ui/core";
import ContainerCenteredContent from "../../components/styledComponents/ContainerCenteredContent";
import { withApollo } from "../../apollo/apollo";
import { CREATE_STUDENT } from "../../graphql/studentMutations";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = muiStyled(Box)({
  display: "flex",

  "&:not(last-of-type)": {
    "margin-bottom": "0.8em",
  },
});

const Input = muiStyled(TextField)({
  flex: "1",
});

const ErrorComponent = muiStyled(Typography)({
  color: "#f00",
  "margin-top": "1em",
});

const firstNameError = "First name is required";
const lastNameError = "Last name is required";
const studentNumberMissingError = "Student Number is required";
const studentNumberDuplicatedError = "Student Number already exists";

const CreateNewStudentPage: React.FC = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [studentNumber, setStudentNumber] = React.useState("");
  const [grade, setGrade] = React.useState("");

  const [createStudent, { loading, error }] = useMutation(CREATE_STUDENT);

  const errorMessage: string = React.useMemo(() => {
    let msg = "";
    if (error?.message.toLowerCase().includes(firstNameError.toLowerCase())) msg = firstNameError;
    else if (error?.message.toLowerCase().includes(lastNameError.toLowerCase())) msg = lastNameError;
    else if (error?.message.toLowerCase().includes(studentNumberMissingError.toLowerCase()))
      msg = studentNumberMissingError;
    else if (error?.message.toLowerCase().includes(studentNumberDuplicatedError.toLowerCase()))
      msg = studentNumberDuplicatedError;
    else if (error?.message.toLowerCase().includes("invalid input value for enum enum_students_grade"))
      msg = "Please input a grade between 1-12";
    return msg;
  }, [error?.message?.toLowerCase]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    createStudent({
      variables: { firstName, lastName, studentNumber, grade: Number(grade) || undefined },
    });
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <ContainerCenteredContent>
      <h1>Fill in the details below to create a new student account.</h1>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="text"
            label="Student's First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            variant="outlined"
            autoFocus
          />
        </InputContainer>
        <InputContainer>
          <Input
            type="text"
            label="Student's Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            variant="outlined"
            autoFocus
          />
        </InputContainer>
        <InputContainer>
          <Input
            type="text"
            label="Student Number"
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            variant="outlined"
            autoFocus
          />
        </InputContainer>
        <InputContainer>
          <Input
            type="text"
            label="Student's Grade or Year (1-12)"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            variant="outlined"
            autoFocus
          />
        </InputContainer>
        <Button type="submit" variant="contained" color="primary">
          Create New Student
        </Button>
      </Form>
      {errorMessage && <ErrorComponent variant="h5">Error: {errorMessage}</ErrorComponent>}
    </ContainerCenteredContent>
  );
};

export default withApollo({ ssr: true })(CreateNewStudentPage);
