import React from "react";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { Box, Button, Checkbox, FormControlLabel, styled as muiStyled, TextField, Typography } from "@material-ui/core";
import ContainerCenteredContent from "../../../components/styledComponents/ContainerCenteredContent";
import { withApollo } from "../../../apollo/apollo";
import { CREATE_TEACHER, CREATE_ADMIN } from "../../../graphql/teacherMutations";

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
const emailExistsError = "Email already exists";

const CreateNewStudentPage: React.FC = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);

  const [createTeacher, { loading: createTeacherLoading, error: createTeacherError }] = useMutation(CREATE_TEACHER);
  const [createAdminTeacher, { loading: createAdminLoading, error: createAdminError }] = useMutation(CREATE_ADMIN);

  const errorMessage: string = React.useMemo(() => {
    let msg = "";
    const errMsg: string = createTeacherError?.message.toLowerCase() || createAdminError?.message.toLowerCase() || "";
    if (errMsg.toLowerCase().includes(firstNameError.toLowerCase())) msg = firstNameError;
    else if (errMsg.toLowerCase().includes(lastNameError.toLowerCase())) msg = lastNameError;
    else if (errMsg.toLowerCase().includes(emailExistsError.toLowerCase()))
      msg = "Oops, looks like that teacher's email already exists";
    return msg;
  }, [createTeacherError?.message?.toLowerCase, createAdminError?.message?.toLowerCase]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (isAdmin) createAdminTeacher({ variables: { firstName, lastName, email, password } });
    else
      createTeacher({
        variables: { firstName, lastName, email, password },
      });
  };

  if (createTeacherLoading || createAdminLoading) return <h1>Loading...</h1>;

  return (
    <ContainerCenteredContent>
      <h1>Fill in the details below to create a new admin or teacher account</h1>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="text"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            variant="outlined"
            autoComplete="off"
          />
        </InputContainer>
        <InputContainer>
          <Input
            type="text"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            variant="outlined"
            autoComplete="off"
          />
        </InputContainer>
        <InputContainer>
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            autoComplete="off"
          />
        </InputContainer>
        <InputContainer>
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            autoComplete="off"
          />
        </InputContainer>
        <FormControlLabel
          control={<Checkbox checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} color="primary" />}
          label="Admin User"
        />
        <Button type="submit" variant="contained" color="primary">
          Create New {isAdmin ? "Admin" : "Teacher"}
        </Button>
      </Form>
      {errorMessage && <ErrorComponent>Error: {errorMessage}</ErrorComponent>}
    </ContainerCenteredContent>
  );
};

export default withApollo({ ssr: true })(CreateNewStudentPage);
