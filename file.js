const fs=require('fs');


//sync was synchronous calll fs.writeFileSync is create file
//fs.writeFileSync('./test.txt','Hey There');

const res =fs.readFileSync("./test.txt",'utf-8');
console.log(res);

//async 
fs.writeFileSync('./test.txt','Hey There Async',(err)=>{
    if(err) {
        console.log("Error",err);
    }else{
        console.log(res)
    }
    }
)

fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());


console.log(fs.statSync("./test.txt"));