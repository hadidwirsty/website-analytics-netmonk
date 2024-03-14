import React from 'react';
import { BasicIcon } from '@netmonk/design.icons.basic';

export const sidebarNavigation = [
  {
    title: 'Home',
    type: 'group',
    has_access: { item: 'overview', permission: 'READ' },
    child: [
      {
        title: 'Overview',
        path: '/overview',
        icon: <BasicIcon name="dashboard" variant="duotone" color="white" />,
        has_access: { item: 'overview', permission: 'READ' }
      }
    ]
  },
  {
    title: 'Netmonk',
    type: 'group',
    has_access: {
      item: 'netmonk',
      permission: 'READ'
    },
    child: [
      {
        title: 'Active Users',
        path: '/active-users',
        icon: <BasicIcon name="subscription" variant="duotone" color="white" />,
        has_access: { item: 'active_users', permission: 'READ' }
      },
      {
        title: 'Employees',
        path: '/employees',
        icon: <BasicIcon name="users" variant="duotone" color="white" />,
        has_access: { item: 'employees', permission: 'READ' }
      },
      {
        title: 'Users',
        path: '/users',
        icon: <BasicIcon name="users" variant="duotone" color="white" />,
        has_access: { item: 'users', permission: 'READ' }
      }
    ]
  },
  {
    title: 'Netmonk Fulfillment',
    type: 'group',
    has_access: { item: 'netmonk_fulfillment', permission: 'READ' },
    child: [
      {
        title: 'Order NCX',
        path: '/order/ncx',
        icon: <BasicIcon name="order" variant="duotone" color="white" />,
        has_access: { item: 'order_ncx', permission: 'READ' }
      },
      {
        title: 'Tracking NCX',
        path: '/tracking-order-ncx',
        icon: <BasicIcon name="reportings" variant="duotone" color="white" />,
        has_access: { item: 'tracking_order_ncx', permission: 'READ' }
      },
      {
        title: 'Order SCONE',
        path: '/order/scone',
        icon: <BasicIcon name="order" variant="duotone" color="white" />,
        has_access: { item: 'order_scone', permission: 'READ' }
      }
    ]
  },
  {
    title: 'Netmonk Prime',
    type: 'group',
    has_access: {
      item: 'netmonk_prime',
      permission: 'READ'
    },
    child: [
      {
        title: 'Customer Management',
        path: '/customer-management',
        icon: <BasicIcon name="reporting-device" variant="duotone" color="white" />,
        has_access: {
          item: 'customer_management',
          permission: 'READ'
        }
      },
      {
        title: 'Device Pelanggan',
        path: '/device-pelanggan',
        icon: <BasicIcon name="devices" variant="duotone" color="white" />,
        has_access: {
          item: 'device_pelanggan',
          permission: 'READ'
        }
      }
    ]
  }
];

const findRecursive = (array, childrenKey, findBy) => {
  const key = Object.keys(findBy);
  const arrayToReturn = [];

  const pushChildrenToArray = (childrens) => {
    childrens.forEach((el) => {
      arrayToReturn.push(el);
      if ({}.propertyIsEnumerable.call(el, childrenKey)) pushChildrenToArray(el[childrenKey]);
    });
  };

  pushChildrenToArray(array);

  const find = arrayToReturn.filter((el) => el[key] === findBy[key]);
  return find.length > 0 ? find[0] : [];
};

export const getTitleByPath = (path) => {
  const res = findRecursive(sidebarNavigation, 'child', { path });
  return res.title;
};

export default {
  sidebarNavigation,
  getTitleByPath
};
