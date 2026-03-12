const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

mongoose.connect("mongodb+srv://aabhishekkushwaha9_db_user:Abhishek@123@cluster0.uzqb6os.mongodb.net/?appName=Cluster0")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const studentSchema = new mongoose.Schema({
    name:String,
    email:String,
    course:String
});

const Student = mongoose.model("Student",studentSchema);

app.post("/addStudent",async(req,res)=>{
    const student = new Student(req.body);
    await student.save();
    res.json({message:"Student Added"});
});

app.get("/students",async(req,res)=>{
    const students = await Student.find();
    res.json(students);
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");

});
