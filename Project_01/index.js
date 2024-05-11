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

app.get('/api/users',(req,res)=>{
    res.json(users);
})

app.get('/api/users/:id',(req,res)=>{
     const id = Number(req.params.id);
     const user = users.find((user)=>user.id===id);
     return res.json(user);
})


app.post("/api/users",(req,res)=>{
    //todo:create new user 
    const body = req.body;
    users.push({...body,id:users.length+1});
    fs.writeFileSync("./dataset.json",JSON.stringify(users),(err,data)=>{
       return res.json({status:"success",id:users.length+1});
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