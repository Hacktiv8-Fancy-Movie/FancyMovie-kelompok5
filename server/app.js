require('dotenv').config()
const express = require('express')
const router = require('./routes')
// const errHandler = require('./middlewares/errHandler')

const cors = require('cors')
const app = express()
const PORT = 3000


app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json());//body parser untuk data json
app.use(router)

// app.use(errHandler)

app.listen(PORT, _=>{
    console.log(`Server is liten on PORT ${PORT}`)
})