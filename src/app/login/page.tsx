'use client';
import React, { Suspense } from 'react';
import LoginPage from './login';

const Login = () => {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
};

export default Login;
