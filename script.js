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
        console.log(data);
        
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
            console.log(todo);
        } catch (error) {
            console.log(error);
            
        }
        
    }
} 

function todoListAll(todo) {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" ${todo.completed ? "checked" : ""}>
    <span>${todo.title}</span>`
    todoList.appendChild(li)

    
}