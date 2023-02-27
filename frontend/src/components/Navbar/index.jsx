import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px;
`;

const NavCluster = styled.div`
  display: flex;
  > * {
    margin: 12px;
  }
`;

const Navbar = memo(() => {
  /*
  // TODO: should this be a prop?
  const id = localStorage.getItem('id');
  // TODO: remove default
  const profileLink = `/users/${id || 'fd160117-7e26-414f-ab03-fec4cdfcf77d'}`;
  */
  const profileLink = '/users/fd160117-7e26-414f-ab03-fec4cdfcf77d';

  return (
    <Container>
      <NavCluster>
        <Link to="/search">Search</Link>
      </NavCluster>
      <NavCluster>
        <Link to={profileLink}>Sample profile</Link>
        <Link to="/login">Sign out</Link>
      </NavCluster>
    </Container>
  );
});

export default Navbar;
