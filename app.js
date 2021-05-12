const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require('body-parser');


app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/first",{useNewUrlParser:true},{useUnifiedTopology:true});
var url="mongodb://localhost:27017/first";
const Schema ={
    name:String,
    email:String,
    pass:String,
    password:String,
    dob:String,
    number:String
}

const Note=mongoose.model("Note",Schema);

app.get("/reg",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/reg",function(req,res){
    let newNote=new Note({
        name:req.body.name,
        email:req.body.email,
        pass:req.body.pass,
        password:req.body.password,
        dob:req.body.dob,
        number:req.body.number
    })
   
    mongoose.connect(url,function(err,db){
             //  res.send(req.body);
                db.collection("form_details").insertOne(newNote,function(err,db){
                  if(err)
                  {
                      throw err;
                  }
                   newNote.save();
                    console.log("inserted");
                 
                })

               

              
        
})
res.redirect("/login");
})

app.get("/login",function(req,res){
   res.sendFile(__dirname+"/login.html");
})


app.listen(3000,function(){
    console.log("server running");
})

