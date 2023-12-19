const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors());
app.use(express.json())

//Routes Import
const currencyRoute = require('./server/currencyRoute')

//Routes
app.use('/api', currencyRoute)

const port = 8000
app.listen(port,()=> {
    console.log('Server Started At 8000!')
})