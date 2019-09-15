var express=require("express");
var bodyparser=require("body-parser");
var urlencodeparser=bodyparser.urlencoded({extended:false})

var controller=require("./contrller/contrller.js");

var app=new express();
app.set("view engine","ejs");

app.get("/",controller.loginpage);
app.get("/check",controller.check);
app.get("/resetPassword",controller.resetPasswordpage);
app.get("/resetPassword/resetSuccess",controller.resetSucsess);
app.get("/register",controller.register);
app.get("/index",controller.indexpage);
app.get("/student/add",controller.addStudent);
app.get("/student/edit/:id",controller.editStudent);
app.post("/student/editSuccess",urlencodeparser,controller.editSuccess);
app.post("/student/save",urlencodeparser,controller.saveStudent);
app.get("/student/delete/:id",controller.deleteStudent);
app.use('/public',express.static('public'))
app.listen(1215);
console.log("服务已经启动，在http://192.168.9.177:1215");