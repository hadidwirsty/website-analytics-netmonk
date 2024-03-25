import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRole } from '../../../helpers/cookie';
import { selectCurrentToken } from '../../../apps/features/auth/authSlice';

export function RequireAuth({ allowedRoles }) {
  const localStorageToken = localStorage.getItem('accessToken');
  const location = useLocation();
  const token = useSelector(selectCurrentToken);

  const isAuthenticated = token || localStorageToken;
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
