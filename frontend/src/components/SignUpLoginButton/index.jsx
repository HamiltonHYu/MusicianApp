import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const SignUpLoginButton = memo(({ isLoginPage = true }) => (
  <button>
    <Link to={isLoginPage ? '/signup' : '/login'}>
      {isLoginPage
        ? 'Need to create an account? Sign up!'
        : 'Already have an account? Login!'}
    </Link>
  </button>
));

export default SignUpLoginButton;
