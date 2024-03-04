export const getRole = () => {
  const role = localStorage.getItem('role');
  return role || null;
};
