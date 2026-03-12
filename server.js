const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

mongoose.connect("YOUR_MONGODB_ATLAS_CONNECTION_STRING")
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