//selectors 
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const alert = document.querySelector(".alert")

//functions
const addTodo=(event)=>{
    //prevent button fromsubmitting the fucntion
    event.preventDefault()
     if(!todoInput.value) {
        alert.innerText = "Please enter a valid value"
        alert.classList.add("error")
        alert.style.visibility = 'visible'
        setTimeout(()=>{
        alert.style.visibility = 'hidden'
        alert.classList.remove("error")
       },1500)
     } else {
        const todoDiv= document.createElement("div")
        todoDiv.classList.add("todoDiv")
        todoDiv.innerHTML = `
            <li class="todo-item">${todoInput.value}</li>
            <button class="complete-btn">
                <i class="fas fa-check"></i> 
             </button>
             <button class="delete-btn">
                <i class="fas fa-trash"></i>
             </button>`
          todoList.appendChild(todoDiv)
          saveLocalTodos(todoInput.value)
       // clearing the input after pressing the button 
           todoInput.value=""
           alert.innerText= "item Successfully added"
           alert.style.visibility = 'visible'
           alert.classList.add("success")
           setTimeout(()=>{
            alert.style.visibility = 'hidden'
            alert.classList.remove("success")

           },1500)
         }
       }
    //creating tododiv 
   
    
    /*
     <div class="todoDiv">
        <li class="todo-item"></li>
        <button class="complete-btn"></button>
        <button class="delete-btn"></button>
     </div>

     */
  // create LI
  // const newTodo = document.createElement("li")
  // newTodo.classList.add("todo-item")
  // newTodo.innerText= todoInput.value
  // todoDiv.appendChild(newTodo)

  // creating completed button 
  // const completedButton = document.createElement("button")
  // completedButton.classList.add("completed-btn")
  // completedButton.innerHTML = '<i class="fas fa-check"></i>'
  // todoDiv.appendChild(completedButton)
  // todoList.appendChild(todoDiv)
  // creating  deleted button 
  // const deleteButton = document.createElement("button")
  // deleteButton.classList.add("delete-btn")
  // deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
  // todoDiv.appendChild(deleteButton)
  // append todoDiv to UL 
 

  const deleteComplete = (event) => {
  const item = event.target
  if(item.classList.contains("delete-btn")){
     const todo = item.parentElement;
     todo.classList.add("fall")
     removeLocalTodos(todo)
     todo.addEventListener("transitionend", ()=>{
       todo.remove()
     })
     
  } else if (item.classList.contains("complete-btn")){
    const todo = item.parentElement;
    todo.classList.toggle("completed");
   
   }
}

const filterTodo = (event)=>{
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
     console.log(event.target.value)
     switch(event.target.value) {
          case "all":
          todo.style.display = "flex"
          break;
          case "completed":
          if(todo.classList.contains("completed")){
             todo.style.display= "flex"
          } else {
            todo.style.display = "none"
          }
          break;
          case "uncompleted":
            if(!todo.classList.contains("completed")){
              todo.style.display = "flex"
           } else {
             todo.style.display = "none"
           }
           break;
      }
  })
}

const saveLocalTodos = (todo)=>{
  let todos;
  if(localStorage.getItem('todos')== null){
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  todos.push(todo)
  localStorage.setItem("todos",JSON.stringify(todos))
}

const getTodos =()=> {
  let todos;
  if(localStorage.getItem('todos')== null){
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
   todos.forEach(function(todo){
     const todoDiv= document.createElement("div")
    todoDiv.classList.add("todoDiv")
    todoDiv.innerHTML = `
        <li class="todo-item">${todo}</li>
        <button class="complete-btn">
            <i class="fas fa-check"></i> 
         </button>
         <button class="delete-btn">
            <i class="fas fa-trash"></i>
         </button>`
      todoList.appendChild(todoDiv)
   })
}

const removeLocalTodos = (todo)=>{
  let todos;
  if(localStorage.getItem('todos')===null){
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
   const text = todo.children[0].innerText
 
   console.log(text)
  //  let startIndex = todos.indexOf(text)
  //  todos.splice(startIndex,1)
  // console.log(todos)
  todos.splice(todos.indexOf(text),1)
   localStorage.setItem("todos",JSON.stringify(todos))
}

  //event-listeners 
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click",deleteComplete)
filterOption.addEventListener("click", filterTodo)
document.addEventListener("DOMContentLoaded",getTodos)