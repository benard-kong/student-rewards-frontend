import React from "react";
import { NextComponentType } from "next/types";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../apollo/apollo";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const LoginPage: NextComponentType = () => {
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
    <form onSubmit={handleSubmit}>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default withApollo({ ssr: true })(LoginPage);
