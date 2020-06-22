import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Container } from "@material-ui/core";
import { withApollo } from "../apollo/apollo";

const ContentContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  text-align: center;
`;

const IndexPage: React.FC = () => {
  return (
    <Container>
      <ContentContainer>
        <h1>Welcome to the Student Rewards Website</h1>
        <p>
          Are you a teacher at this school? Please <Link href="/login">sign in</Link>.
        </p>
      </ContentContainer>
    </Container>
  );
};

export default withApollo({ ssr: true })(IndexPage);
