javascript
// Get page elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Array to store tasks
let tasks = [];

// Load data from localStorage on page load
window.onload = function () {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
};

// Render task list
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((item, index) => {
        const li = document.createElement('li');
        if (item.completed) li.classList.add('completed');
        li.innerHTML = `
            <span>${item.text}</span>
            <div class="btn-group">
                <button class="complete-btn" onclick="toggleDone(${index})">Выполнено</button>
                <button class="delete-btn" onclick="delTask(${index})">Удалить</button>
            </div>
        `;
        taskList.appendChild(li);
    });
    saveToLocal();
}

// Add new task
addBtn.addEventListener('click', function () {
    const val = taskInput.value.trim();
    if (!val) {
        alert('Введите текст задачи');
        return;
    }
    tasks.push({
        text: val,
        completed: false
    });
    taskInput.value = '';
    renderTasks();
});

// Toggle task completion status
function toggleDone(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Delete task
function delTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Save tasks to localStorage
function saveToLocal() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
