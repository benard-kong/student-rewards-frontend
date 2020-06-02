import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { withApollo } from "../../../apollo/apollo";
import { CREATE_TEACHER, CREATE_ADMIN } from "../../../graphql/teacherMutations";

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
    <div>
      {errorMessage && <h1>Error: {errorMessage}</h1>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Grade" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div>
          <input id="admin-checkbox" type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
          <label htmlFor="admin-checkbox">Admin User</label>
        </div>
        <button type="submit">Create New {isAdmin ? "Admin" : "Teacher"}</button>
      </form>
    </div>
  );
};

export default withApollo({ ssr: true })(CreateNewStudentPage);
