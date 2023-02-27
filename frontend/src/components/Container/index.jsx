import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 700px;
  margin: 12px;
`;

const Container = ({ children }) => (
  <Background>
    <Wrapper>{children}</Wrapper>
  </Background>
);

export default Container;
