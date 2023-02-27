import React from 'react';

import EmailPasswordInputs from '../EmailPasswordInputs';

const DESCRIPTION = 'description';
const INFLUENCES = 'influences';

const SignUpInputs = () => (
  <>
    <EmailPasswordInputs />
    <label htmlFor={DESCRIPTION}>Description</label>
    <br />
    <textarea id={DESCRIPTION} name={DESCRIPTION} rows="4" cols="50" required />
    <br />
    <label htmlFor={INFLUENCES}>Influences</label>
    <br />
    <textarea id={INFLUENCES} name={INFLUENCES} rows="4" cols="50" required />
    <br />
  </>
);

export default SignUpInputs;
