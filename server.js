const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
app.use(cors())
dotenv.config({path:'./config/.env'})
const mongoDB = require('./config/database')
mongoDB();
app.use(express.json())

const routes = require('./routes')


app.use('/',routes)

app.get('/',(req,res)=>{
    res.send('this is home route')
})

app.listen(5000,()=>{
    console.log('server has been started');
})