//HTTP server => it is create server 

const http = require('http');
const fs = require('fs');

//function to create server in nodejs 
const myServer = http.createServer((req,res)=>{
    //console.log(req.headers);
    const log=`${Date.now()}${req.url}:New Req Received\n`;
    fs.appendFile('log.txt',log,(err,data)=>{
        res.end("Hello From server");
    })
    
});

myServer.listen(8000,()=>{
    console.log("Server Started")
})
