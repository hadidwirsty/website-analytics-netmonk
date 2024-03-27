import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { getRole } from '../../../helpers/cookie';

export function RequireAuth({ allowedRoles }) {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  const isAuthenticated = !!token;
  const userRoles = getRole();

  const hasRequiredRole = () => {
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }
    return allowedRoles.some((role) => userRoles.includes(role));
  };

  if (isAuthenticated && hasRequiredRole()) {
    return <Outlet />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/401" state={{ from: location }} replace />;
  }
  return <Navigate to="/403" state={{ from: location }} replace />;
}

export default RequireAuth;
