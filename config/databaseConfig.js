const mongoose=require('mongoose')
const MONGODB_URL="mongodb://localhost:27017/pw";
const databaseconnect=()=>{
    mongoose.connect(MONGODB_URL)
    .then((conn)=>console.log('Connection to DB:'))
    .catch((err)=>console.log(err.messsage));

  
}

module.exports=databaseconnect;