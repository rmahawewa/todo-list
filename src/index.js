import {create_user} from "./user_functions.js";
import {create_content} from "./interfaces.js";
import {btn_project} from "./interfaces.js";
import {project_title} from "./interfaces.js";
import {todo_info} from "./interfaces.js";
import {todo_container} from "./interfaces.js";
import {create_todo_of_a_project} from "./interfaces.js";
import {get_selected_todo} from "./interfaces.js";
import "./style.css";

// console.log(JSON.stringify(create_user().usr_obj));

if(localStorage.getItem("todo_user")===null){
    let usr = JSON.stringify(create_user().usr_obj);
    localStorage.setItem("todo_user", usr);
}
////////////

let modal = document.querySelector("#modal");
let create_cont = create_content();
let major_content = create_cont.content;
let cont = document.querySelector("#content");
cont.innerHTML = major_content;
let projects_list = document.querySelector("#project-list");
let project_view = document.querySelector("#selected-project-view");
//this variable stores the project code of the selecte project
// const project_code = "";

let user_obj = get_user().user_obj;

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
    
    // this code executes when an individual todo card is clicked
    if((e.target.parentNode.getAttribute("class") !== null && e.target.parentNode.getAttribute("class").includes("todo-card")) || (e.target.getAttribute("class") !== null && e.target.getAttribute("class").includes("todo-card"))){
        console.log("a todo selected");
        let class_words = "";

        if(e.target.parentNode.getAttribute("class").includes("todo-card")){
            class_words = e.target.parentNode.getAttribute("class");
        }

        if(e.target.getAttribute("class").includes("todo-card")){
            class_words = e.target.getAttribute("class");
        }
        console.log(class_words);
        let codes_array = get_todo_codes(class_words).codes_array;
        console.log(codes_array);
        let project = get_selected_project(codes_array[0]).prj;
        let todo = get_todo_obj(project, codes_array[1]).todo;
        let selected_todo = get_selected_todo(todo.todo_title,todo.todo_description,todo.todo_due_date,todo.todo_priority,codes_array[0],codes_array[1]).todo_view;
        modal.innerHTML = selected_todo;
        modal.setAttribute("style","display: flex;");
    }

    
});

modal.addEventListener("click", function(e){
    if(e.target.getAttribute("id") !== null && e.target.getAttribute("id").localeCompare("mark-complete") === 0){
        console.log("mark complete");
        const prj_code = document.querySelector("#project-code").value;
        const todo_code = document.querySelector("#todo-code").value;
        mark_todo_as_complete(prj_code, todo_code);
        console.log(get_user().user_obj);
    }

    if(e.target.getAttribute("id") !== null && e.target.getAttribute("id").localeCompare("todo-edit-btn") === 0){
        console.log("todo edit");
    }

    if(e.target.getAttribute("id") !== null && e.target.getAttribute("id").localeCompare("todo-close-btn") === 0){
        console.log("todo close");
    }

    if(e.target.getAttribute("id") !== null && e.target.getAttribute("id").localeCompare("todo-remove-btn") === 0){
        console.log("todo remove");
    }
});

function mark_todo_as_complete(project_code, todo_code){
    const date = new Date();
    let user_obj = get_user().user_obj;

    let project_index = get_selected_project(project_code).count;
    let project = get_selected_project(project_code).prj;

    let todo_index = get_todo_obj(project, todo_code).count;

    //this line of code update the selected todo's is-complete as completed
    // console.log("completed todo index: " + user_obj.projects[project_index].todos[todo_index]);
    console.log(user_obj.projects[project_index].todos[todo_index]);
    user_obj.projects[project_index].todos[todo_index].todo_is_completed = "yes";
    user_obj.projects[project_index].todos[todo_index].todo_completed_date = date.toISOString();
    console.log(user_obj.projects[project_index].todos[todo_index]);
    let usr = JSON.stringify(user_obj);
    localStorage.setItem("todo_user", usr);

    return;
}

function get_user(){
    let user = localStorage.getItem("todo_user");
    console.log(user);
    let user_obj = JSON.parse(user);
    console.log(user_obj);
    return {user_obj};

}

function get_todo_codes(class_words){
        let class_array = class_words.split(" ");
        let codes = class_array[1];
        let codes_array = codes.split("|");
        return {codes_array};
}

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
    let projects = JSON.parse(localStorage.getItem("todo_user")).projects;
    let prj = {};
    let count = 0;

    for(const project of projects){
        let prj_code = project.project_code;
        if(prj_code.localeCompare(code) === 0){
            prj = project;
            break;
        }
        count++;
    }
    return {prj, count};
}

function get_todo_obj(project, td_code){
    console.log(project);
    let todos = project.todos;
    let todo = {};
    let count = 0;
    for(const t of todos){
        if(t.todo_code.localeCompare(td_code) === 0){
            todo = t;
            break;
        }
        count++;
    }
    return {todo, count};
}