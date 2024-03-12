import { useSelector } from 'react-redux';
import { selectCurrentUserDetails } from '../apps/features/auth/authSlice';

export const getRole = () => {
  const { role: reduxRole } = useSelector(selectCurrentUserDetails);
  const role = reduxRole || localStorage.getItem('role');

  return role;
};
