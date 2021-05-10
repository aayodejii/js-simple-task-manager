const form = document.querySelector('#form');
const input = document.querySelector('#input');
const tasksList = document.querySelector('.task-list');
const clearTasks = document.querySelector('#clear');

loadEvent();

function loadEvent() {
  document.addEventListener('DOMContentLoader', getTasks);
  form.addEventListener('submit', createTask);
  tasksList.addEventListener('click', removeTask);
  clearTasks.addEventListener('click', clearAllTasks);
}

getTasks();

//gets saved tasks from the local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(task => {
    createTaskComponent(task);
  });
}

//creates new task and then save the task to local storage
function createTask(e) {
  console.log('worked!');
  const task = input.value;
  if (task === '') {
    alert("Can't submit empty task!");
  } else {
    createTaskComponent(task);
    saveTask(task);
  }

  form.reset();

  e.preventDefault();
}

//create task elements such as the text content, checkbox and the remove icon
function createTaskComponent(task) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  const span = document.createElement('span');
  span.appendChild(checkbox);
  span.appendChild(document.createTextNode(task));
  li.appendChild(span);
  const remove = document.createElement('a');
  remove.innerHTML = '<i class="fas fa-trash-alt remove">';
  li.appendChild(remove);
  tasksList.appendChild(li);
}

//saves the task to the local storage
function saveTask(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//removes selected task from list
function removeTask(e) {
  if (e.target.classList.contains('remove')) {
    if (confirm('Are you sure?')) {
      console.log('remove');
      const selectedTask = e.target.parentElement.parentElement;
      //remove from local storage
      let tasks;
      if (localStorage.getItem('tasks') === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }
      tasks.forEach((task, index) => {
        if (selectedTask.textContent === task) {
          tasks.splice(index, 1);

          console.log('check');
        }
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      selectedTask.remove();
    }
  }
}

//clears every tasks from the UI and the local storage
function clearAllTasks() {
  if (tasksList.childElementCount > 0) {
    if (confirm('Are you sure you want to delete all tasks?')) {
      while (tasksList.firstChild) {
        tasksList.removeChild(tasksList.firstChild);
      }
      localStorage.clear('tasks');
    }
  }
}
