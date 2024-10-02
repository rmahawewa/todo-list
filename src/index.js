// import json from './todo_details.json';
const json = require('./todo_details.json');

console.log(json[1]);

for (const entry of json){
    console.log(entry.name);
}
// console.log(JSON.stringify(json));

