import React from 'react';

const SEEKING = [
  {
    key: 'jam',
    value: 'Jam around',
  },
  {
    key: 'local',
    value: 'Play local shows',
  },
  {
    key: 'paying',
    value: 'Play paying gigs (weddings, bar mitzvahs, etc)',
  },
  {
    key: 'pro',
    value: 'Be a professional musician',
  },
  {
    key: 'teach',
    value: 'Give lessons',
  },
  {
    key: 'learn',
    value: 'Take lessons',
  },
];

const SeekingInputs = () =>
  SEEKING.map(({ key, value }) => (
    <div key={key}>
      <input id={key} name={key} type="checkbox" />
      <label htmlFor={key}>{value}</label>
      <br />
    </div>
  ));

export default SeekingInputs;
