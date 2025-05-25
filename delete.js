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
const auth = require('../Auth/adminauth');
const pauth = require('../Auth/playerauth');
router.use(cors());

router.delete('/delete/badminton/:pid/:mid',auth,async (req,res)=>{
    bmatch.findOneAndDelete({_id:req.params.mid , pid:req.params.pid})
    .then(async (v)=>{
        if(v){
        let ws = v.wt;
        let mwo = (await bprofile.findOne({pid:req.params.pid})).mw - 1;
        if(ws==true){
            console.log(mwo);
            await bprofile.findOneAndUpdate({pid:req.params.pid},{mw: mwo})
            .then((v)=>{
                console.log(v);
              console.log("Match won decremented")  
            })
        }
        return res.status(200).send({"message":"Deleted Successfully"});
        }
        else
        return res.status(400).send({"message":"Deletion Failed!"});
    })
    .catch((err)=>{
        return res.status(400).send({"message":"Deletion Failed!"});
    })
})

router.delete('/delete/tt/:pid/:mid',auth,async (req,res)=>{
    tmatch.findOneAndDelete({_id:req.params.mid , pid:req.params.pid})
    .then(async (v)=>{
        if(v){
        let ws = v.wt;
        let mwo = (await tprofile.findOne({pid:req.params.pid})).mw - 1;
        if(ws==true){
            console.log(mwo);
            await tprofile.findOneAndUpdate({pid:req.params.pid},{mw: mwo})
            .then((v)=>{
                console.log(v);
              console.log("Match won decremented")  
            })
        }
        return res.status(200).send({"message":"Deleted Successfully"});
        }
        else
        return res.status(400).send({"message":"Deletion Failed!"});
    })
    .catch((err)=>{
        return res.status(400).send({"message":"Deletion Failed!"});
    })
})

router.delete('/self/players/delete/badminton/:mid',pauth,async (req,res)=>{
    bmatch.findOneAndDelete({_id:req.params.mid , pid:req.id})
    .then(async (v)=>{
        if(v){
        let ws = v.wt;
        let mwo = (await bprofile.findOne({pid:req.id})).mw - 1;
        if(ws==true){
            console.log(mwo);
            await bprofile.findOneAndUpdate({pid:req.id},{mw: mwo})
            .then((v)=>{
                console.log(v);
              console.log("Match won decremented")  
            })
        }
        return res.status(200).send({"message":"Deleted Successfully"});
        }
        else
        return res.status(400).send({"message":"Deletion Failed!"});
    })
    .catch((err)=>{
        return res.status(400).send({"message":"Deletion Failed!"});
    })
});

router.delete('/self/players/delete/tt/:mid',pauth,async (req,res)=>{
    tmatch.findOneAndDelete({_id:req.params.mid , pid:req.id})
    .then(async (v)=>{
        if(v){
        let ws = v.wt;
        let mwo = (await tprofile.findOne({pid:req.id})).mw - 1;
        if(ws==true){
            console.log(mwo);
            await tprofile.findOneAndUpdate({pid:req.id},{mw: mwo})
            .then((v)=>{
                console.log(v);
              console.log("Match won decremented")  
            })
        }
        return res.status(200).send({"message":"Deleted Successfully"});
        }
        else
        return res.status(400).send({"message":"Deletion Failed!"});
    })
    .catch((err)=>{
        return res.status(400).send({"message":"Deletion Failed!"});
    })
});

router.delete('/self/players/delete/cricket/:mid',pauth,async (req,res)=>{
    cmatch.findOneAndDelete({_id:req.params.mid , pid:req.id})
    .then(async (v)=>{
        if(v){
        let pr = v.run;
        let pw = v.wicket;
        let obj = (await cprofile.findOne({pid:req.id}))
        let ur = obj.run - pr;
        let uw = obj.wicket - pw;
            await cprofile.findOneAndUpdate({pid:req.id},{run: ur, wicket:uw})
            .then((v1)=>{
                console.log(v1);
              console.log("Match won decremented")  
            })
        
        return res.status(200).send({"message":"Deleted Successfully"});
        }
        else
        return res.status(400).send({"message":"Deletion Failed!"});
    })
    .catch((err)=>{
        return res.status(400).send({"message":"Deletion Failed!"});
    })
});

router.delete('/self/players/delete/football/:mid',pauth,async (req,res)=>{
    fmatch.findOneAndDelete({_id:req.params.mid , pid:req.id})
    .then(async (v)=>{
        if(v){
        let pg = v.goal;
        let obj = (await fprofile.findOne({pid:req.id}))
        let ug = obj.goal - pg;

            await fprofile.findOneAndUpdate({pid:req.id},{goal: ug})
            .then((v1)=>{
                console.log(v1);
              console.log("Match won decremented")  
            })
        
        return res.status(200).send({"message":"Deleted Successfully"});
        }
        else
        return res.status(400).send({"message":"Deletion Failed!"});
    })
    .catch((err)=>{
        return res.status(400).send({"message":"Deletion Failed!"});
    })
});


module.exports = router;