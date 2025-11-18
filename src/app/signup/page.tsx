import React, { Suspense } from 'react';
import SignupPage from './signup';

const Signup = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupPage />
    </Suspense>
  );
};

export default Signup;
