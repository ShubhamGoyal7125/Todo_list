//jshint eversion:6

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.get("/", function (req, res){
    
    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);
    res.render("list", {listTitle: day, listItems: items});
});

app.post("/", function(req, res){

    let nextItem = req.body.nextItem;

    if(req.body.list === "Work"){
        workItems.push(nextItem);
        res.redirect("/work");
    }else{
        items.push(nextItem);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", listItems: workItems});
});

app.post("/work",function (req, res) {
   let newWorkItem = req.body.nextItem;
   workItems.push(newWorkItem);
   res.redirect("/work");
});

app.get("/about", function (req, res){
    res.render("about");
});

app.listen(3000, function (){
    console.log("Server running at port: 3000");
});