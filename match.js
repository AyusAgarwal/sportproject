const mongoose = require('mongoose');

const bmatch = mongoose.model('bmatch',{
    tot:{
        //type of tournament
        type: String,
        required:true
    },
    pid:{
        //player id
        type: String,
        required: true
    },
    oname:{
        //opponent Name
        type: String,
        required: true
    },
    oid:{
        type: Number,
        required: true
    },
    s1:{
        //your score
        type:Number,
        required:true
    },
    s2:{
        //opponent's score
        type:Number,
        required:true
    },
    wt:{
        //winning team
        type: Boolean,
        required: true,
    }
})

module.exports = bmatch;