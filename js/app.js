// date info
const dateMonth = document.getElementById('date-month')
const dateYear = document.getElementById('date-year')
const dateNumber = document.getElementById('date-number')
const dateText = document.getElementById('date-text')
// Task container
const taskContainer = document.getElementById('task-container')

const setDate =()=>{
  const date = new Date()
  dateMonth.textContent=date.toLocaleString('en', {month: 'short'})
  dateNumber.textContent=date.toLocaleString('en',  {day: 'numeric'} )
  dateText.textContent=date.toLocaleString('en', {weekday:'long'})
  dateYear.textContent=date.toLocaleString('en', {year:'numeric'})
}
function cargarReloj(){
  let fechahora = new Date()
  let hora = fechahora.getHours() 
  let minuto = fechahora.getMinutes()
  let segundo = fechahora.getSeconds()
  let meridiano = "AM";
  if(hora == 0){
      hora = 12;
  }
  if(hora > 12) {
      hora = hora - 12;
      meridiano = "PM";
  }
  hora = (hora < 10) ? "0" + hora : hora;
  minuto = (minuto < 10) ? "0" + minuto : minuto;
  segundo = (segundo < 10) ? "0" + segundo : segundo;
  let tiempo = hora + ":" + minuto + ":" + segundo + " " + meridiano;    
  document.getElementById("clock").innerText = tiempo;
  document.getElementById("clock").textContent = tiempo;
  setTimeout(cargarReloj, 500);
  
}

const addNewTask = event =>{
  event.preventDefault()
  const {value}=event.target.taskText
  if(!value)return
  const task = document.createElement('div')
  task.classList.add('task', 'round-border')
  const taskContent = document.createElement('div')
  taskContent.classList.add('content')
  task.appendChild(taskContent)
  taskContainer.prepend(task)
  const taskInput = document.createElement('input')
	taskInput.classList.add('text-container')
	taskInput.type = 'text'
  taskInput.setAttribute('readonly', 'readonly')
	taskInput.value = value
	taskInput.setAttribute('readonly', 'readonly')
	taskContent.appendChild(taskInput)
  const taskActions = document.createElement('div')
  taskActions.classList.add('actions')
  const editBtn= document.createElement('button')
  editBtn.classList.add('edit')
  editBtn.innerHTML='Edit'
  const deleteBtn= document.createElement('button')
  deleteBtn.classList.add('delete')
  deleteBtn.innerHTML='Delete'
  const doneBtn= document.createElement('button')
  doneBtn.classList.add('done-btn')
  doneBtn.innerHTML='Done'
  taskActions.appendChild(editBtn)
	taskActions.appendChild(deleteBtn)
  taskActions.appendChild(doneBtn)
	task.appendChild(taskActions)
  event.target.reset()

  editBtn.addEventListener('click', ()=>{
    if(editBtn.innerText.toLowerCase()== 'edit'){
      taskInput.removeAttribute('readonly')
      taskInput.focus()
      editBtn.innerText='Save'
      }else {
      editBtn.innerText = 'Edit'
      taskInput.setAttribute('readonly', 'readonly')
      }
    })

  deleteBtn.addEventListener('click', () => {
		taskContainer.removeChild(task);
	})

  const clean = document.getElementById('clean-btn')
  clean.addEventListener('click', () => {
    taskContainer.removeChild(task);
  })

  doneBtn.addEventListener('click', ()=>{
    if(doneBtn.innerText.toLowerCase()=='done'){
      task.classList.toggle('done')
      doneBtn.classList.toggle('uncheck')
      doneBtn.innerText='Uncheck'
    }else{
      doneBtn.innerText='Done'
      task.classList.remove('done')
      doneBtn.classList.remove('uncheck')
    }
  })
}



const order =()=>{
  const done =[]
  const toDo=[]
  taskContainer.childNodes.forEach(elemento =>{
    elemento.classList.contains('done')? done.push(elemento) : toDo.push(elemento)
  })
  return[...toDo, ...done]
}
const renderOrderedTask=()=>{
  order().forEach(elemento=>taskContainer.appendChild(elemento))
}

setDate()
cargarReloj()
