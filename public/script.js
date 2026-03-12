const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const total = document.getElementById("totalStudents");

form.addEventListener("submit", async (e)=>{

e.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const course = document.getElementById("course").value;

await fetch("/addStudent",{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({name,email,course})

});

loadStudents();

});

async function loadStudents(){

const res = await fetch("/students");

const data = await res.json();

table.innerHTML="";

total.innerText = data.length;

data.forEach(student=>{

const row = `
<tr>
<td>${student.name}</td>
<td>${student.email}</td>
<td>${student.course}</td>
</tr>
`;

table.innerHTML += row;

});

}

loadStudents();