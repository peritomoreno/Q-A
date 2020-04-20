const express = require('express')
const app = express()
const parser = require('body-parser')
const router = require('./router.js')
//Dealing with CORS Errors in React and Express
const cors = require("cors")
const port = 8848

app.use(parser.json())
app.use('',router)
app.use(cors())
// app.use(express.static(__dirname + '../../client/src/index.js'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))