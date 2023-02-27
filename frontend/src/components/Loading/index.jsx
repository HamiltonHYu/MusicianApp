import React, { memo } from 'react';
import styled from 'styled-components';

const LoadingBar = styled.div`
  background: grey;
  border-radius: 5px;
  width: 100%;
  height: 100%;
`;

const Loading = memo(() => <LoadingBar />);

export default Loading;
