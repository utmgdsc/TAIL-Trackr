import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function EmailVerif() {
  const location = useLocation()
  const queryParameters = new URLSearchParams(location.search)
  const id = queryParameters.get("id")

  const user = JSON.parse(localStorage.getItem('user'));
  const verified = user && id === user._id;

  if (verified) {
    const user = JSON.parse(localStorage.getItem('user'));
    user.verified = true;
    localStorage.setItem('user', JSON.stringify(user));
    console.log('User verified!');
  }

  return (
    <div className="verification-container">
      {verified ? (
        <h1>Thank you for verifying your email</h1>
      ) : (
        <h1>Sorry, your email has not been verified</h1>
      )}
    </div>
  );
}