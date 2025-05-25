const express = require('express')
const router = new express.Router();
const player = require('../model/player');
const sg = require('@sendgrid/mail')
const admin = require('../model/admin');
const fmatch = require('../model/Football/fmatch');
const fprofile = require('../model/Football/fprofile')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const auth = require('../Auth/playerauth')
const cors = require('cors');
router.use(cors());
dotenv.config();


router.post('/player/football/addmatch',auth,(req,res)=>{
    console.log("Add football Match");
    let match = {
        tot: req.body.tot,
        t1: req.body.t1,
        t2: req.body.t2,
        s1: req.body.s1,
        s2: req.body.s2,
        wt: req.body.wt,
        pid: req.id,
        goal: (req.body.goal)?(req.body.goal):0

    }
    
    match = new fmatch(match);
    match.save()
    .then((v)=>{
        sg.setApiKey(process.env.APIKEY)

                        sg.send({
                            from: 'rshah213203@gmail.com',
                            to: '202151169@iiitvadodara.ac.in' ,
                            subject: 'football Match added',
                            text: `${v}`
                        })
                fprofile.findOne({ pid: v.pid})
                .then((vi)=>{
                if(vi){
                    fprofile.findByIdAndUpdate(vi._id,{goal: Number(vi.goal+v.goal)})
                    .then(async (v)=>{   
                        await player.findByIdAndUpdate(req.id,{football:true})
                        .then((nvv)=>{
                            console.log("updated",nvv)
                        })  
                        return res.send({"message":"Match set"});
                    })
                    .catch((err)=>{
                        return res.send({"error":"Match set failed"})
                    })
                }
                else{
                    const nprofile = new fprofile({
                        pid: req.id,
                        goal: req.body.run
                    })
                    nprofile.save()
                    .then(async (v)=>{
                        await player.findByIdAndUpdate(req.id,{football:true})
                        .then((nvv)=>{
                            console.log("updated",nvv)
                        })
                        
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