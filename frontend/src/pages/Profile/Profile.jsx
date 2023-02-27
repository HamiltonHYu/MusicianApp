import React from 'react';

import { formatValues } from '../utils';

const Profile = ({
  name,
  influences,
  location,
  description,
  seeking,
  skillLevel,
  // imageSrcs,
  genres,
  instruments,
}) => {
  // const images = imageSrcs.map((src, i) => (
  //   <img key={`${i}-img`} src={src} />
  // ));

  const userFieldsAndValues = [
    { Name: name },
    { Location: location },
    { About: description },
    { Influences: influences },
    { Instruments: formatValues(instruments) },
    { Genres: formatValues(genres) },
    { 'Looking in': formatValues(seeking) },
    { 'Skill level': skillLevel },
  ];

  const userInfo = userFieldsAndValues.map(({ field, val }) => (
    <div>
      <b>{field}:</b> {val}
    </div>
  ));

  return (
    <>
      <h2>Profile page</h2>
      {/* <div>{images}</div> */}
      {userInfo}
    </>
  );
};

export default Profile;
