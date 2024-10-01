function create_user(name, password){
    // let user_string = '"name": ' + '"'+ name + '" , "password": ' + '"' + password +'",';
    let usr_obj = {
        name: name,
        password: password,
    };

    return usr_obj;
}

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

function add_todo_to_project(project_obj, todo_obj){
    project_obj.todos.push(todo_obj);
}

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