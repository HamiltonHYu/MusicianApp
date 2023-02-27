export const getSelectedValuesFromInputs = (selector) => {
  const selected = document.querySelectorAll(`#${selector} input:checked`);
  const ids = new Array(selected.length);
  selected.forEach(({ id }, i) => (ids[i] = id));
  return ids.join(',');
};

export const formatValues = (vals) => vals.join(', ');
