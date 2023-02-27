import { getInputs } from './utils';
import { GENRES as GENRES_STR } from '../../utils/constants';

const GENRES = [
  'Rock',
  'Pop',
  'Jazz',
  'Hip-hop',
  'RnB',
  'Classical',
  'Electronic',
  'Country',
  'Metal',
  'Folk',
  'Other',
];

const GenreInputs = () => getInputs(GENRES, GENRES_STR);
export default GenreInputs;
