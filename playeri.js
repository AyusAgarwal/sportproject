const express = require('express')
const router = new express.Router();
const player = require('../model/player');
const admin = require('../model/admin');
const cprofile = require('../model/Cricket/profile');
const cmatch = require('../model/Cricket/match');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const auth = require('../Auth/playerauth')
dotenv.config();
const cors = require('cors');
router.use(cors());
router.post('/player/login',(req,res)=>{
    console.log("Login User")
    let email = req.body.email;
    let password = req.body.password;
    player.findOne({email: email})
    .then((v)=>{
        // console.log("h")
        if(v.password==password){
            // console.log("h1")
        let currToken = jwt.sign({"_id": v._id},'playertkn');
        v.tokens = v.tokens.concat({token: currToken})
        player.findByIdAndUpdate(v._id,{tokens: v.tokens}).then((v)=>{
            // console.log("here")
            return res.send({"message":"Login done!", "token":currToken});
        }).catch((err)=>{
            res.send({"message":"Login failed!"});
        })
         
        }
        else
        res.send({"message":"Incorrect pwd"});
    })
    .catch((err)=>{
        res.send({"message":"Db is down"});
    })
})

router.get('/player/logout',auth,(req,res)=>{
    console.log("here at logout")
    player.findByIdAndUpdate(req.id,{tokens: []})
    .then((v)=>{
        res.send({"message":"Logout Done!"});
    })
    .catch((err)=>{
        res.send({"message":"Logout failed!"})
    })
})

router.post('/player/cricket/addmatch',auth,(req,res)=>{
    console.log("Add cricket Match");
    let match = {
        tot: req.body.tot,
        t1: req.body.t1,
        t2: req.body.t2,
        s1: req.body.s1,
        s2: req.body.s2,
        wt: req.body.wt,
        pid: req.id,
        run: (req.body.run)?(req.body.run):0,
        wicket: (req.body.wicket)?(req.body.wicket):0,

    }
    
    match = new cmatch(match);
    match.save()
    .then((v)=>{
                cprofile.findOne({ pid: v.pid})
                .then((vi)=>{
                if(vi){
                    cprofile.findByIdAndUpdate(vi._id,{run: Number(vi.run+v.run),wicket: Number(vi.wicket+v.wicket)})
                    .then((v)=>{
                            
                        return res.send({"message":"Match set"});
                    })
                    .catch((err)=>{
                        return res.send({"error":"Match set failed"})
                    })
                }
                else{
                    const nprofile = new cprofile({
                        pid: req.id,
                        run: req.body.run,
                        wicket: req.body.wicket,
                    })
                    nprofile.save()
                    .then((v)=>{
                        return res.send({"message":"Match set"});
                    })
                    .catch((err)=>{
                        return res.send({"error":"Match set failed"})
                    })
                }
                })
        
    })
    .catch((err)=>{
        res.send({"error":"Match set failed"})
    })
    
})

module.exports = router;