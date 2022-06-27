import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';
import { useContext } from 'react';

const PrivateRoute = () => {
  // const auth = null; // determine if authorized, from context or however you're doing it
  const { user } = useContext(AuthContext);

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
