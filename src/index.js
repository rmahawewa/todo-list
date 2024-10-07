import {create_user} from "./user_functions.js";
import {create_content} from "./interfaces.js";
import {btn_project} from "./interfaces.js";
import {project_title} from "./interfaces.js";
import {todo_info} from "./interfaces.js";
import {todo_container} from "./interfaces.js";
import {create_todo_of_a_project} from "./interfaces.js";
import {get_selected_todo} from "./interfaces.js";
import {add_project} from "./interfaces.js";
import {add_new_todo} from "./interfaces.js";
import {create_project} from "./user_functions.js";
import {create_todo} from "./user_functions.js";
const { compareAsc } = require("date-fns");
import "./style.css";

if(localStorage.getItem("todo_user")===null){
    let usr = JSON.stringify(create_user().usr_obj);
    localStorage.setItem("todo_user", usr);
}

let modal = document.querySelector("#modal");
let create_cont = create_content();
let major_content = create_cont.content;
let cont = document.querySelector("#content");
cont.innerHTML = major_content;
let projects_list = document.querySelector("#project-list");
let project_view = document.querySelector("#selected-project-view");

    
view_projects();

cont.addEventListener("click", function(e){
    if(e.target.getAttribute("class") !== null && e.target.getAttribute("class").toString().localeCompare("project-btn") === 0){
        const project_code = e.target.getAttribute("id").toString();
        view_selected_project(project_code);
    }
    
    // this code executes when an individual todo card is clicked
    if((e.target.parentNode.getAttribute("class") !== null && e.target.parentNode.getAttribute("class").includes("todo-card")) || (e.target.getAttribute("class") !== null && e.target.getAttribute("class").includes("todo-card"))){
        let class_words = "";

        if(e.target.parentNode.getAttribute("class") !== null && e.target.parentNode.getAttribute("class").includes("todo-card")){
            class_words = e.target.parentNode.getAttribute("class");
        }

        if(e.target.getAttribute("class") !== null && e.target.getAttribute("class").includes("todo-card")){
            class_words = e.target.getAttribute("class");
        }
        let codes_array = get_todo_codes(class_words).codes_array;
        let project = get_selected_project(codes_array[0]).prj;
        let todo = get_todo_obj(project, codes_array[1]).todo;
        let selected_todo = get_selected_todo(todo.todo_title,todo.todo_description,todo.todo_due_date,todo.todo_priority,codes_array[0],codes_array[1]).todo_view;
        modal.innerHTML = selected_todo;
        modal.setAttribute("style","display: flex;");
    }

    if(e.target.getAttribute("id") !== null && e.target.getAttribute("id").toString().localeCompare("add-project") === 0){
        modal.innerHTML = add_project;
        modal.setAttribute("style", "display: flex;");
    }

    if(e.target.getAttribute("id") !== null && e.target.getAttribute("id").toString().localeCompare("add-new-todo") === 0){
        const project_code = e.target.getAttribute("class");
        let add_todo = add_new_todo(project_code).add_todo;
        modal.innerHTML = add_todo;
        modal.setAttribute("style", "display: flex;");
    }

    if(e.target.getAttribute("class") !== null && e.target.getAttribute("class").toString().localeCompare("project-remove-btn") === 0){
        const project_code = e.target.getAttribute("name");
        remove_project(project_code);
        view_projects();

    }
});

modal.addEventListener("click", function(e){
    if(e.target.getAttribute("id") !== null && e.target.getAttribute("id").localeCompare("mark-complete") === 0){
        const prj_code = document.querySelector("#project-code").value;
        const todo_code = document.querySelector("#todo-code").value;
        mark_todo_as_complete(prj_code, todo_code);
        view_selected_project(prj_code);
        close_modal();
    }

    if(e.target.getAttribute("id") !== null && e.target.getAttribute("id").localeCompare("todo-edit-btn") === 0){
        const prj_code = document.querySelector("#project-code").value;
        const todo_code = document.querySelector("#todo-code").value;

        const prj_title = document.querySelector("#edit-todo-name").value;
        const description = document.querySelector("#edit-todo-description").value;
        const duedate = document.querySelector("#edit-todo-due-date").value;
        const priority = document.querySelector('input[name=todo-priority]:checked').value;

        if(prj_title.localeCompare("")!==0 && description.localeCompare("")!==0 && duedate.localeCompare("")!=0){
            edit_selected_todo(prj_code, todo_code, prj_title, description, duedate, priority);
            view_selected_project(prj_code);
            close_modal();
        }     
    }

    if(e.target.getAttribute("id") !== null && e.target.getAttribute("id").localeCompare("todo-close-btn") === 0){
        const prj_code = document.querySelector("#project-code").value;
        const todo_code = document.querySelector("#todo-code").value;
        close_modal();
    }

    if(e.target.getAttribute("id") !== null && e.target.getAttribute("id").localeCompare("todo-remove-btn") === 0){
        const prj_code = document.querySelector("#project-code").value;
        const todo_code = document.querySelector("#todo-code").value;
        remove_todo(prj_code, todo_code);
        view_selected_project(prj_code);
        close_modal();
    }
    
    if(e.target.getAttribute("id") !== null && e.target.getAttribute("id").localeCompare("project-submit") === 0){
        const prj_name = document.querySelector("#add-project-name").value;
        const description = document.querySelector("#add-project-description").value;
        const priority = document.querySelector('input[name=proj-priority]:checked').value;
        const is_completed = "no";
        const completed_date = "";

        if(prj_name.localeCompare("")!==0 && description.localeCompare("")!==0){
            const project_obj = create_project(prj_name, description, priority, is_completed, completed_date).project_obj;
            const user_obj = get_user().user_obj;
            user_obj.projects.push(project_obj);
            console.log(user_obj);

            let usr = JSON.stringify(user_obj);
            localStorage.setItem("todo_user", usr);

            view_projects();
            close_modal();
        }        
    }
    
    if(e.target.getAttribute("id") !== null && e.target.getAttribute("id").localeCompare("project-cancel") === 0){
        close_modal();
    }

    if(e.target.getAttribute("id") !== null && e.target.getAttribute("id").localeCompare("todo-submit") === 0){
        const project_code = document.querySelector("#prj-code-add-todo").value;
        const todo_name = document.querySelector("#add-todo-name").value;
        const todo_description = document.querySelector("#add-todo-description").value;
        const todo_due_date = document.querySelector("#todo-due-date").value;
        const priority = document.querySelector('input[name=add-todo-priority]:checked').value;
        const is_completed = "no";
        const completed_date = "";

        if(todo_name.localeCompare("")!==0 && todo_description.localeCompare("")!==0 && todo_due_date.localeCompare("")!=0){
            const todo_object = create_todo(todo_name, todo_description, todo_due_date, priority, is_completed, completed_date).todo_obj;
            save_new_todo_in_selected_project(project_code, todo_object);
            view_selected_project(project_code);
            close_modal();
        }        
    }

    if(e.target.getAttribute("id") !== null && e.target.getAttribute("id").localeCompare("todo-cancel") === 0){
        close_modal();
    }

});

