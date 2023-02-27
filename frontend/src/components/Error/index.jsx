import React from 'react';

const Error = ({ error, handleClose }) => (
  <div>
    <h3>Error</h3>
    <p>{error}</p>
    <button onClick={handleClose}>Close</button>
  </div>
);

export default Error;
