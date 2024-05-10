const fs = require('fs');
const os = require('os');

console.log(os.cpus().length); //8 

console.log("1");

//Bloking ................

const result =fs.readFileSync("test.txt","utf-8");
console.log(result);
console.log("1");

//Non Blocking......

fs.readFileSync("test.txt","utf-8",(err,result)=>{
    console.log(result);
});
console.log("2")
console.log("3")
console.log("4")