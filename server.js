const express=require("express");
const fs=require("fs");
var hbs=require("hbs");
var app=express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper("sayFuckOff",()=>{
  return "Fuck Off!...";
});
hbs.registerHelper("lover",(x,y)=>{
  return x+"love"+y;
});
hbs.registerHelper("maintenanceMessage",(x)=>{
  return `Website on maintenance from ${x}`;
});
app.set("view engine","hbs");
app.use((req,res,next)=>{
  console.log(`${req.originalUrl}-${req.method}`);
  var now=new Date().toString();
  fs.appendFile("./process.log",`${now}\n-URL: ${req.originalUrl}\n-Method: ${req.method}\n`,(err)=>{
    if(err){
      console.log(`Error occured: ${err}`);
    }
  });
  next();
});

app.use((req,res,next)=>{
  var now=new Date().toString();
  fs.appendFile("./process.log",`${now}\n-URL: ${req.originalUrl}\n-Method: ${req.method}\n`,(err)=>{
    if(err){
      console.log(`Error occured: ${err}`);
    }
  });
  res.render("maintenance",{
    finish:now
  });
});
app.use(express.static(__dirname+"/public"));
app.get(["/","/home"],(req,res)=>{
  res.send({
    status:"OK",
    name:"Kappa"
  });
});

app.get("/h1",(req,res)=>{
  res.send("<h1 style='color:orangered;'>Alright thou!..</h1>");
});

app.get("/about",(req,res)=>{
  res.render("about",{
    name:"Some one",
    birth: new Date().getFullYear()
  });
});
app.get("/noidea",(req,res)=>{
  res.render("ok",{
    name:"Some guy",
    birth: new Date().getFullYear()-1
  });
});
app.get("/bad",(req,res)=>{
  res.status(404).send({
    status:"404 Not found",
    errorMessage:"Bad Gateway"
  });
});

app.listen(3000,()=>{
  console.log("Server ready to go on port 3000");
});
