import { getInputs } from './utils';
import { INSTRUMENTS as INSTRUMENTS_STR } from '../../utils/constants';

const INSTRUMENTS = [
  'Guitar',
  'Bass',
  'Drums',
  'Piano',
  'Banjo',
  'Violin',
  'Viola',
  'Cello',
  'Mandolin',
  'Dj',
  'Producer',
  'Saxophone',
  'Oboe',
  'Trumpet',
  'Trombone',
  'Tuba',
  'Percussian',
  'Sing',
  'Rap',
  'Synthesizer',
  'Electronics',
  'Other',
];

const InstrumentInputs = () => getInputs(INSTRUMENTS, INSTRUMENTS_STR);
export default InstrumentInputs;
