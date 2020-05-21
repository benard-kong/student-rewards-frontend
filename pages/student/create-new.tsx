import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { withApollo } from "../../apollo/apollo";
import { CREATE_STUDENT_MUTATION } from "../../graphql/studentMutations";

const firstNameError = "First name is required";
const lastNameError = "Last name is required";
const studentNumberMissingError = "Student Number is required";
const studentNumberDuplicatedError = "Student Number already exists";

const CreateNewStudentPage: React.FC = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [studentNumber, setStudentNumber] = React.useState("");
  const [grade, setGrade] = React.useState("");

  const [createStudent, { loading, error }] = useMutation(CREATE_STUDENT_MUTATION);

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
    <div>
      {errorMessage && <h1>Error: {errorMessage}</h1>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input
          type="text"
          placeholder="Student number"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
        />
        <input type="text" placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
        <button type="submit">Create New Student</button>
      </form>
    </div>
  );
};

export default withApollo({ ssr: true })(CreateNewStudentPage);
