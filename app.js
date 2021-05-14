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
var myDateString = Date();

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
        let query={email:req.body.email,pass:req.body.pass};
        db.collection("form_details").find(query).toArray(function(err,result){
           if(err)
           throw err;
           
          
           if(!result.length)
          
    {

           db.collection("form_details").insertOne(newNote,function(err,db){
             if(err)
             {
                 throw err;
             }
              newNote.save();
             console.log("new data inserted");
              res.redirect("/login");
          
           

           })
       }
       else{
           console.log("data exists");
           res.redirect("/reg");
       }
          

         
       })  


               

              
        
})

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
app.post("/profile",function(req,res){
    res.redirect("/profile");
})


const schema ={
    name:String,
    email:String,
    pass:String,
    password:String,
    dob:String,
    number:String
}

const insert=mongoose.model("insert",schema);

app.get("/insert",function(req,res){
    res.sendFile(__dirname+"/insert.html");
})

app.post("/insert",function(req,res){
    let datainsert=new insert({
        name:req.body.name,
        email:req.body.email,
        pass:req.body.pass,
        password:req.body.password,
        dob:req.body.dob,
        number:req.body.number
    })
   
    mongoose.connect(url,function(err,db){
        
             //  res.send(req.body);
             let query={email:req.body.email,pass:req.body.pass};
             db.collection("form_details").find(query).toArray(function(err,result){
                if(err)
                throw err;
                
               
                if(!result.length)
               
         {

                db.collection("form_details").insertOne(datainsert,function(err,db){
                  if(err)
                  {
                      throw err;
                  }
                   datainsert.save();

                console.log("new data inserted");
                res.redirect("/profile");

                })
            }
            else{
                console.log("data exists");
            res.redirect("/insert");
            }
               

              
            })  
})

})




const delschema ={
   
    email:String
   
}

const delet=mongoose.model("delete",delschema);

app.get("/delete",function(req,res){
    res.sendFile(__dirname+"/delete.html");
})

app.post("/delete",function(req,res){
    let datadel=new delet({
       
        email:req.body.email
      
       
    })
    //res.send(req.body);
    mongoose.connect(url,function(err,db){
        let query={email:req.body.email};
             
            //  dbo.collection("customers").deleteOne(myquery, function(err, obj) {
                db.collection("form_details").deleteMany(query,function(err,db){
                  if(err)
                  {
                      throw err;
                  }
                   //query.save();
                    console.log("new data deleted");
                 
                })

               

              
        
})
res.redirect("/profile");

})


const readSchema ={
    email:String,
    
}

const read=mongoose.model("read",readSchema);

app.get("/read",function(req,res){
    res.sendFile(__dirname+"/read.html");
})

app.post("/read",function(req,res){
    let newread=new read({
        email:req.body.email,
        
    })

    mongoose.connect(url,function(err,db){
        let quer={email:req.body.email};
     
             db.collection("form_details").find(quer).toArray(function(err, result) {
                if (err) throw err;
            
                if(result.length>0)
                {
                    res.redirect("/profile");
                    
                }
                else
                {
                   console.log("no records found:(")
                   res.redirect("/read");
                }
                  
                  console.log(result);
                })

               

              
        
})

        
})










const updateSchema ={
    email:String,
    
}

const update=mongoose.model("update",updateSchema);

app.get("/update",function(req,res){
    res.sendFile(__dirname+"/update.html");
})

app.post("/update",function(req,res){
   

    
    let newup=new update({
        email:req.body.email,
        
    })
   //res.send(req.body);
    mongoose.connect(url,function(err,db){
        let upquer={email:req.body.email};
        var newvalues = { $set: {name:"paapuKutty"} };
      
        db.collection("form_details").updateMany(upquer, newvalues, function(err, res)  {
                if (err) throw err;
            
                
                  console.log("updated successfully");
                 
                })

               
                
              
        
})

res.redirect("/profile");
})








app.listen(3000,function(){
    console.log("server running");
})

