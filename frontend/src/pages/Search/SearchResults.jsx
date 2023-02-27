import React, { lazy, Suspense } from 'react';

import Loading from 'Components/Loading';

import SearchResult from './SearchResult';

const NoResultsFound = lazy(() => import('./NoResultsFound'));

const SearchResults = ({ users, lastUserRef }) => {
  const lastIdx = users.length - 1;

  const results = users.map((user, i) => (
    <li ref={i === lastIdx ? lastUserRef : undefined} key={user.id}>
      <SearchResult user={user} />
    </li>
  ));

  return (
    <>
      {results.length ? (
        <ul>{results}</ul>
      ) : (
        <Suspense fallback={<Loading />}>
          <NoResultsFound />
        </Suspense>
      )}
    </>
  );
};

export default SearchResults;
