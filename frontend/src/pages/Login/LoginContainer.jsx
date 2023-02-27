import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from 'Components/Loading';

import Login from './Login';

const ERROR_MESSAGE =
  'An error occurred while trying to log in. Please check username and password, and try again.';

const Error = lazy(() => import('Components/Error'));

const LoginContainer = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const clearErrors = () => setError('');

  useEffect(() => clearErrors, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (error) clearErrors();

    const {
      0: { value: email },
      1: { value: password },
    } = e.target;

    if (!email || !password) {
      setError('Please provide an email and a password.');
      return;
    }

    const body = JSON.stringify({
      email,
      password,
    });

    const req = {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const resp = await fetch('/api/v1/session', req);

      if (resp.ok) {
        const { id } = await resp.json();
        localStorage.setItem('id', id);
        navigate('/');
      } else {
        setError(ERROR_MESSAGE);
      }
    } catch (e) {
      setError(ERROR_MESSAGE);
    }
  };

  return (
    <>
      {error && (
        <Suspense fallback={<Loading />}>
          <Error error={error} handleClose={clearErrors} />
        </Suspense>
      )}
      <h2>Log In</h2>
      <Login handleSubmit={handleLogin} />
    </>
  );
};

export default LoginContainer;
