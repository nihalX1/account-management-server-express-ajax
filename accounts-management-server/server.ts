//web sever code 
// importing third party module (node_modules)
import express from 'express';
import { isParameter } from 'typescript';
import {AccountDataService} from './accountDataService'
import {UserDataMemoryRepository} from './userDataMemoryRepository'
import { User } from './userModel';
import bodyParser from 'body-parser'
import path from 'path'

const server=express();
const PORT=8003;

const accountServiceref=new AccountDataService(new UserDataMemoryRepository());

//Configure - middleware /filter
server.use(bodyParser.json());
server.use(express.static(__dirname + '/public'))

server.get("/index.html", (req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
});



//http get request - http://localhost:8003/teabreak
server.get("/teabreak",(req,res)=>{

    console.log("New Reuest Recived");
    res.send("Lets have tea break");


});

server.post("/accounts/register",(req,res)=>{


let userObj=new User(req.body.name,req.body.password,req.body.email);

    let credentials=req.body; 
    if(credentials){
        if(accountServiceref.register(req.body)){
            res.status(201).json({message:"Successfully Registered User"});
        }
        else{
            res.status(403).json({message:"Unable to register as username already exists"});
        }
    }
    else{
        res.status(400).json({messgae:"Bad Request"});
    }
});

server.post("/accounts/validate",(req,res)=>{

    let credentials=req.body;
    if(credentials){

        if(accountServiceref.validate(credentials.Name,credentials.Password)){
            res.status(200).json({message:"Valid Credentials"});
        }
        else{
            res.status(403).json({message:"Invalid Credentials"});
        }
    }
    else{
        res.status(400).json({messgae:"Bad Request"});
    }
});

server.post("/accounts/changePassword",(req,res)=>{

    let credentials=req.body;
    if(credentials){

        if(accountServiceref.changePassword(credentials.userName,credentials.oldpassword, credentials.newpassword)){
            res.status(200).json({message:"SUccessfully changed password"});
        }
        else{
            res.status(403).json({message:"ERROR.Unable to change pass"});
        }
    }
    res.status(400).json({messgae:"Bad Request"});
});


server.listen(PORT,()=>{

    console.log(`Account Management Server is running at http://localhost:${PORT}`);

});



