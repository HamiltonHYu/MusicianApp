import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Loading from 'Components/Loading';

import SignUp from './SignUp';

import { getSelectedValuesFromInputs } from '../utils';
import { INSTRUMENTS, SEEKING, GENRES } from '../../utils/constants';

const ERROR_MESSAGE =
  'An error occurred while trying to sign up. Please check all values and try again.';

const Error = lazy(() => import('Components/Error'));

const SignUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0;
`;

const SignUpContainer = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const clearErrors = () => setError('');

  useEffect(() => clearErrors, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (error) clearErrors();

    const {
      0: { value: name },
      1: { value: email },
      2: { value: password },
      3: { value: description },
      4: { value: influences },
    } = e.target;

    const instruments = getSelectedValuesFromInputs(INSTRUMENTS);
    const genres = getSelectedValuesFromInputs(GENRES);
    const seeking = getSelectedValuesFromInputs(SEEKING);
    const skillLevel = document.querySelector('#skillLevel input:checked').id;

    let body = {
      name,
      email,
      password,
      instruments,
      genres,
      seeking,
      skillLevel,
      description,
      influences,
    };

    let missingKeys = Object.keys(body).filter((key) => !body[key]);

    if (missingKeys.length) {
      missingKeys = missingKeys.join(', ');
      const errorMessage = `Please check the following values: ${missingKeys}`;
      setError(errorMessage);
      return;
    }

    body = JSON.stringify(body);

    const req = {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const resp = await fetch('/api/v1/users', req);

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
    <SignUpWrapper>
      <div>
        {error && (
          <Suspense fallback={<Loading />}>
            <Error error={error} handleClose={clearErrors} />
          </Suspense>
        )}
        <h2>Sign Up</h2>
        <SignUp handleSubmit={handleSignUp} />
      </div>
    </SignUpWrapper>
  );
};

export default SignUpContainer;
