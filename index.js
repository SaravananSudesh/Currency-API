const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())

//Routes Import


//Routes


const port = 8000
app.listen(port,()=> {
    console.log('Server Started At 8000!')
})