import React, { memo } from 'react';
import EmailPasswordInputs from 'Components/EmailPasswordInputs';
import SearchSignUpInputs from 'Components/SearchSignUpInputs';
import { SignUpLoginButton as SignUpButton } from 'Components/SignUpLoginButton';

const SignUp = memo(({ handleSubmit }) => (
  <>
    <SignUpButton isLoginPage={false} />
    <form onSubmit={handleSubmit}>
      <EmailPasswordInputs />
      <SearchSignUpInputs isSearch={false} handleSubmit={handleSubmit} />
      <input type="submit" value="Sign Up" />
    </form>
  </>
));

export default SignUp;
