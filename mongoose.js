const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const pwd = process.env.DBPASS;
const url = "mongodb+srv://admin:"+pwd+"@victory.tzjc9sv.mongodb.net/vcov?retryWrites=true&w=majority";
function fire(){
    mongoose.connect(url,{
        useNewUrlParser: true,
    })
    .then(()=>{
       
        console.log("connected")  
    })
    .catch((err)=>{
        console.log(err)
        console.log("not connected")
        
    });
}
fire();

module.exports = fire;











