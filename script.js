const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => renderTask(task.text, task.time, task.completed));
};

// Add Task
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const time = new Date().toLocaleString(); // current date and time
  renderTask(text, time, false);
  saveToLocalStorage();

  taskInput.value = "";
}

// Render task to UI
function renderTask(text, time, completed) {
  const li = document.createElement('li');
  if (completed) li.classList.add('completed');

  li.innerHTML = `
    <div class="task-top">
      <span class="task-text" onclick="toggleComplete(this)">${text}</span>
      <button onclick="deleteTask(this)">X</button>
    </div>
    <div class="task-time">🕒 Added: ${time}</div>
  `;

  taskList.appendChild(li);
}

// Mark as complete
function toggleComplete(span) {
  span.closest('li').classList.toggle('completed');
  saveToLocalStorage();
}

// Delete task
function deleteTask(button) {
  button.closest('li').remove();
  saveToLocalStorage();
}

// Save all tasks to localStorage
function saveToLocalStorage() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.querySelector('.task-text').innerText,
      time: li.querySelector('.task-time').innerText.replace('🕒 Added: ', ''),
      completed: li.classList.contains('completed')
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
