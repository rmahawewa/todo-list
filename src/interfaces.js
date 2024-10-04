let profile_one = `
    <div class="login-signin"><button id="login" class="log-btn">Login</button><button id="signin" class="log-btn">Sign in</button></div>
`;

let profile_two = `
    <div class="log-out"><div class="user-name"><label id="username"></label></div><button id="logout" class="log-btn">Log out</button></div>
`;

function create_content(){
    let content = `
    <div class="project-section">
        <label id="projects-title">Projects</label>
        <button id="add-project">Add new</button>
        <div id="project-list">
            <label id="project-list">Project list</label>

        </div>
    </div>
    <div id="selected-project-view">
        
    </div>
    `;

    return {content};
}

function btn_project(prj_name, prj_code){
    let btn=`
        <button class="project-btn" id=`+ prj_code +`>`+ prj_name +`</button>
    `;
    return {btn};
}

function btn_todo(todo_name, todo_code, priority){
    let btn=`
        <div class="todo-btn" id=`+ todo_code +`>
            <label>`+ todo_name +`</label>
            <label class=`+ priority +`></label>
        </div>
    `;
    return {btn};
}

//this function is to make the dom element for project title
function project_title(title, date_of_start){
    let project = `
        <div class="prj_title>
            <label id="prj-name-lbl">Project: `+ title +`</label>
            <label id="date-created-lbl">Date created: `+ date_of_start +`</label>
        </div>
    `;
    return {project};
}

//this function creates the view of total number of todos with priorities
function todo_info(total, high_pr_tot, medium_pr_tot, low_pr_tot){
    let view = `
        <div class="todo-info">
            <div class="todo-infos" >Total number of todos: `+ total +`</div>
            <div class="todo-infos red" >`+ high_pr_tot +` of high priority</div>
            <div class="todo-infos green" >`+ medium_pr_tot +` of medium priority</div>
            <div class="todo-infos orange" >`+ low_pr_tot +` of low priority</div>
        </div>
    `;
    return {view};
}

//this is a container to add todos for the selected project
function todo_container(todos){
    let todo_container =  `
        <div class="todo-container"> 
            `+ todos +`
        </div>
    `;
    return {todo_container};
}


//this function creates a todo card for a specific project
function create_todo_of_a_project(name, todo_code, priority, project_code){
    let v = priority.localeCompare("high")===0?"h":(priority.localeCompare("medium")===0?"m":"l");
    let todo = `
        <div class="todo-card `+ project_code +`|`+ todo_code +` `+ priority +`">
            <label class="todo-title">`+ name +`</label>
            <label class="todo-priority">`+ v +`</label>
        </div>
    `;
    return {todo};
}

let add_todo = `
    <div class="todo" id="add-todo">
        <input type="text" id="add-todo-name" placeholder="Todo name">
        <textarea id="add-todo-description" placeholder="Todo description"></textarea>
        <div class="due-date>
            <label id="due-date-lbl">Due date</label>
            <input type="date" id="todo-due-date" class="calender todo-calender">
        </div>
        <div class="div-priority>
            <label id="priority-lbl>Priority</label>
            <div class="priority-radio">
                <input type="radio" id="rd-h" name="todo-priority" value="high">
                <label>High</label>
                <input type="radio" id="rd-m" name="todo-priority" value="medium">
                <label>Medium</label>
                <input type="radio" id="rd-l" name="todo-priority" value="low">
                <label>Low</label>
            </div>
        </div>   
        <button id="todo-submit" class="submit-btn">OK</button>     
    </div>
`;

let add_project = `
    <div class="project" id="add-project">
        <input type="text" id="add-project-name" placeholder="Project name">
        <textarea id="add-project-description" placeholder="Project description"></textarea>
        <button id="project-submit" class="submit-btn">OK</button>
    </div>
`;

function get_selected_todo(name,description,duedate,priority){
    let h = "";
    let m = "";
    let l = "";
    if(priority.localeCompare("high")===0){h="checked";}
    if(priority.localeCompare("medium")===0){m="checked";}
    if(priority.localeCompare("low")===0){l="checked";}
    let todo_view = `
    <div ciass="view" id="todo-view">
        <div class="actions">
            <button class="view-todo-btn" id="mark-complete" >Done</button>
            <button class="view-todo-btn" id="todo-edit-btn" >Edit</button>
            <button class="view-todo-btn" id="todo-close-btn">Close</button>
        </div>
        <input type="text" id="edit-todo-name" value="`+ name +`">
        <textarea id="edit-todo-description">`+ description +`</textarea>
        <div class="due-date>
            <label id="due-date-lbl">Due date</label>
            <input type="date" id="edit-todo-due-date" class="calender todo-calender" value="`+ duedate +`">
        </div>
        <div class="div-priority>
            <label id="edit-priority-lbl>Priority</label>
            <div class="priority-radio">
                <input type="radio" id="edit-rd-h" name="todo-priority" value="high" `+ h +`>
                <label>High</label>
                <input type="radio" id="edit-rd-m" name="todo-priority" value="medium" `+ m +`>
                <label>Medium</label>
                <input type="radio" id="edit-rd-l" name="todo-priority" value="low" `+ l +`>
                <label>Low</label>
            </div>
        </div>
    </div>
    `;
    // do
    return {todo_view};
}

export{profile_one, profile_two, create_content, btn_project, btn_todo, project_title, todo_info, todo_container, create_todo_of_a_project, add_todo, add_project, get_selected_todo};