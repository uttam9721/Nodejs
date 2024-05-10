const fs=require('fs');


//sync was synchronous calll fs.writeFileSync is create file
//fs.writeFileSync('./test.txt','Hey There');



//async 
//fs.writeFileSync('./test.txt','Hey There Async',(err)=>{})

const res =fs.readFileSync("./test.txt",'utf-8');
console.log(res);