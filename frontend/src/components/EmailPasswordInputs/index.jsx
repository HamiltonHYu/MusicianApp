import React from 'react';
import styled from 'styled-components';

const TEXT = 'text';
const EMAIL = 'email';
const PASSWORD = 'password';

const Input = styled.input`
  width: 100%;
`;

const EmailPasswordInputs = () => (
  <>
    <label htmlFor={EMAIL}>Email</label>
    <br />
    <Input type={TEXT} placeholder="cool_email420@gmail.com" required />
    <br />
    <label htmlFor={PASSWORD}>Password</label>
    <br />
    <Input type={PASSWORD} placeholder={PASSWORD} required />
    <br />
  </>
);

export default EmailPasswordInputs;
