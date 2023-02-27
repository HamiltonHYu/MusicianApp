// TODO: move constants to private NPM package so that I don't have to manually sync

const KEYS_TO_SPLIT_TO_ARRAYS = ['genres', 'instruments', 'seeking'];

const KEYS_TO_SPLIT_TO_ARRAYS_SET = new Set(KEYS_TO_SPLIT_TO_ARRAYS);

const ALLOWED_PARAMS_FOR_SEARCH = [
  ...KEYS_TO_SPLIT_TO_ARRAYS,
  // 'location',
  'skillLevel',
];

const ALLOWED_PARAMS_FOR_CREATE_USER = [
  ...ALLOWED_PARAMS_FOR_SEARCH,
  'description',
  'email',
  'influences',
  'name',
  'password',
];

const INSTRUMENTS = new Set([
  'guitar',
  'bass',
  'drums',
  'piano',
  'banjo',
  'violin',
  'viola',
  'cello',
  'mandolin',
  'dj',
  'producer',
  'saxophone',
  'oboe',
  'trumpet',
  'trombone',
  'tuba',
  'percussian',
  'sing',
  'rap',
  'synthesizer',
  'electronics',
  'other',
]);

const GENRES = new Set([
  'rock',
  'pop',
  'jazz',
  'hip-hop',
  'rnb',
  'electronic',
  'metal',
  'country',
  'blues',
  'classical',
  'folk',
  'reggae',
  'other',
]);

const SEEKING = new Set(['jam', 'local', 'paying', 'pro', 'teach', 'learn']);

const SKILL_LEVELS = ['beginner', 'middle', 'advanced', 'professional'];

module.exports = {
  ALLOWED_PARAMS_FOR_CREATE_USER,
  ALLOWED_PARAMS_FOR_SEARCH,
  KEYS_TO_SPLIT_TO_ARRAYS_SET,
  INSTRUMENTS,
  GENRES,
  SEEKING,
  SKILL_LEVELS,
};
