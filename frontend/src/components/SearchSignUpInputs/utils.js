import React from 'react';

export const getInputs = (arr, type) =>
  arr.map((el) => {
    const key = el.split(' ').join('').toLowerCase();
    return (
      <div key={key}>
        <input id={key} name={type} type="checkbox" />
        <label htmlFor={key}>{el}</label>
        <br />
      </div>
    );
  });
