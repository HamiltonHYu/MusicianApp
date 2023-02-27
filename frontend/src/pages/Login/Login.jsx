import React from 'react';
import styled from 'styled-components';

import EmailPasswordInputs from 'Components/EmailPasswordInputs';
import { SignUpLoginButton as LoginButton } from 'Components/SignUpLoginButton';

const Submit = styled.input`
  width: 100%;
  margin: 12px 0;
`;

const Login = ({ handleSubmit }) => (
  <>
    <form onSubmit={handleSubmit}>
      <EmailPasswordInputs />
      <Submit type="submit" value="Login" />
    </form>
    <LoginButton />
  </>
);

export default Login;
