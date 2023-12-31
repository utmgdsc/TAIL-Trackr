import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function EmailVerif() {
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const id = queryParameters.get("id");
  const baseURL = "http://127.0.0.1:5000";
  const [error, setError] = useState(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      setError(null);
      const user = JSON.parse(localStorage.getItem('user'));

      if (user && id === user._id) {
        const response = await fetch(baseURL + '/api/verify/', {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });

        const json = await response.json();

        if (!response.ok) {
          setError(json.Error);
        }

        if (response.ok) {
          user.verified = true;
          localStorage.setItem("user", JSON.stringify(json));
          console.log('User verified!');
          setVerified(true);
        }
      }
      window.location.reload()
    };

    verifyUser();
  }, [id, baseURL]);

  return (
    <div className="verification-container">
      {verified ? (
        <h1>Thank you for verifying your email</h1>
      ) : error ? (
        <div>Sorry, an error has occured</div>
      ) : (
        <h1>Sorry, your email has not been verified</h1>
      )}
    </div>
  );
}