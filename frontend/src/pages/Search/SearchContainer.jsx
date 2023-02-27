import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

import Loading from 'Components/Loading';

import SearchForm from './SearchForm';

import { getInputValues, shuffleUsers } from './utils';

const ERROR_MESSAGE =
  'An error occurred while searching. Please check the search parameters and try again.';

const SearchResults = lazy(() => import('./SearchResults'));
const LoadingResults = lazy(() => import('./LoadingResults'));
const Error = lazy(() => import('Components/Error'));
const NoResultsFound = lazy(() => import('./NoResultsFound'));

const SearchContainer = () => {
  const [users, setUsers] = useState([]);
  const [queryString, setQueryString] = useState('');
  const [skip, setSkip] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const location = useLocation();
  const closeErrors = () => setError('');

  useEffect(() => {
    const { state } = location;
    if (state) setError(state.error);
  }, []);

  useEffect(() => {
    if ((!queryString && !skip) || !hasMore) return;
    fetchUsers();
    if (isLoading) setIsLoading(false);
  }, [queryString]);

  const lastUserRef = useCallback(
    (user) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((users) => {
        if (users[0].isIntersecting) fetchUsers();
      });

      if (user) observer.current.observe(user);
    },
    [isLoading, hasMore]
  );

  const getNewQueryString = () => {
    const searchValues = getInputValues();

    const params = Object.entries(searchValues).reduce((acc, [key, val]) => {
      if (val) acc[key] = val;
      return acc;
    }, {});

    if (!Object.keys(params).length) {
      setError('Please add at least one search value.');
      return;
    }

    return new URLSearchParams(params).toString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    if (error) closeErrors();

    const newQueryString = getNewQueryString();
    if (!newQueryString || newQueryString === queryString) return;

    setQueryString(newQueryString);
    setSkip(0);
    setUsers([]);
  };

  const fetchUsers = async () => {
    try {
      const resp = await fetch(`/api/v1/users?${queryString}&skip=${skip}`);

      if (!resp.ok) {
        setError(ERROR_MESSAGE);
        return;
      }

      const results = await resp.json();
      if (!results.length) setHasMore(false);
      const newUsers = shuffleUsers(results);
      setUsers([...users, ...newUsers]);
      setSkip(skip + newUsers.length);
    } catch (e) {
      setError(ERROR_MESSAGE);
    }
  };

  return (
    <>
      <h2>Search</h2>
      <Suspense fallback={<Loading />}>
        {error && <Error error={error} handleClose={closeErrors} />}
      </Suspense>
      <SearchForm handleSubmit={handleSubmit} />
      <Suspense fallback={<Loading />}>
        {users.length > 0 && (
          <SearchResults users={users} lastUserRef={lastUserRef} />
        )}
        {!users.length && queryString && <NoResultsFound />}
        {isLoading && hasMore && <LoadingResults />}
      </Suspense>
    </>
  );
};

export default SearchContainer;
