const mongoose = require('mongoose')
const url = process.env.MONGO_URL

const mongoDB= async()=>{
    
    try {
        const data = await mongoose.connect(url)
        console.log('database connected successfully');
    } catch (error) {
        console.log('error in connect to database');
    }
}


module.exports=mongoDB