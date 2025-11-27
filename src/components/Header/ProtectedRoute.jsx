import React from 'react';
import { Navigate } from 'react-router-dom';
import keycloak from '../keycloak/Keycloak';

function ProtectedRoute({ children }) {
  if (!keycloak.authenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
