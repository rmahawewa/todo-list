const json = require('./todo_details.json');

//this function is to check user name availability
function check_user_availability(username){
    for(let entry of json){
        let name = entry.name;
        if(username.localeCompare(name) === 0){
            return false;
        }
    }
    return true;
}

// this function valiates user login. If user is a valid user function returns the user object index. If user is not valid function 
// returns -1

function validate_user_login(username, password){
    let count = 0;
    for(let entry of json){
        let name = entry.name;
        let password = entry.password;
        if(username.localeCompare(name) === 0 && password.localeCompare(password) === 0){
            return count;
        }
        count++;
    }
    return -1;
}

//


// this function is to create a new user object
function create_user(name, password, date_created, time_created){
    let usr_obj = {
        name: name,
        password: password,
        account_date: date_created,
        account_time: time_created,
        projects: [
            {
                project_name: "Default project",
                project_description: "This is the default project",
                project_start_date: "2024-09-15",
                project_end_date: "2026-04-10",
                project_priority: "medium",
                project_is_completed: "no",
                project_completed_date: "",
                todos: [],
            },
        ],
    };
    return usr_obj;
}

// this function is to create a new project
function create_project(name, description, date_of_start, due_date, priority, is_completed, completed_date){
    let project_obj = {
        project_name: name,
        project_description:description,
        project_start_date: date_of_start,
        project_end_date: due_date,
        project_priority: priority,
        project_is_completed: is_completed,
        project_completed_date: completed_date,
        todos: [],
    };
    // let add_todo = (todo) => {
    //     this.project_obj.todos.push(todo);
    // }
    return {project_obj};
}

//this function is to add a todo into a project
function add_todo_to_project(project_obj, todo_obj){
    project_obj.todos.push(todo_obj);
}

//this function is to create a todo
function create_todo(name, description, start_date, end_date, start_time, end_time, priority, is_completed, completed_date, completed_time){
    let todo_obj = {
        todo_name: name,
        todo_description: description,
        todo_start_date: start_date,
        todo_end_date: end_date,
        todo_start_time: start_time,
        todo_end_time: end_time,
        todo_priority: priority,
        todo_is_completed: is_completed,
        todo_completed_date: completed_date,
        todo_completed_time: completed_time,
    };
    return todo_obj;
}