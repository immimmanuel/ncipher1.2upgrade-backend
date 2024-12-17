const express = require('express');
const { convertCurrency, covertHistory } = require('../controllers/currencyController');

const router = express.Router();

router.post('/convert', convertCurrency);
router.post('/history', covertHistory);

module.exports = router;
