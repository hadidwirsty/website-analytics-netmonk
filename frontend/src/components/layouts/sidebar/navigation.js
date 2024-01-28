/* eslint-disable import/no-anonymous-default-export */
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
        icon: <BasicIcon name='dashboard' variant='duotone' color='white' />,
        has_access: { item: 'overview', permission: 'READ' },
      },
    ],
  },
  {
    title: 'Netmonk Fulfillment',
    type: 'group',
    has_access: { item: 'netmonk_fulfillment', permission: 'READ' },
    child: [
      {
        title: 'Order SCONE',
        path: '/order/scone',
        icon: <BasicIcon name='subscription' variant='duotone' color='white' />,
        has_access: { item: 'order_scone', permission: 'READ' },
      },
      {
        title: 'Order NCX',
        path: '/order/ncx',
        icon: <BasicIcon name='order' variant='duotone' color='white' />,
        has_access: { item: 'order_ncx', permission: 'READ' },
      },
      {
        title: 'Order SCONE',
        path: '/order/scone/treg',
        icon: <BasicIcon name='subscription' variant='duotone' color='white' />,
        has_access: { item: 'order_scone_treg', permission: 'READ' },
      },
      {
        title: 'Order NCX',
        path: '/order/ncx/treg',
        icon: <BasicIcon name='order' variant='duotone' color='white' />,
        has_access: { item: 'order_ncx_treg', permission: 'READ' },
      },
      {
        title: 'Order SCONE',
        path: '/order/scone/witel',
        icon: <BasicIcon name='subscription' variant='duotone' color='white' />,
        has_access: { item: 'order_scone_witel', permission: 'READ' },
      },
      {
        title: 'Order NCX',
        path: '/order/ncx/witel',
        icon: <BasicIcon name='order' variant='duotone' color='white' />,
        has_access: { item: 'order_ncx_witel', permission: 'READ' },
      },
      {
        title: 'Monitoring SCONE',
        path: '/monitoring/order-scone',
        icon: <BasicIcon name='reportings' variant='duotone' color='white' />,
        has_access: { item: 'monitoring_order_scone', permission: 'READ' },
      },
      {
        title: 'Order SCONE V2',
        path: '/order/scone-v2',
        icon: <BasicIcon name='reportings' variant='duotone' color='white' />,
        has_access: { item: 'order_scone_v2', permission: 'READ' },
      },
    ],
  },
  {
    title: 'Netmonk',
    type: 'group',
    has_access: {
      item: 'netmonk',
      permission: 'READ',
    },
    child: [
      {
        title: 'Monitoring Customer',
        path: '/monitoring/customer',
        icon: <BasicIcon name='reportings' variant='duotone' color='white' />,
        has_access: { item: 'monitoring_customer', permission: 'READ' },
      },
      {
        title: 'Order NCX (DBS)',
        path: '/order/ncx/dbs',
        icon: <BasicIcon name='subscription' variant='duotone' color='white' />,
        has_access: {
          item: 'order_ncx_dbs',
          permission: 'READ',
        },
      },
      {
        title: 'Order NCX (Internal)',
        path: '/order/ncx/internal',
        icon: <BasicIcon name='order' variant='duotone' color='white' />,
        has_access: {
          item: 'order_ncx_internal',
          permission: 'READ',
        },
      },
      {
        title: 'Report - Latency',
        path: '/report/latency',
        icon: <BasicIcon name='reportings' variant='duotone' color='white' />,
        has_access: { item: 'report_latency', permission: 'READ' },
      },
      {
        title: 'Report - Packet Loss',
        path: '/report/packet-loss',
        icon: <BasicIcon name='subscription' variant='duotone' color='white' />,
        has_access: {
          item: 'report_packet_loss',
          permission: 'READ',
        },
      },
      {
        title: 'Report - Jitter',
        path: '/report/jitter',
        icon: <BasicIcon name='order' variant='duotone' color='white' />,
        has_access: {
          item: 'report_jitter',
          permission: 'READ',
        },
      },
    ],
  },
  {
    title: 'Netmonk HI',
    type: 'group',
    has_access: {
      item: 'netmonk_hi',
      permission: 'READ',
    },
    child: [
      {
        title: 'Business Performance',
        path: '/business-performance',
        icon: <BasicIcon name='speedometer' variant='duotone' color='white' />,
        has_access: {
          item: 'business_performance',
          permission: 'READ',
        },
      },
      {
        title: 'User Netmonk HI',
        path: '/user-netmonk-hi',
        icon: <BasicIcon name='reportings' variant='duotone' color='white' />,
        has_access: {
          item: 'user_netmonk_hi',
          permission: 'READ',
        },
      },
      {
        title: 'Detail Active User',
        path: '/detail-active-user',
        icon: <BasicIcon name='reportings' variant='duotone' color='white' />,
        has_access: {
          item: 'detail_active_user',
          permission: 'READ',
        },
      },
      {
        title: 'Detail Active User',
        path: '/detail-active-user/treg',
        icon: <BasicIcon name='reportings' variant='duotone' color='white' />,
        has_access: {
          item: 'detail_active_user_treg',
          permission: 'READ',
        },
      },
      {
        title: 'Detail Active User',
        path: '/detail-active-user/witel',
        icon: <BasicIcon name='reportings' variant='duotone' color='white' />,
        has_access: {
          item: 'detail_active_user_witel',
          permission: 'READ',
        },
      },
    ],
  },
  {
    title: 'Netmonk Prime',
    type: 'group',
    has_access: {
      item: 'netmonk_prime',
      permission: 'READ',
    },
    child: [
      {
        title: 'Customer Journey',
        path: '/customer-journey',
        icon: <BasicIcon name='network-map' variant='duotone' color='white' />,
        has_access: {
          item: 'customer_journey',
          permission: 'READ',
        },
      },
      {
        title: 'Device Pelanggan',
        path: '/monitoring/device-pelanggan',
        icon: <BasicIcon name='reportings' variant='duotone' color='white' />,
        has_access: {
          item: 'monitoring_device_pelanggan',
          permission: 'READ',
        },
      },
      {
        title: 'Monitoring Application',
        path: '/monitoring/application',
        icon: <BasicIcon name='devices' variant='duotone' color='white' />,
        has_access: {
          item: 'monitoring_aplication',
          permission: 'READ',
        },
      },
      {
        title: 'Monitoring Digital Customer',
        path: '/monitoring/digital-customer',
        icon: (
          <BasicIcon name='reporting-device' variant='duotone' color='white' />
        ),
        has_access: {
          item: 'monitoring_digital_customer',
          permission: 'READ',
        },
      },
      {
        title: 'Monitoring Website',
        path: '/monitoring/website',
        icon: (
          <BasicIcon
            name='website-monitoring'
            variant='duotone'
            color='white'
          />
        ),
        has_access: {
          item: 'monitoring_website',
          permission: 'READ',
        },
      },
      {
        title: 'User Overview',
        path: '/user-overview',
        icon: <BasicIcon name='reportings' variant='duotone' color='white' />,
        has_access: {
          item: 'user_overview',
          permission: 'READ',
        },
      },
    ],
  },
];

const findRecursive = (array, childrenKey, findBy) => {
  const key = Object.keys(findBy);
  const arrayToReturn = [];

  const pushChildrenToArray = (childrens) => {
    childrens.forEach((el) => {
      arrayToReturn.push(el);
      if ({}.propertyIsEnumerable.call(el, childrenKey))
        pushChildrenToArray(el[childrenKey]);
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
  getTitleByPath,
};
