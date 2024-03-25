const express = require('express');

const router = express.Router();
const metabaseController = require('../../controllers/metabaseController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.get(
  '/customer-management',
  verifyRoles(ROLES_LIST.fulfillment),
  metabaseController.sendCustomerManagement
);

router.get(
  '/overview',
  verifyRoles(ROLES_LIST.fulfillment, ROLES_LIST.ponetmonk, ROLES_LIST.root),
  metabaseController.sendOverviewUrl
);

router.get(
  '/device-pelanggan',
  verifyRoles(ROLES_LIST.fulfillment, ROLES_LIST.ponetmonk),
  metabaseController.sendDevicePelangganUrl
);

router.get(
  '/active-users',
  verifyRoles(ROLES_LIST.ponetmonk),
  metabaseController.sendActiveUsersUrl
);

router.get(
  '/tracking-order-ncx',
  verifyRoles(ROLES_LIST.fulfillment),
  metabaseController.sendTrackingOrderNcxUrl
);

module.exports = router;
