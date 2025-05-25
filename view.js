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
const auth = require('../Auth/adminauth')
router.use(cors());
router.get('/search/players/:squery',auth,async (req,res)=>{
    console.log("search player containing ",req.params.squery);
    try {
        let players = await player.find({name: {$regex: req.params.squery, $options: 'i'}},'name email');
        if(players){
        res.status(200).send(players);
        }
        else
        res.status(400).send({"error":"No players found"})
        
    } catch (error) {
        console.log(error)
        res.status(400).send({"error":"Something went wrong"})
    }
})
router.get('/search/players/',auth,async (req,res)=>{
    try {
        let players = await player.find({},'name email');
        if(players){
        res.status(200).send(players);
        }
        else
        res.status(400).send({"error":"No players found"})
        
    } catch (error) {
        console.log(error)
        res.status(400).send({"error":"Something went wrong"})
    }
})

router.get('/view/players',auth,async (req,res)=>{
    try {
        let players = await player.find({},'name email');
        if(players){
        res.status(200).send(players);
        }
        else
        res.status(400).send({"error":"No players found"})
        
    } catch (error) {
        console.log(error)
        res.status(400).send({"error":"Something went wrong"})
    }
})

router.get('/view/players/:uid',auth, (req,res)=>{
    let uid = req.params.uid;
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
        res.send([v,f,c,b,t]);
        }
        else
        res.status(400).send({"error":"Player fetch failed"});
    })
    .catch((err)=>{
        res.status(400).send({"error":"Player fetch failed1"});
    })

})

router.get('/view/players/badminton/:uid',auth,(req,res)=>{
    let uid = req.params.uid;
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

router.get('/view/players/tt/:uid',auth,(req,res)=>{
    let uid = req.params.uid;
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

router.get('/view/players/football/:uid',auth,(req,res)=>{
    let uid = req.params.uid;
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

router.get('/view/players/cricket/:uid',auth,(req,res)=>{
    let uid = req.params.uid;
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