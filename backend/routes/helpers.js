const express = require('express');
const { getHelpers, getHelper, createHelper, updateHelper, deleteHelper } = require('../controllers/helpers');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getHelpers)
  .post(protect, authorize('admin'), createHelper);

router.route('/:id')
  .get(getHelper)
  .put(protect, authorize('admin'), updateHelper)
  .delete(protect, authorize('admin'), deleteHelper);

module.exports = router;