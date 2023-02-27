import React from 'react';
import { Link } from 'react-router-dom';
import { formatValues } from '../utils';

const SearchResult = ({ user }) => {
  const { id, instruments, skillLevel, seeking, genres, name } = user;

  const formattedGenres = formatValues(genres);
  const formattedInstruments = formatValues(instruments);
  const formattedSeeking = formatValues(seeking);

  return (
    <>
      <Link to={`/users/${id}`} state={user}>
        <div>{name}</div>
      </Link>
      <div>Instruments: {formattedInstruments}</div>
      <div>Skill level: {skillLevel}</div>
      <div>Looking for: {formattedSeeking}</div>
      <div>Genres: {formattedGenres}</div>
    </>
  );
};

export default SearchResult;
