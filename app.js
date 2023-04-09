//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event){
    //Prevents the page from refreshing when submitting
    event.preventDefault();

    //Before creating to-do, check if input is not empty
    if(!(todoInput.value === "")){

        //Create to-do div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create li element
        const newToDo = document.createElement('li');
        newToDo.innerText = todoInput.value;
        newToDo.classList.add('todo-item');
        todoDiv.appendChild(newToDo);

        //Add to-do to local storage
        saveLocalTodos(todoInput.value);

        //Create check mark button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);

        //Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);

        //Append to list
        todoList.appendChild(todoDiv);
    }

    //Clear input value on submit
    todoInput.value = "";
}

function deleteCheck(event){
    const item = event.target;

    //Delete to-do
    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;

        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }

    //Check to-do as completed
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(event){
    const todos = todoList.childNodes;

    //Filter between all, completed and uncompleted to-dos
    todos.forEach((todo) => {
        switch(event.target.value){

            case 'all':
                todo.style.display = 'flex';
                break;

            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;

            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    let todos;

    //Check if there already are to-dos in local storage
    if(localStorage.getItem('todos') === null){
        //If not, create an empty array
        todos = [];
    }
    else{
        //If there are, get them from local storage as an array
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //If we have an array, push a new to-do into it
    //and send it back to local storage
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    
}

function getTodos(){

    //If we refresh the window, get the unremoved to-dos
    let todos;

    //Check if there already are to-dos in local storage
    if(localStorage.getItem('todos') === null){
        //If not, create an empty array
        todos = [];
    }
    else{
        //If there are, get them from local storage as an array
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach((todo) => {
        //To-do div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create li element
        const newToDo = document.createElement('li');
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        todoDiv.appendChild(newToDo);

        //Create check mark button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);

        //Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);

        //Append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){

    //If we remove to-dos, remove them from local storage aswell
    let todos;

    //Check if there already are to-dos in local storage
    if(localStorage.getItem('todos') === null){
        //If not, create an empty array
        todos = [];
    }
    else{
        //If there are, get them from local storage as an array
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //Get the index of the element we want to remove
    const todoValue = todo.children[0].innerText;

    //Remove the element from the array
    todos.splice(todos.indexOf(todoValue), 1);

    //Remove the element from local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}