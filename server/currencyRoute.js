const express = require('express');

const router = express.Router()

//Controllers Import
const currencyController = require('./currencyController')

//Routes
router.get('/getExchangeRates', currencyController.getExchangeRates)
router.get('/getExchangeRates/:currency', currencyController.getExchangeRateForCurrency)
router.get('/getCurrencyName/:currency', currencyController.getCurrencyName)

module.exports = router