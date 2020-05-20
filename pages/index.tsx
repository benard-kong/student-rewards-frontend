import React from "react";
import styled from "styled-components";
import { withApollo } from "../apollo/apollo";

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const IndexPage: React.FC = () => {
  return (
    <div>
      <Title>Hello World</Title>
    </div>
  );
};

export default withApollo({ ssr: true })(IndexPage);
