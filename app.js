var express =require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var app=express();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true});
const itemSchema={
    name:String
}
const Item=mongoose.model("Item",itemSchema);
const item1= new Item({
    name:"Welcome to website",
});
const item2= new Item({
    name:"hello ",
});
const item3= new Item({
    name:"enjoy",
});
const d=[item1,item2,item3];
/*Item.insertMany(d,function(err)
{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("succenssfully saved item to db");
    }
})*/

app.get("/",function(req,res)
{
     //res.send("hey friends");
     Item.find({},function(err,f)
     {
         //console.log(f);
         if(f.length===0)
         {
            Item.insertMany(d,function(err)
            {
                if(err)
                {
                    console.log(err);
                }
                else{
                    console.log("succenssfully saved item to db");
                }
            });
            res.redirect("/");
         }
         else{
            res.render("list",{newListItem:f});
         }
         //res.render("list",{newListItem:f});
     });
    
})
app.post("/",function(req,res)
{
    const itemName=req.body.n;
    //i=req.body.n;
    //console.log(i);
    //i1.push(i);
    //res.render("List",{newListItem:i});
    //res.redirect("/");
    const item=new Item({
        name:itemName
    });
    item.save();

    res.redirect("/");
});
app.post("/delete",function(req,res)
{
   //console.log(req.body.checkbox);
   const check=req.body.checkbox;
  Item.findByIdAndRemove(check,function(err)
  {
      if(!err)
      {
          console.log("Successfully deleted");
          res.redirect("/");
      }
  })
});


app.listen(3000,function(){
    console.log("Listening to the port 3000");
});