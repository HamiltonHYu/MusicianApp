import React from 'react';

import { SKILL_LEVEL } from '../../utils/constants';

const SKILL_LEVELS = ['Beginner', 'Middle', 'Advanced', 'Professional'];

const SkillLevelInputs = ({ type = 'checkbox' }) =>
  SKILL_LEVELS.map((level) => {
    const key = level.toLowerCase();
    return (
      <div key={key}>
        <input id={key} name={SKILL_LEVEL} type={type} />
        <label htmlFor={key}>{level}</label>
        <br />
      </div>
    );
  });

export default SkillLevelInputs;
