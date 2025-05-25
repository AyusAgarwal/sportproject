const jwt = require('jsonwebtoken');
const player = require('../model/player')
const auth = (req,res,next)=>{
    console.log("auth Middleware")
    if(req.header('playerAuth')){
        var token = req.header('playerAuth');
        var mk = jwt.verify(token,'playertkn');
        console.log(mk);
        player.findOne({_id:mk._id, 'tokens.token':token})
        .then((v)=>{
        req.id = mk._id;
        req.email = v.email;
        req.name = v.name;
        req.studentid = v.studentid; 
        req.token = token;
        next();
        })
        .catch((err)=>{
            res.send({"error":"Invalid Token"})
        })
        
    }
    else{
        console.log("no token found");
        return res.send({"message":"Sign In required"});
    }
}
module.exports = auth;