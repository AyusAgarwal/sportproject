const mongoose = require('mongoose');
const validator = require('validator');

const player = mongoose.model('player',{
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
            else{
                var ind=value.indexOf("@");
                var my_slice=value.slice(ind+1);
                if(!(my_slice==="iiitvadodara.ac.in")&&!(my_slice==="iiitv.ac.in")){   
                throw new Error('Invalid Email')
                }
            }
        }
    },
    password:{
        type: String,
        required: true
    },
    studentid:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true,
        
        validate(value){
            if(!value=="male"||!value=="female"||!value=="other"){
                throw new Error('Invalid gender')
            }
        }

    },
    height:{
        type: Number,
        required: true
    },
    weight:{
        type: Number,
        required: true
    },
    cricket:{
        type: Boolean,
        required: true,
        default: false
    },
    badminton:{
        type: Boolean,
        required: true,
        default: false
    },
    football:{
        type: Boolean,
        required: true,
        default: false
    },
    tt:{
        type: Boolean,
        required: true,
        default: false
    },
    tokens:[
        {
           token:{
            type: String
            }
        }
    ]

})
module.exports = player;