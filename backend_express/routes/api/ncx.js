const express = require('express');
const router = express.Router();
const ordersNcxController = require('../../controllers/orderNcxController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router
  .route('/')
  .get(
    verifyRoles(ROLES_LIST.root, ROLES_LIST.fulfillment),
    ordersNcxController.getAllOrderNcx
  );

router
  .route('/:id')
  .get(
    verifyRoles(ROLES_LIST.root, ROLES_LIST.fulfillment),
    ordersNcxController.getOrderNcx
  );

module.exports = router;
