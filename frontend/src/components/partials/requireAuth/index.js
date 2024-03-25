import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../../apps/features/auth/authSlice';

export function RequireAuth() {
  const localStorageToken = localStorage.getItem('accessToken');
  const location = useLocation();
  const token = useSelector(selectCurrentToken);

  const isAuthenticated = token || localStorageToken;

  if (isAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to="/401" state={{ from: location }} replace />;
}

export default RequireAuth;
