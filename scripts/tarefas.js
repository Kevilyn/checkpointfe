const logoffButton = document.querySelector("#closeApp")
logoffButton.addEventListener("click", logoff)

const form = document.querySelector("form")
form.addEventListener("submit",  handleSubmit)

const valorInput = document.querySelector("#novaTarefa")
const listFinishedTasks = document.querySelector(".tarefas-terminadas")
const listTasks = document.querySelector(".tarefas-pendentes")
listTasks.innerHTML = ""

/*const logoffButton = document.querySelector("#closeApp")
logoffButton.addEventListener("click", logoff)

const form = document.querySelector("form")
form.addEventListener("submit",  handleSubmit)

const valorInput = document.querySelector("#novaTarefa")
const listFinishedTasks = document.querySelector(".tarefas-terminadas")
const listTasks = document.querySelector(".tarefas-pendentes")
listTasks.innerHTML = ""
*/
function handleSubmit(evento){
  evento.preventDefault()
  saveTask({description:valorInput.value, completed: false})
}

function saveTask(task){
  registerTask(task)
  console.log(task, "task")
}




function createTask(task){
    const li = document.createElement("li")
    li.classList.add("tarefa")
    li.innerHTML = 
    `<div class="not-done"></div>
      <div class="descricao">
        <p class="nome"> ${task.description} </p>
        <p class="timestamp">Criada em: ${task.createdAt}</p>
        <button>
          <img src="./assets/deletar.png" alt="">
        </button>
      </div>
    `
    const dot = li.childNodes[0]
    li.addEventListener("dblclick" , () => deleteTask(task.id, li))
    dot.addEventListener('click', () => completeTask(li))
    listTasks.appendChild(li)
}


function completeTask(elemento) {
  const dot = elemento.childNodes[0]
  elemento.remove()
  dot.classList.add('completed')
  dot.addEventListener('click', () => undoCompleted(elemento))
  listFinishedTasks.appendChild(elemento)
}

function undoCompleted(elemento) {
  const dot = elemento.childNodes[0]
  elemento.remove()
  dot.classList.remove('completed')
  dot.addEventListener('click', () => completeTask(elemento))
  listTasks.appendChild(elemento)
}


function removeTask(elemento){
  console.log(elemento)

}


function logoff() {
  localStorage.removeItem('jwt')
  window.location.href = 'index.html'
  console.log('Aooba')
}

async function registerTask(task) {
  const token = localStorage.getItem("jwt")
  if (!token) return;
  const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': token.replaceAll('"', '')
      },
      body: JSON.stringify(task)
  }

  await fetch("https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks", options)
      .then((res) => res.json())
      .then((data) => createTask(data))
      .catch((err) => console.error(err.message))
}

async function getTask() {
  const token = localStorage.getItem("jwt")
  if (!token) return;
  const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': token.replaceAll('"', '')
      },
  }

  await fetch("https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks", options)
      .then((res) => res.json())
      .then((tasks) => tasks.forEach(task => createTask(task)))
      .catch((err) => console.error(err.message))
}

async function deleteTask(id, elemento) {
  const token = localStorage.getItem("jwt")
  if (!token) return;
  elemento.remove()
  const options = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': token.replaceAll('"', '')
      },
  }

  await fetch("https://ctd-fe2-todo-v2.herokuapp.com/v1/task" + id, options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err.message))
}

function filter() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  ul = document.getElementById("tarefas-pendentes");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    nome = li[i].getElementsByClassName("nome")[0];
      txtValue = nome.innerHTML;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
}

getTask()




/*
registerTask({
  "description": "Aprender Javascript",
  "completed": false
})*/