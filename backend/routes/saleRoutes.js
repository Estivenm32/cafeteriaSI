const express = require('express');
const { makeSale } = require('../controllers/saleController');
const router = express.Router();

router.post('/', makeSale);

module.exports = router;