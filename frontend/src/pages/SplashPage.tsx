// src/pages/SplashPage.tsx
import React from 'react';
import NavBar from '../components/NavBar/NavBar';

const SplashPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <div style={{ padding: '2rem' }}>
        <h1>Welcome to the Employee App</h1>
        <p>Login form placeholder</p>
      </div>
    </>
  );
};

export default SplashPage;
