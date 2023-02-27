const { connect, connection, model, Schema } = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

const {
  GENRES,
  INSTRUMENTS,
  SEEKING,
  SKILL_LEVELS,
} = require('../utils/constants');

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const STRING = {
  type: String,
  required: true,
  default: '',
};

const UNIQUE_STRING = { ...STRING, unique: true };

const ARRAY = {
  type: Array,
  required: true,
  default: [],
};

connect(process.env.MONGO_URI);
connection.once('open', () => console.log('Connected to MongoDB.'));

const userModel = new Schema(
  {
    description: STRING,
    influences: STRING,
    // TODO: update once location services are figured out
    // location: STRING,
    location: {
      type: String,
      required: true,
      default: 'New York, NY',
    },
    name: STRING,
    passwordDigest: STRING,
    email: UNIQUE_STRING,
    id: UNIQUE_STRING,
    imageSrcs: ARRAY,
    skillLevel: {
      ...STRING,
      enum: {
        values: SKILL_LEVELS,
        message: '{VALUE} is not an accepted skill level.',
      },
    },
    genres: {
      ...ARRAY,
      validate: {
        validator: (genres) => genres.every((genre) => GENRES.has(genre)),
        message: ({ value }) => `${value} is not an accepted genre.`,
      },
    },
    instruments: {
      ...ARRAY,
      validate: {
        validator: (insts) => insts.every((inst) => INSTRUMENTS.has(inst)),
        message: ({ value }) => `${value} is not an accepted instrument.`,
      },
    },
    seeking: {
      ...ARRAY,
      validate: {
        validator: (seekings) =>
          seekings.every((seeking) => SEEKING.has(seeking)),
        message: ({ value }) => `${value} is not an accepted seeking value.`,
      },
    },
  },
  { timestamps: true }
);

// TODO: figure out how to run bycrpt work on callbacks

module.exports = model('User', userModel);
