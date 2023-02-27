import React from 'react';

import GenreInputs from './GenreInputs';
import InstrumentInputs from './InstrumentInputs';
import SeekingInputs from './SeekingInputs';
import SkillLevelInputs from './SkillLevelInputs';

import {
  INSTRUMENTS,
  SEEKING,
  GENRES,
  SKILL_LEVEL,
} from '../../utils/constants';

const SearchSignUpInputs = ({ isSearch = true }) => (
  <>
    <label id={INSTRUMENTS} htmlFor={INSTRUMENTS}>
      What instruments do you play?
      <br />
      <InstrumentInputs />
    </label>
    <br />
    <label id={GENRES} htmlFor={GENRES}>
      What genres do you play?
      <br />
      <GenreInputs />
    </label>
    <br />
    <label id={SKILL_LEVEL} htmlFor={SKILL_LEVEL}>
      What's your approximate skill level?
      <br />
      <SkillLevelInputs type={isSearch ? 'checkbox' : 'radio'} />
    </label>
    <br />
    <label id={SEEKING} htmlFor={SEEKING}>
      What are you looking for?
      <br />
      <SeekingInputs />
    </label>
    <br />
  </>
);

export default SearchSignUpInputs;
