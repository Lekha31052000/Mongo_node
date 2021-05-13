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

const loginSchema ={
    
    email:String,
    pass:String,
    
}

const Newlog=mongoose.model("Newlog",loginSchema);


app.get("/login",function(req,res){
   res.sendFile(__dirname+"/login.html");
   
})




app.post("/login",function(req,res){
    let login=new Newlog({
        
        email:req.body.email,
        pass:req.body.pass,
        
    })
   
    mongoose.connect(url,function(err,db){
        let query={email:req.body.email,pass:req.body.pass};
        db.collection("form_details").find(query).toArray(function(err,result){
            if(err)
            throw err;
            
           
            if(result.length>0)
            {
                res.redirect("/profile")

            }
            else{
                res.redirect("/login");
               
            
            }
        })
        
           
            
                
                 
                })

               

              
        
})


app.get("/profile",function(req,res){
    res.sendFile(__dirname+"/profile.html");
})



app.listen(3000,function(){
    console.log("server running");
})