function view_projects(){
    let user_obj = get_user().user_obj;
    let projects = user_obj.projects;
    projects_list.innerHTML = "";
    
    for(const pr of projects){
        let pr_btn = btn_project(pr.project_name, pr.project_code).btn;
        projects_list.innerHTML += pr_btn;
    }

    document.querySelector("#selected-project-view").innerHTML = "";
}

function view_selected_project(project_code){
    let project = get_selected_project(project_code).prj;
    let todos = project.todos;
    let project_todo_info = get_todo_details_for_project(todos);
    let proj_title = project_title(project_code, project.project_name, project.project_added_date, project.project_priority, project.project_description).project;
    let todo_infos = todo_info(project_todo_info.total_todo, project_todo_info.todo_high_prty, project_todo_info.todo_medium_prty, project_todo_info.todo_low_prty).view;
    let todo_cards = display_project_todos(todos, project_code).todo_collection;
    let todo_cntnr = todo_container(todo_cards).todo_container;

    project_view.innerHTML = "";
    project_view.innerHTML += proj_title;
    project_view.innerHTML += todo_infos;
    project_view.innerHTML += todo_cntnr;
}

function remove_todo(project_code, todo_code){
    let user_obj = get_user().user_obj;
    let info = get_project_and_indexs(project_code, todo_code);

    let project_index = info.project_index;
    let project = info.project;

    let todo_index = info.todo_index;
    user_obj.projects[project_index].todos.splice(todo_index,1);

    let usr = JSON.stringify(user_obj);
    localStorage.setItem("todo_user", usr);

    return;
}

function close_modal(){
    modal.innerHTML = "";
    modal.setAttribute("style", "display: none;");
}

function remove_project(code){
    const project_index = get_selected_project(code).count;
    let user_obj = get_user().user_obj;
    user_obj.projects.splice(project_index, 1);
    let usr = JSON.stringify(user_obj);
    localStorage.setItem("todo_user", usr);
    return;
}

function get_project_and_indexs(project_code, todo_code){
    let project_index = get_selected_project(project_code).count;
    let project = get_selected_project(project_code).prj;

    let todo_index = get_todo_obj(project, todo_code).count;

    return {project_index, project, todo_index};
}

function mark_todo_as_complete(project_code, todo_code){
    const date = new Date();
    let user_obj = get_user().user_obj;

    let info = get_project_and_indexs(project_code, todo_code);

    let project_index = info.project_index;
    let project = info.project;

    let todo_index = info.todo_index;

    user_obj.projects[project_index].todos[todo_index].todo_is_completed = "yes";
    user_obj.projects[project_index].todos[todo_index].todo_completed_date = date.toISOString();
    let usr = JSON.stringify(user_obj);
    localStorage.setItem("todo_user", usr);

    return;
}

function edit_selected_todo(project_code, todo_code, name, description, duedate, priority){
    let user_obj = get_user().user_obj;
    let info = get_project_and_indexs(project_code, todo_code);
    let project_index = info.project_index;
    let project = info.project;
    let todo_index = info.todo_index;

    user_obj.projects[project_index].todos[todo_index].todo_title = name;
    user_obj.projects[project_index].todos[todo_index].todo_description = description;
    user_obj.projects[project_index].todos[todo_index].todo_due_date = duedate;
    user_obj.projects[project_index].todos[todo_index].todo_priority = priority;

    let usr = JSON.stringify(user_obj);
    localStorage.setItem("todo_user", usr);

    return;
}

function save_new_todo_in_selected_project(prj_code, todo_obj){
    let user_obj = get_user().user_obj;

    const prj_index = get_selected_project(prj_code).count;
    user_obj.projects[prj_index].todos.push(todo_obj);

    let usr = JSON.stringify(user_obj);
    localStorage.setItem("todo_user", usr);

    return;
}

function get_user(){
    let user = localStorage.getItem("todo_user");
    let user_obj = JSON.parse(user);
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

    for(const todo of todos){
        let name = todo.todo_title;
        let code = todo.todo_code;
        let priority = todo.todo_priority; 
        let duedt = todo.todo_due_date;  
        let is_complete = todo.todo_is_completed;
        let card = create_todo_of_a_project(name, code, priority, project_code, duedt, is_complete).todo;
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