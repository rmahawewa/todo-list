const json = require('./todo_details.json');

// let user = {};

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

//this function finds the user object from json array and assign this object to the user variable
function get_user(index){
    let user = json[index];
    return {user};
}


// this function is to create a new user object
function create_user(){
    const code = generate_code("user").code;
    const pr_code = generate_code("project").code;
    const date_created = new Date();

    let usr_obj = {
        // name: name,
        // password: password,
        user_code: code,
        account_date: date_created,
        projects: [
            {
                project_code: pr_code,
                project_name: "Default project",
                project_description: "This is the default project",
                project_added_date: date_created,
                project_end_date: "",
                project_priority: "medium",
                project_is_completed: "no",
                project_completed_date: "",
                todos: [
                    {
                        todo_code: "todo123",
                        todo_title: "todo1",
                        todo_description: "todo1 description",
                        todo_added_date: "2024-10-01",
                        todo_due_date: "2025-12-10",
                        todo_priority: "medium",
                        todo_is_completed: "no",
                        todo_completed_date: ""
                    },
                    {
                        todo_code: "todo456",
                        todo_title: "todo2",
                        todo_description: "todo2 description",
                        todo_added_date: "2024-10-11",
                        todo_due_date: "2025-12-16",
                        todo_priority: "medium",
                        todo_is_completed: "no",
                        todo_completed_date: ""
                    },
                    {
                        todo_code: "todo_789",
                        todo_title: "todo3",
                        todo_description: "todo3 description",
                        todo_added_date: "2024-10-05",
                        todo_due_date: "2025-12-05",
                        todo_priority: "high",
                        todo_is_completed: "no",
                        todo_completed_date: ""
                    }
                ],
            },
        ],
    };
    return {usr_obj};
}

//this function is to generate unique code for a project or for a todo
function generate_code(entry){
    const miliseconds = Date.now();
    let code = "";
    if(entry.localeCompare("user") === 0){
        code = "u" + miliseconds;
    }
    if(entry.localeCompare("project") === 0){
        code = "p" + miliseconds;
    }
    if(entry.localeCompare("todo") === 0){
        code = "t" + miliseconds;
    }
    return {code};
}

// this function is to create a new project
function create_project(name, description, date_of_start, due_date, priority, is_completed, completed_date){
    let code = generate_code("project").code;
    let project_obj = {
            project_code: code,
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
    let code = generate_code("todo").code;
    let todo_obj = {
        todo_code: code,
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
export {create_user, generate_code, create_project, add_todo_to_project, create_todo};