import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Loading from 'Components/Loading';

import Profile from './Profile';

const ERROR_MESSAGE =
  'An error occurred while getting this profile. Please try again.';

const Error = lazy(() => import('Components/Error'));

const ProfileContainer = () => {
  const { id } = useParams();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const clearErrors = () => setError('');

  const fetchUser = async () => {
    try {
      const resp = await fetch(`/api/v1/users/${id}`);

      if (resp.ok) {
        const user = await resp.json();
        setUser(user);
      } else {
        setError(ERROR_MESSAGE);
      }
    } catch (e) {
      navigate('/search', {
        state: { replace: true, error: ERROR_MESSAGE },
      });
    }
  };

  useEffect(() => {
    const { state } = location;

    if (state) {
      setUser(state);
      return;
    }

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) setIsLoading(false);
  }, [user]);

  if (isLoading) return <div>Loading</div>;

  return (
    <>
      {error && (
        <Suspense fallback={<Loading />}>
          <Error error={error} handleClose={clearErrors} />
        </Suspense>
      )}
      <Profile {...user} />
    </>
  );
};

export default ProfileContainer;
