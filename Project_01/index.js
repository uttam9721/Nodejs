const express= require('express');
const fs= require('fs');
const app = express();
const mongoose = require('mongoose');

//const users = require("./dataset.json");
const PORT =8080;


//connection 

mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(()=>console.log('connection connected'))
.catch(err=>console.log('connection error',err));


//Schema -------------------------------------
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type :String ,
    },
    email:{
        type :String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type :String,

    },
    gender:{
        type :String,
    },
},{timestamps:true})

const User =mongoose.model('user',userSchema);

//Middleware - Plugin

 
app.use(express.urlencoded({extended: false}));
app.use((req,res,next)=>{
    console.log("Hello from middleware 1");
    next();
});

app.use((req,res,next)=>{
    console.log("Hello from middleware 2");
    next();
})

//Routes
app.get("/ ",async(req,res)=>{
    const allDbUsers = await Users.find({});
    const html=`
    <ul>
    ${allDbUsers.map((user)=>`<li>${user.firstName}-${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

app.get("/api/users",async(req,res)=>{
    const allDbUsers = await Users.find({});
    return res.json(allDbUsers);
})

app.get('/api/users',(req,res)=>{
    res.json(users);
})

app.get('/api/users/:id',async(req,res)=>{
     const user = User.findById(req.params.id);
     if(!user) return res.status(404).json({error:"user not found"});
     return res.json(user);
})


app.post("/api/users",async(req,res)=>{
    //todo:create new user 
    const body = req.body;
    if(
        !body||
        !body.first_name||
        !body.last_name||
        !body.email ||
        !body.gender ||
        !body.job_title
    ){
        return res.status(400).json({msg:"All field are req.... "})
    }

    // it create the user
const result =   await User.create({
    firstName : body.first_name,
    lastName : body.last_name,
    email : body.email,
    gender : body.gender ,
    jobTitle : body.job_title,
   })
  // console.log(result);
    return res.status(201).json({msg:"success"}); 
});
app.patch("/api/users/:id",async(req,res)=>{
    //todo :edit the user with id 
    await User.findByIdAndUpdate(req.params.id,{lastName:"Changed"});
    return res.json({status:"success"});
})

app.delete("/api/users/:id",async(req,res)=>{
    //todo :delete the user with id 
    await User.findByIdAndDelete(req.param.id);
    return res.json({status:"success"});
})

app.listen(PORT,()=>console.log(`Server started at port ${PORT}`));