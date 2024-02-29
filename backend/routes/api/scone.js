const express = require('express');
const router = express.Router();
const ordersSconeController = require('../../controllers/orderSconeController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router
  .route('/')
  .get(
    verifyRoles(ROLES_LIST.root, ROLES_LIST.fulfillment),
    ordersSconeController.getAllOrderScone
  )
  .post(
    verifyRoles(ROLES_LIST.fulfillment),
    ordersSconeController.createNewOrderScone
  );

router
  .route('/:id')
  .get(
    verifyRoles(ROLES_LIST.root, ROLES_LIST.fulfillment),
    ordersSconeController.getOrderScone
  )
  .put(
    verifyRoles(ROLES_LIST.fulfillment),
    ordersSconeController.updateOrderScone
  );

module.exports = router;
