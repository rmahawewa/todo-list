import {create_user} from "./user_functions.js";
import {create_content} from "./interfaces.js";
import {btn_project} from "./interfaces.js";
import {project_title} from "./interfaces.js";
import {todo_info} from "./interfaces.js";
import {todo_container} from "./interfaces.js";
import {create_todo_of_a_project} from "./interfaces.js";
import "./style.css";

// console.log(JSON.stringify(create_user().usr_obj));

if(localStorage.getItem("todo_user")===null){
    let usr = JSON.stringify(create_user().usr_obj);
    localStorage.setItem("todo-user", usr);
}
let user = localStorage.getItem("todo-user");
console.log(user);

let modal = document.querySelector("#modal");
let create_cont = create_content();
let major_content = create_cont.content;
let cont = document.querySelector("#content");
cont.innerHTML = major_content;
let projects_list = document.querySelector("#project-list");
let project_view = document.querySelector("#selected-project-view");

let user_obj = JSON.parse(user);
console.log(user_obj);

    let projects = user_obj.projects;
    for(const pr of projects){
        console.log(pr.project_name);
        let pr_btn = btn_project(pr.project_name, pr.project_code).btn;
        console.log(pr_btn);
        projects_list.innerHTML += pr_btn;
    }


cont.addEventListener("click", function(e){
    if(e.target.getAttribute("class") !== null && e.target.getAttribute("class").toString().localeCompare("project-btn") === 0){
        const project_code = e.target.getAttribute("id").toString();
        let project = get_selected_project(project_code).prj;
        let todos = project.todos;
        let project_todo_info = get_todo_details_for_project(todos);
        let proj_title = project_title(project.project_name, project.project_added_date).project;
        let todo_infos = todo_info(project_todo_info.total_todo, project_todo_info.todo_high_prty, project_todo_info.todo_medium_prty, project_todo_info.todo_low_prty).view;
        let todo_cards = display_project_todos(todos, project_code).todo_collection;
        console.log(todo_cards);
        let todo_cntnr = todo_container(todo_cards).todo_container;
        // todo_cntnr.appendChild(todo_cards);

        project_view.innerHTML = "";
        project_view.innerHTML += proj_title;
        project_view.innerHTML += todo_infos;
        project_view.innerHTML += todo_cntnr;
    }
});

function display_project_todos(todos, project_code){
    let todo_collection = "";
    // console.log("todo container: " + todo_cntnr);
    // todo_cntnr.innerHTML = "12345";

    for(const todo of todos){
        let name = todo.todo_title;
        let code = todo.todo_code;
        let priority = todo.todo_priority;        
        let card = create_todo_of_a_project(name, code, priority, project_code).todo;
        todo_collection += card;
    }
    return {todo_collection};
} 

function get_todo_details_for_project(todos){
    let total_todo = 0;
    let todo_high_prty = 0;
    let todo_medium_prty = 0;
    let todo_low_prty = 0;

    for(let todo of todos){
        total_todo++;
        if(todo.todo_priority.toString().localeCompare("high") === 0){todo_high_prty++;}
        if(todo.todo_priority.toString().localeCompare("medium") === 0){todo_medium_prty++;}
        if(todo.todo_priority.toString().localeCompare("low") === 0){todo_low_prty++;}
    }
    return {total_todo, todo_high_prty, todo_medium_prty, todo_low_prty};
}

function get_selected_project(code){
    let projects = JSON.parse(localStorage.getItem("todo-user")).projects;
    let prj = {};

    for(const project of projects){
        let prj_code = project.project_code;
        if(prj_code.localeCompare(code) === 0){
            prj = project;
            break;
        }
    }
    return {prj};
}