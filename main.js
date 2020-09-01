//selecter

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todo = document.querySelector(".todo");
const todoOption = document.querySelector('.filter-todo');

// events
document.addEventListener('DOMContentLoaded' , getTodo)
todoButton.addEventListener("click", addtodo);
todoList.addEventListener("click" , deleteCheck);
todoOption.addEventListener('click',filtertodo);

//functions

function addtodo(event){

    //prevent from submitting
    event.preventDefault();

    // create div
   const todoDiv = document.createElement('div');
   todoDiv.classList.add('todo');

   //create li
   const newTodo = document.createElement('li');
   newTodo.innerText = todoInput.value;
   newTodo.classList.add('todo-item');
   todoDiv.appendChild(newTodo);

   //add todo localstorage
   savetodo(todoInput.value)

   //chk mark button
    const checkButton= document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("chk-button");
    todoDiv.appendChild(checkButton);

   //delete button
   const trashButton= document.createElement('button');
   trashButton.innerHTML = '<i class="fas fa-times"></i>';
   trashButton.classList.add("trash-button");
   todoDiv.appendChild(trashButton);

   //append todoDiv
   todoList.appendChild(todoDiv);

   //clear todo input
   todoInput.value="";
}

function deleteCheck(a) {
    // console.log(a.target);
    const item =a.target
    if(item.classList[0]==="trash-button"){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removetodo(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    if(item.classList[0]==='chk-button'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function filtertodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all" :
                todo.style.display = 'flex';
                break;
           case "completed":
               if(todo.classList.contains('completed')){
                todo.style.display = 'flex';
               }else{
                todo.style.display = 'none';
               }
               break;
           case "uncompleted":
               if(!todo.classList.contains('completed')){
                   todo.style.display = 'flex';
               }
               else{
                todo.style.display = 'none';
               }
               break;
        }       
    })
}

//saving to local storage
function savetodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos' , JSON.stringify(todos));
}

//get back from local storage
function getTodo(){
    let todos;
    if(localStorage.getItem('todos')=== null)
    {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        
                // create div
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');

            //create li
            const newTodo = document.createElement('li');
            newTodo.innerText = todo;
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);


            //chk mark button
            const checkButton= document.createElement('button');
            checkButton.innerHTML = '<i class="fas fa-check"></i>';
            checkButton.classList.add("chk-button");
            todoDiv.appendChild(checkButton);

            //delete button
            const trashButton= document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-times"></i>';
            trashButton.classList.add("trash-button");
            todoDiv.appendChild(trashButton);

            //append todoDiv
            todoList.appendChild(todoDiv);

    })
}

function removetodo(todo){
    let todos;
    if(localStorage.getItem('todos')=== null)
    {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // console.log(todo.children[0].innerText);
    // console.log(todos.indexOf(todo.children[0].innerText))
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}