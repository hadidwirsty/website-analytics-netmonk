import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../../apps/features/auth/authSlice';

export function RequireAuth() {
  const localStorageToken = localStorage.getItem('accessToken');
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return token || localStorageToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
export default RequireAuth;
