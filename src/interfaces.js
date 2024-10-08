const { compareAsc } = require("date-fns");

let profile_one = `
    <div class="login-signin"><button id="login" class="log-btn">Login</button><button id="signin" class="log-btn">Sign in</button></div>
`;

let profile_two = `
    <div class="log-out"><div class="user-name"><label id="username"></label></div><button id="logout" class="log-btn">Log out</button></div>
`;

function create_content(){
    let content = `
    <div class="project-section">
        <button id="add-project">Add new Project</button>
        <label id="project-list-lbl">Project list</label>
        <div id="project-list">
            

        </div>
    </div>
    <div id="selected-project-view">
        
    </div>
    `;

    return {content};
}

function btn_project(prj_name, prj_code){
    let btn=`
        <div class="project-btn" id=`+ prj_code +`>
            <label class="project_name_btn">`+ prj_name +`</label>
            <button class="project-remove-btn" name=`+ prj_code +`>X</button>
        </div>        
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
function project_title(code, title, date_of_start, priority, description){
    let project = `
        <div id="proj-descrp">
            <div class="prj_title">
                <label id="prj-name-lbl"><span>Project</span>: `+ title +`</label> 
                <button id="add-new-todo" class=`+ code +`>Add new todo</button>      
            </div>
            <div class="add-gap">
                <label id="date-created-lbl"><span>Date created</span>: `+ date_of_start +`</label>
                <label id"prj-prty"><span>Priority</span>: `+ priority +`</label>
            </div>
            <div>
                <label id="prj-desc"><span>Description</span>: `+ description +`</label>
            </div>
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
            <div class="todo-infos slate" >`+ low_pr_tot +` of low priority</div>
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
function create_todo_of_a_project(name, todo_code, priority, project_code, duedate, is_complete){
    let today = get_date_in_calender_format().formatted_date;
    const date_compare = compareAsc(duedate, today);
    const not_late = "&#9203;";
    const on_duedate = "&#10069;";
    const late = "&#10071;";
    const complete = "&#9989";
    let symbol = "";
    symbol = date_compare == -1 ? late : (date_compare == 0 ? on_duedate : (date_compare == 1 ? not_late : ""));
    symbol = is_complete.localeCompare("yes") === 0 ? complete : symbol;
    let v = priority.localeCompare("high")===0?"h":(priority.localeCompare("medium")===0?"m":"l");
    let todo = `
        <div class="todo-card `+ project_code +`|`+ todo_code +` `+ priority +`">
            <label class="todo-title">`+ name +`</label>
            <label class="todo-priority">`+ v +`</label>
            <label class="todo-stts" id="symbl">`+ symbol +`</label>
        </div>
    `;
    return {todo};
}

function get_date_in_calender_format(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if(Number(day) < 10){ day = "0" + day; }
    if(Number(month) < 10){ month = "0" + month; }

    const formatted_date = year + "-" + month + "-" + day;

    return {formatted_date};
}

function add_new_todo(project_code){
    let date = get_date_in_calender_format().formatted_date;
    let add_todo = `
    <div class="todo" id="add-todo">
        <h3>Add new todo</h3>
        <input type="hidden" id="prj-code-add-todo" value=`+ project_code +`>
        <input type="text" id="add-todo-name" placeholder="Todo name" required>
        <textarea id="add-todo-description" placeholder="Todo description" rows="10" required></textarea>
        <div class="due-date">
            <label id="due-date-lbl">Due date</label>
            <input type="date" id="todo-due-date" class="calender todo-calender" value="`+ date +`" required>
        </div>
        <div class="div-priority">
            <label id="priority-lbl">Priority</label>
            <div class="priority-radio">
                <input type="radio" id="rd-h" name="add-todo-priority" value="high" checked>
                <label>High</label>
                <input type="radio" id="rd-m" name="add-todo-priority" value="medium">
                <label>Medium</label>
                <input type="radio" id="rd-l" name="add-todo-priority" value="low">
                <label>Low</label>
            </div>
        </div> 
        <div id="btns">
            <button id="todo-submit" class="submit-btn">OK</button>   
            <button id="todo-cancel" class="submit-btn">Cancel</button>
        </div>             
    </div>
    `;
    return {add_todo};
}



let add_project = `
    <div class="project" id="add-project-mdl">
        <h3>Add new Project</h3>
        <input type="text" id="add-project-name" placeholder="Project name" required>
        <textarea id="add-project-description" placeholder="Project description" rows="10" required></textarea>
        <div class="div-priority">
            <label id="priority-lbl">Priority</label>
            <div class="priority-radio">
                <input type="radio" id="rd-h" name="proj-priority" value="high" checked>
                <label>High</label>
                <input type="radio" id="rd-m" name="proj-priority" value="medium">
                <label>Medium</label>
                <input type="radio" id="rd-l" name="proj-priority" value="low">
                <label>Low</label>
            </div>
        </div>
        <div id="btns">
            <button id="project-submit" class="submit-btn">OK</button>
            <button id="project-cancel" class="submit-btn">Cancel</button>
        </div>
    </div>
`;

function get_selected_todo(name,description,duedate,priority,project_code,todo_code){
    let h = "";
    let m = "";
    let l = "";
    if(priority.localeCompare("high")===0){h="checked";}
    if(priority.localeCompare("medium")===0){m="checked";}
    if(priority.localeCompare("low")===0){l="checked";}
    let todo_view = `
    <div ciass="view" id="todo-view">
        <div class="actions">
            <button class="view-todo-btn" id="mark-complete" >Mark as complete</button>
            <button class="view-todo-btn" id="todo-edit-btn" >Edit</button>
            <button class="view-todo-btn" id="todo-close-btn">Close</button>
            <button class="view-todo-btn" id="todo-remove-btn">Remove this todo</button>
        </div>
        <input type="hidden" id="project-code" value=`+ project_code +`>
        <input type="hidden" id="todo-code" value=`+ todo_code +`>
        <input type="text" id="edit-todo-name" value="`+ name +`" required>
        <textarea id="edit-todo-description" rows="10" required>`+ description +`</textarea>
        <div class="due-date">
            <label id="due-date-lbl">Due date</label>
            <input type="date" id="edit-todo-due-date" class="calender todo-calender" value="`+ duedate +`">
        </div>
        <div class="div-priority">
            <label id="edit-priority-lbl">Priority</label>
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

export{profile_one, profile_two, create_content, btn_project, btn_todo, project_title, todo_info, todo_container, create_todo_of_a_project, add_new_todo, add_project, get_selected_todo};