import { getRole } from './cookie';

export const items = {
  ACTIVE_USERS: 'active_users',
  CUSTOMER_MANAGEMENT: 'customer_management',
  DEVICE_PELANGGAN: 'device_pelanggan',
  EMPLOYEES: 'employees',
  NETMONK: 'netmonk',
  NETMONK_FULFILLMENT: 'netmonk_fulfillment',
  NETMONK_PRIME: 'netmonk_prime',
  ORDER_NCX: 'order_ncx',
  ORDER_SCONE: 'order_scone',
  OVERVIEW: 'overview',
  TRACKING_ORDER_NCX: 'tracking_order_ncx',
  USERS: 'users'
};

export const acc = {
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
};

const rules = [
  {
    role: 'root',
    access: [
      { name: items.ACTIVE_USERS, permission: [] },
      { name: items.CUSTOMER_MANAGEMENT, permission: [] },
      { name: items.DEVICE_PELANGGAN, permission: [] },
      { name: items.EMPLOYEES, permission: [acc.CREATE, acc.READ, acc.UPDATE, acc.DELETE] },
      { name: items.NETMONK, permission: [acc.READ] },
      { name: items.NETMONK_FULFILLMENT, permission: [acc.READ] },
      { name: items.NETMONK_PRIME, permission: [] },
      { name: items.ORDER_NCX, permission: [acc.READ] },
      { name: items.ORDER_SCONE, permission: [acc.READ] },
      { name: items.OVERVIEW, permission: [acc.READ] },
      { name: items.TRACKING_ORDER_NCX, permission: [] },
      { name: items.USERS, permission: [acc.READ] }
    ]
  },
  {
    role: 'fulfillment',
    access: [
      { name: items.ACTIVE_USERS, permission: [] },
      { name: items.CUSTOMER_MANAGEMENT, permission: [acc.READ] },
      { name: items.DEVICE_PELANGGAN, permission: [acc.READ] },
      { name: items.EMPLOYEES, permission: [] },
      { name: items.NETMONK, permission: [] },
      { name: items.NETMONK_FULFILLMENT, permission: [acc.READ] },
      { name: items.NETMONK_PRIME, permission: [acc.READ] },
      { name: items.ORDER_NCX, permission: [acc.CREATE, acc.READ, acc.UPDATE] },
      { name: items.ORDER_SCONE, permission: [acc.CREATE, acc.READ, acc.UPDATE] },
      { name: items.OVERVIEW, permission: [acc.READ] },
      { name: items.TRACKING_ORDER_NCX, permission: [acc.READ] },
      { name: items.USERS, permission: [] }
    ]
  },
  {
    role: 'po-netmonk',
    access: [
      { name: items.ACTIVE_USERS, permission: [acc.READ] },
      { name: items.CUSTOMER_MANAGEMENT, permission: [] },
      { name: items.DEVICE_PELANGGAN, permission: [acc.READ] },
      { name: items.EMPLOYEES, permission: [] },
      { name: items.NETMONK, permission: [acc.READ] },
      { name: items.NETMONK_FULFILLMENT, permission: [] },
      { name: items.NETMONK_PRIME, permission: [acc.READ] },
      { name: items.ORDER_NCX, permission: [] },
      { name: items.ORDER_SCONE, permission: [] },
      { name: items.OVERVIEW, permission: [acc.READ] },
      { name: items.TRACKING_ORDER_NCX, permission: [] },
      { name: items.USERS, permission: [] }
    ]
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
