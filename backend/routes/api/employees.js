const express = require('express');

const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router
  .route('/')
  .get(verifyRoles(ROLES_LIST.root), employeesController.getAllEmployees)
  .post(verifyRoles(ROLES_LIST.root), employeesController.createNewEmployee)
  .put(verifyRoles(ROLES_LIST.root), employeesController.updateEmployee);

router
  .route('/:id')
  .get(verifyRoles(ROLES_LIST.root), employeesController.getEmployee)
  .put(verifyRoles(ROLES_LIST.root), employeesController.updateEmployee)
  .delete(verifyRoles(ROLES_LIST.root), employeesController.deleteEmployee);

module.exports = router;
