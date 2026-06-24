const express = require('express');
const router = express.Router();
const {
  getQuotations,
  getQuotation,
  createQuotation,
  updateQuotation,
  deleteQuotation,
  getDashboardStats,
  compareQuotations
} = require('../controllers/quotationController');

router.get('/dashboard', getDashboardStats);
router.get('/compare', compareQuotations);
router.route('/').get(getQuotations).post(createQuotation);
router.route('/:id').get(getQuotation).put(updateQuotation).delete(deleteQuotation);

module.exports = router;