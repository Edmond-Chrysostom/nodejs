const express=  require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./public'));
app.use(morgan('short'));






const router =  require('./routes/user.js');
app.use(router)




app.get('/',(req, res)=>{
    console.log("Responding successfully and sending...");
    res.send("Welcome to a new webpage...");
})
// app.get('/users',(req, res)=>{
//     var user1={firstname:"Edmond", lastname:"Pinto"}
//     const user2 = {firstname:"Asebi", lastname:"Michael"}
//     res.json([user1,user2]);
// })
app.listen('4000',()=>{
    console.log("Server running on port 4000...");
});