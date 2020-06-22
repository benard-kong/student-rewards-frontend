import React from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button, Container, TextField, styled } from "@material-ui/core";
import { withApollo } from "../apollo/apollo";

const OuterContainer = styled(Container)({
  "text-align": "center",
});

const InputsContainer = styled(Container)({
  display: "flex",
  "flex-direction": "column",
  "font-size": "1rem",
});

const Input = styled(TextField)({
  "margin-bottom": "1em",
});

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  if (loading) return <h1>Loading...</h1>;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const res = await login({ variables: { email, password } });
    const token: string = res.data.login;
    localStorage.setItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_TOKEN_KEY_NAME!, token);
    const { redirect }: { redirect?: string } = router.query;
    const finalRedirectString: string = redirect ? `/${redirect}` : "/";
    await router.push(finalRedirectString);
  };

  return (
    <OuterContainer>
      <h1>Please enter your email and password to log in.</h1>
      <form onSubmit={handleSubmit}>
        <InputsContainer maxWidth="sm">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </InputsContainer>
      </form>
    </OuterContainer>
  );
};

export default withApollo({ ssr: true })(LoginPage);
