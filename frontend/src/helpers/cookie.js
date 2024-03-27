import { useSelector } from 'react-redux';

export const getRole = () => {
  const userDetails = useSelector((state) => state.auth.userDetails);
  return userDetails ? userDetails.role : null;
};
