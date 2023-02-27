/*
! NOTE: this file is to seed the database with fake users.
To seed, run the command `npm run seed` in the terminal.
TODO: add to .gitignore once app is ready for production.
*/

const { connect, connection } = require('mongoose');
const {
  faker: { datatype, internet, lorem, name },
} = require('@faker-js/faker');
const path = require('path');
const dotenv = require('dotenv');

const User = require('../models/userModel');
const {
  SKILL_LEVELS,
  SEEKING,
  GENRES,
  INSTRUMENTS,
} = require('../utils/constants');

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });
connect(process.env.MONGO_URI);

const getRandomSkillLevel = () => SKILL_LEVELS[Math.floor(Math.random() * 4)];

const getRandomValues = (set) => {
  const values = Array.from(set);
  const fakedValues = new Set();
  const { length } = values;
  const numValues = Math.floor(Math.random() * length) + 1;

  while (fakedValues.size < numValues) {
    const i = Math.floor(Math.random() * length);
    const val = values[i];
    if (!fakedValues.has(val)) fakedValues.add(val);
  }

  return Array.from(fakedValues);
};

const fakeUsers = [];

for (let i = 0; i < 1000; i++) {
  fakeUsers.push({
    id: datatype.uuid(),
    name: name.fullName(),
    email: internet.email(),
    passwordDigest: internet.password(),
    description: lorem.paragraph(),
    influences: lorem.paragraph(),
    skillLevel: getRandomSkillLevel(),
    instruments: getRandomValues(INSTRUMENTS),
    seeking: getRandomValues(SEEKING),
    genres: getRandomValues(GENRES),
  });
}

connect(process.env.MONGO_URI).then(async () => {
  await User.deleteMany({});
  fakeUsers.forEach(async (user, i) => {
    await User.create(user);
  });
  console.log('Fake users seeded. Okay to kill script.');
});
