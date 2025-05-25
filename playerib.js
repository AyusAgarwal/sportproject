const express = require('express')
const router = new express.Router();
const player = require('../model/player');
const sg = require('@sendgrid/mail')
const admin = require('../model/admin');
const bmatch = require('../model/Badminton/match');
const bprofile = require('../model/Badminton/profile');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const auth = require('../Auth/playerauth')
const cors = require('cors');
router.use(cors());
dotenv.config();


router.post('/player/badminton/addmatch',auth,(req,res)=>{
    console.log("Add badminton Match");
    if(req.body.oid==req.studentid)
    return res.status(400).send({"error":"Invalid Opponent id"})
    let match = {
        tot: req.body.tot,
        pid: req.id,
        oname: req.body.oname,
        oid: req.body.oid,
        s1: req.body.s1,
        s2: req.body.s2,
        wt: req.body.wt,
    }
    player.findOne({studentid: req.body.oid})
    .then((eo)=>{
        if(eo){
        match = new bmatch(match);
        match.save()
        .then((v)=>{
            let omatch = {
                tot: req.body.tot,
                pid: eo._id,
                oname: req.name,
                oid: req.studentid,
                s1: req.body.s2,
                s2: req.body.s1,
                wt: !req.body.wt,
            }
            omatch = new bmatch(omatch);
            omatch.save()
            .then(async (os)=>{
                if(os){
                    sg.setApiKey(process.env.APIKEY)

                    sg.send({
                        from: 'rshah213203@gmail.com',
                        to: '202151169@iiitvadodara.ac.in' ,
                        subject: 'Badminton Match added',
                        text: `${os}`
                    })

                        await player.findByIdAndUpdate(req.id,{badminton:true})
                        .then((nvv)=>{
                            console.log("updated",nvv)
                        })
                        await player.findByIdAndUpdate(eo._id,{badminton:true})
                        .then((nvv)=>{
                            console.log("updated",nvv)
                        })
                        let wid = (v.wt)?req.id:eo.id;
                        await bprofile.findOne({pid: wid})
                        .then(async (bpf)=>{
                            if(bpf) {
                                await bprofile.findOneAndUpdate({pid:wid},{mw: bpf.mw+1});
                            }
                            else{
                                let nbp = {pid:wid , mw:1};
                                nbp = new bprofile(nbp);
                                await nbp.save();
                            }
                        })
                       
                res.status(200).send({"message":"BMatch Set"});
                }
                else
                res.status(400).send({"error":"BMatch set failed"})
            })
            .catch((err)=>{
                console.log(err);
                res.send({"error":"BMatch set failed"})
            })
            
        })
        .catch((err)=>{
            res.send({"error":"BMatch set failed"})
        })
}
else
res.send({"error":"Invalid Opponent id"});
})
    
})

module.exports = router;