import React from 'react';

import SearchSignUpInputs from 'Components/SearchSignUpInputs';

const SearchForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <SearchSignUpInputs handleSubmit={handleSubmit} />
    <input type="submit" value="Search" />
  </form>
);

export default SearchForm;
