import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Loading from 'Components/Loading';
import Container from 'Components/Container';

const Login = lazy(() => import('Pages/Login'));
const Navbar = lazy(() => import('Components/Navbar'));
const Profile = lazy(() => import('Pages/Profile'));
const Search = lazy(() => import('Pages/Search'));
const SignUp = lazy(() => import('Pages/SignUp'));

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Navbar />
      <Container>
        <Routes>no
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
          <Route path="/users" element={<Search />} />
          <Route path="/users/:id" element={<Profile />} />
          <Route path="/" element={<Search />} />
          <Route path="*" element={<Search />} />
        </Routes>
      </Container>
    </Suspense>
  </BrowserRouter>
);

export default App;
