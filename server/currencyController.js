const axios = require('axios')
const cheerio = require('cheerio')

const WEB_URL = 'https://www.calculator.net/currency-calculator.html'

async function findExchangeRates(){

    const response = await axios.get(WEB_URL)
    const $ = cheerio.load(response.data)

    html = String($.html())
    html = html.split('var listsArrayData = ').pop()
    html = html.split(']]')[0]
    html += ']]'
    html = html.replaceAll('\'', '\"')

    html2JSON = JSON.parse(html)

    exchangeRates = []
    for(let i=0; i<html2JSON.length; i++){
        exchangeRates.push({
            currency: html2JSON[i][0],
            value: html2JSON[i][1]
        })
    }

    return exchangeRates

}

async function findCurrencyNames(){

    const response = await axios.get(WEB_URL)
    const $ = cheerio.load(response.data)

    html = String($.html())
    html = html.split('var listsArray = ').pop()
    html = html.split(']]')[0]
    html += ']]'
    html = html.replaceAll('\'', '\"')
    html2JSON = JSON.parse(html)
    currencyNames = []
    for(let i=0; i<html2JSON.length; i++){
        currencyNames.push({
            currency: html2JSON[i][0],
            name: html2JSON[i][1]
        })
    }
    return currencyNames

}

const getExchangeRates = async(req, res) => {
    try {

        const exchangeRates = await findExchangeRates()
        return res.json(exchangeRates)

    } catch (error) {
        console.error(error)
    }
}

const getExchangeRateForCurrency = async(req, res) => {
    try {

        let currency = req.params['currency']

        const exchangeRates = await findExchangeRates()
        
        let value = exchangeRates.filter(function(x) { return x.currency===currency })[0].value

        res.json({
            currency: currency,
            value: value
        })
        
    } catch (error) {
        console.error(error)
    }
}

const getCurrencyName = async(req, res) => {
    try {

        let currency = req.params['currency']

        const currencyNames = await findCurrencyNames()
        
        let name = currencyNames.filter(function(x) { return x.currency===currency })[0].name

        res.json({
            currency: currency,
            name: name
        })
        
    } catch (error) {
        console.error(error)
    }
}

module.exports = { getExchangeRates, getExchangeRateForCurrency, getCurrencyName }