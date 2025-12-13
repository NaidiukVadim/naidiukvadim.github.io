const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year}, ${hours}:${minutes}`;
}

function renderTasks() {
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }

        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onclick = () => toggleComplete(task.id);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'task-info';

        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = task.text;
        textSpan.ondblclick = () => enableEdit(task.id, textSpan, infoDiv);

        const dateSpan = document.createElement('span');
        dateSpan.className = 'task-date';
        dateSpan.textContent = formatDate(task.createdAt);

        infoDiv.appendChild(textSpan);
        infoDiv.appendChild(dateSpan);

        taskContent.appendChild(checkbox);
        taskContent.appendChild(infoDiv);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(taskContent);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function addTask(text) {
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = true;
        saveTasks();
        renderTasks();
    }
}

function enableEdit(id, textSpan, container) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.text;
    input.className = 'edit-input';

    container.replaceChild(input, textSpan);
    input.focus();

    input.onkeydown = (e) => {
        if (e.key === 'Enter') {
            if (input.value.trim() !== '') {
                task.text = input.value.trim();
                saveTasks();
                renderTasks();
            }
        }
    };
}

taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && taskInput.value.trim() !== '') {
        addTask(taskInput.value.trim());
        taskInput.value = '';
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderTasks();
    });
});

renderTasks();