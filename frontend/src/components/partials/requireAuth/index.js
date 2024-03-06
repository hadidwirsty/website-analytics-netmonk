import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { selectCurrentToken } from '../../../apps/features/auth/authSlice';

export function RequireAuth() {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return token ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
}

export default RequireAuth;
