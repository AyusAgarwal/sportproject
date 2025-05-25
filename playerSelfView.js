const express = require('express')
const router = new express.Router();
const cors = require('cors');
const admin = require('../model/admin');
const player = require('../model/player');
const cmatch = require('../model/Cricket/match');
const fmatch = require('../model/Football/fmatch')
const bmatch = require('../model/Badminton/match');
const tmatch = require('../model/Table tennis/match');
const fprofile = require('../model/Football/fprofile');
const cprofile = require('../model/Cricket/profile');
const tprofile = require('../model/Table tennis/profile');
const bprofile = require('../model/Badminton/profile');
const auth = require('../Auth/playerauth')
router.use(cors());

router.get('/self/players/detail',auth,(req,res)=>{
    let uid = req.id;
    player.findById(uid,'name email gender height weight cricket badminton football')
    .then(async(v)=>{
        var f = {"goal":0}; 
        var c = {"run":0,"wicket":0};
        var b = {"mw":0};
        var t = {"mw":0};

        if(v){
        await cprofile.findOne({pid: v._id}).then((cpf)=>{
         
            if(cpf){
            c.run = cpf.run;
            c.wicket = cpf.wicket;

            }
        });
        await fprofile.findOne({pid: v._id}).then((fpf)=>{
            
            if(fpf){
                f.goal = fpf.goal;}
        });
        await bprofile.findOne({pid: v._id}).then((bpf)=>{
           
            if(bpf){
                b.mw = bpf.mw;}
        }); 
        await tprofile.findOne({pid: v._id}).then((tpf)=>{
          
            if(tpf){
                t.mw = tpf.mw;}
        }); 
        return res.send([v,f,c,b,t]);
        }
        res.status(400).send({"error":"Player fetch failed"});
    })
    .catch((err)=>{
        res.status(400).send({"error":"Player fetch failed1"});
    })

})

router.get('/self/players/badminton/',auth,(req,res)=>{
    let uid = req.id;
    bmatch.find({pid:uid},'tot s1 s2 oname wt')
    .then((v)=>{
        console.log(v)
        if(v)
        res.send(v);
        else
        res.status(400).send({"error":"Badminton fetch failed"});
    })
    .catch((err)=>{
        res.status(400).send({"error":"Badminton fetch failed1"});
    })

})

router.get('/self/players/tt',auth,(req,res)=>{
    let uid = req.id;
    tmatch.find({pid:uid},'tot s1 s2 oname wt')
    .then((v)=>{
        console.log(v)
        if(v)
        res.send(v);
        else
        res.status(400).send({"error":"TT fetch failed"});
    })
    .catch((err)=>{
        res.status(400).send({"error":"TT fetch failed1"});
    })

})

router.get('/self/players/football',auth,(req,res)=>{
    let uid = req.id;
    fmatch.find({pid:uid},'tot t1 t2 s1 s2 wt goal')
    .then((v)=>{
        if(v)
        res.send(v);
        else
        res.status(400).send({"error":"Football fetch failed"});
    })
    .catch((err)=>{
        res.status(400).send({"error":"football fetch failed1"});
    })

})

router.get('/self/players/cricket',auth,(req,res)=>{
    let uid = req.id;
    cmatch.find({pid:uid},'tot t1 t2 s1 s2 wt run wicket')
    .then((v)=>{
        if(v)
        res.send(v);
        else
        res.status(400).send({"error":"Cricket fetch failed"});
    })
    .catch((err)=>{
        res.status(400).send({"error":"Cricket fetch failed1"});
    })

})

module.exports = router;