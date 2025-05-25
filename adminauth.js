const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const admin = require('../model/admin')
const auth = (req,res,next)=>{
    console.log("auth Middleware")
    if(req.header('authToken')){
        var token = req.header('authToken');
        var mk = jwt.verify(token,"admintkn");
        console.log(mk);
        admin.findOne({_id: mk._id,'tokens.token':token})
        .then((v)=>{
            if(v){
                req.id = v._id;
                req.email = v.email;
                req.token = token;
                next();
            }
            else{
                res.send({"error":"Sign In required"});
            }
        })
    }
    else{
        console.log("no token found");
        return res.send({"message":"Sign In required"});
    }
}
module.exports = auth;