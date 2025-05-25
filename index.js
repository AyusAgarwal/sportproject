const express = require('express');
const app =express();
const dotenv = require('dotenv');
dotenv.config();
require('./Db/mongoose')
const bdp = require('body-parser');
const port = process.env.PORT||3000;
const admin = require('./model/admin');
const player = require('./model/player');
const addi = require('./Routes/admini');
const playeri = require('./Routes/playeri')
const playeric = require('./Routes/playeric')
const playerib = require('./Routes/playerib')
const playerif = require('./Routes/playerif')
const playerit = require('./Routes/playeritt')
const guest  = require('./Routes/guest')
const psv = require('./Routes/playerSelfView')
const views = require('./Routes/view')
const { default: mongoose } = require('mongoose');
const fire = require('./Db/mongoose');
const deleteds = require('./Routes/delete');
const updated = require('./Routes/update')


app.use(express.json());
app.use((req,res,next)=>{
    if(mongoose.connection.readyState==2||mongoose.connection.readyState==0){
    fire();
    next();
    }
    else
    next();
})
app.use(playerif);
app.use(playerib);
app.use(playeric);
app.use(playerit);
app.use(playeri);
app.use(psv);
app.use(addi);
app.use(views);
app.use(guest);
app.use(deleteds);
app.use(updated);

app.listen(port,()=>{
    fire();
    console.log("app is running at "+port);
})