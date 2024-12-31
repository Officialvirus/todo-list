const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

addTaskButton.addEventListener('click', () => {
  const task = taskInput.value.trim();
  if (task) {
    addTaskToUI(task);
    saveTask(task);
    taskInput.value = '';
  }
});

taskList.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const taskItem = e.target.parentElement;
    deleteTask(taskItem.textContent.trim());
    taskList.removeChild(taskItem);
  }
});

function addTaskToUI(task) {
  const li = document.createElement('li');
  li.textContent = task;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  li.appendChild(deleteButton);

  taskList.appendChild(li);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(addTaskToUI);
}

function deleteTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
