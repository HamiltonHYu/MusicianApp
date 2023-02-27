import { getSelectedValuesFromInputs } from '../utils';
import {
  INSTRUMENTS,
  SEEKING,
  GENRES,
  SKILL_LEVEL,
} from '../../utils/constants';

export const getInputValues = () => ({
  instruments: getSelectedValuesFromInputs(INSTRUMENTS),
  genres: getSelectedValuesFromInputs(GENRES),
  seeking: getSelectedValuesFromInputs(SEEKING),
  skillLevel: getSelectedValuesFromInputs(SKILL_LEVEL),
});

export const shuffleUsers = (users) => {
  const shuffledUsers = Array.from(users);

  for (let i = shuffledUsers.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledUsers[i], shuffledUsers[randomIndex]] = [
      shuffledUsers[randomIndex],
      shuffledUsers[i],
    ];
  }

  return shuffledUsers;
};
