const express = require('express')
const router = new express.Router();
const cors = require('cors');

const player = require('../model/player');

const auth = require('../Auth/playerauth')
router.use(cors());

router.patch('/self/update/password',auth,(req,res)=>{
    if(req.body.newpwd)
    player.findOneAndUpdate({_id:req.id, password:req.body.oldpwd},{password: req.body.newpwd})
    .then((v)=>{
        if(v)
        return res.status(200).send({"message":"Password Updated! , Login Again!"});
        else
        return res.status(400).send({"message":"Old password incorrect!"});
    })
    .catch((err)=>{
        return res.status(400).send({"message":"Something Went wrong!"});
    })
    else
    return res.status(400).send({"message":"Something Went wrong!"});
})

router.patch('/self/update/personaldetails',auth,(req,res)=>{
    player.findByIdAndUpdate(req.id,{height: req.body.nh, weight: req.body.nw})
    .then((v)=>{
        if(v)
        return res.status(200).send({"message":"Personal Details Updated!"});
        console.log(v);
    })
    .catch((err)=>{
        return res.status(400).send({"message":"Something Went wrong!"});
    })
})
module.exports = router;