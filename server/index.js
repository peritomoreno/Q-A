const express = require('express')
const app = express()
const parser = require('body-parser')
const router = require('./router.js')

const port = 8848

app.use(parser.json())
app.use('/qa',router)

// app.use(express.static(__dirname + '../../client/src/index.js'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))