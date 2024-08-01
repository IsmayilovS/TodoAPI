const todoForm = document.querySelector("#todoForm")
const todoInput = document.querySelector("#todoInput")
const todoList = document.querySelector("#todoList")

const API_URL = 'https://jsonplaceholder.typicode.com/todos'


document.addEventListener('DOMContentLoaded', fetchTodoData)
todoForm.addEventListener('submit', addTodo)

async function fetchTodoData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();      
        data.forEach(value => todoListAll(value));
        
    } catch (error) {
        console.log(error);
    }
    
}

async function addTodo(event) {
    event.preventDefault();
    const title = todoInput.value.trim()

    if (title) {
        const newTodo = { title, completed: false}

        try {
            const response = await fetch(API_URL,{
                method: 'POST',
                body: JSON.stringify(newTodo),
                headers:{
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            const todo = await response.json()
            todoListAll(todo)
            todoInput.value =""
        } catch (error) {
            console.log(error);
        }
        
    }
} 

function todoListAll(todo) {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" ${todo.completed ? "checked" : ""}>
    <span>${todo.title}</span>
    <button class="editBtn">Edit</button>
    <button class="dltBtn">Delete</button>`
    todoList.appendChild(li);
    li.dataset.id = todo.id
    const editBtn = li.querySelector('.editBtn');
    editBtn.addEventListener('click',()=> editTodo(li))

}

function editTodo(li) {
    const span = li.querySelector('span');
    const editBtn = li.querySelector('.editBtn');
    const currentText = span.textContent;
    if(editBtn.textContent === 'Edit') { 
    span.innerHTML = `<input type="text" value="${currentText}">`;
    editBtn.textContent = "Save";
}
else{
    const newText = span.querySelector("input").value.trim();
    if (newText) {
        span.textContent = newText;
        editBtn.textContent = "Edit";

    }
}
}


