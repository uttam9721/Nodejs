const express= require('express');
const fs= require('fs');
const app = express();

const users = require("./dataset.json");
const PORT =8000;


// middleware 
app.use(express.urlencoded({entended: false}));
app.use((req,res,next)=>{
    console.log("Hello from middleware 1");
    next();
});

app.use((req,res,next)=>{
    console.log("Hello from middleware 2");
    next();
})

//Routes

app.get("/api/users",(req,res)=>{
    res.setHeader('x-myname',"uttammaurya"); //custom header 
    //Always add x to custom headers
    return res.json(users);
})

app.get('/api/users',(req,res)=>{
    res.json(users);
})

app.get('/api/users/:id',(req,res)=>{
     const id = Number(req.params.id);
     const user = users.find((user)=>user.id===id);
     if(!user) return res.status(404).json({error:"user not found"});
     return res.json(user);
})


app.post("/api/users",(req,res)=>{
    //todo:create new user 
    const body = req.body;
    if(!body||body.first_name|| !body.last_name|| !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg:"All field are req.... "})
    }
    users.push({...body,id:users.length+1});
    fs.writeFileSync("./dataset.json",JSON.stringify(users),(err,data)=>{
       return res.status(201).json({status:"success",id:users.length+1});
    })
    return res.json({status:"pending"});
});
app.patch("/api/users/:id",(req,res)=>{
    //todo :edit the user with id 
    return res.json({status:"pending"});
})

app.delete("/api/users/:id",(req,res)=>{
    //todo :delete the user with id 
    return res.json({status:"pending"});
})

app.listen(PORT,()=>console.log(`Server started at port ${PORT}`));