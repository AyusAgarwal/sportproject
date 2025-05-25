const mongoose = require('mongoose');
const validator = require('validator');

const bprofile = mongoose.model('bprofile',{

    pid:{
        //player id
        type: String,
        require: true
    },
    mw:{
        //runs made by pid
        type: Number,
        require: true,
        default: 0
    }
})
module.exports = bprofile;