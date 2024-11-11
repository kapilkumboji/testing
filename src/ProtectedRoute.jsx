import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Firebase auth import

// Protected Route to check for logged-in users
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [user] = useAuthState(auth); // Get current user
  
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} /> // If user is logged in, render the component
        ) : (
          <Redirect to="/login" /> // If no user, redirect to login
        )
      }
    />
  );
};

export default ProtectedRoute;
