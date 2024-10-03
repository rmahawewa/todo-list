import "./style.css";

// import json from './todo_details.json';
const json = require('./todo_details.json');

console.log(json[1]);

json[0].name = "ravini dimanthi";

for (const entry of json){
    console.log(entry.name);
}

// localStorage.setItem("user", JSON.stringify(json));
console.log(localStorage.getItem("user"));
console.log(localStorage.getItem("user1")===null);
// localStorage.setItem("user","abc");
// console.log(localStorage.getItem("user"));
// console.log(JSON.stringify(json));

