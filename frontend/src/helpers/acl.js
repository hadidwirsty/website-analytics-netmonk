import { getRole } from './cookie';

export const items = {};

export const acc = {
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
};

const rules = [
  {
    role: 'root',
    access: []
  },
  {
    role: 'fulfillment',
    access: []
  },
  {
    role: 'product-owner',
    access: []
  }
];

export const hasAccess = (item, perm) => {
  const userRole = getRole();
  if (userRole === null) return false;
  const find = rules.filter((el) => el.role === userRole);
  if (find.length === 0) return false;
  const { access } = rules.filter((el) => el.role === userRole)[0];
  const permission = access.filter((el) => el.name === item)[0]?.permission;
  if (permission !== undefined) {
    if (permission.includes(perm)) return true;
  }
  return false;
};

export default {
  hasAccess
};
