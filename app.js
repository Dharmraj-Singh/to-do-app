let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
    } else {
        alert("Task cannot be empty!");
    }
};

const updateTasksList = () => {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('taskItem');
        listItem.innerHTML = `
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTaskComplete(${index})"/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="imagesTODO/editIcon.png" alt="Edit" onclick="editTask(${index})"/>
                <img src="imagesTODO/deleteIcon.png" alt="Delete" onclick="deleteTask(${index})"/>
            </div>
        `;
        taskList.appendChild(listItem);
    });

    updateStats();
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
};

const editTask = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        updateTasksList();
    }
};

const deleteTask = (index) => {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        updateTasksList();
    }
};

const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    document.getElementById('numbers').textContent = `${completedTasks} / ${totalTasks}`;

    const progress = document.getElementById('progress');
    progress.style.width = totalTasks === 0 ? "0%" : `${(completedTasks / totalTasks) * 100}%`;
};

document.getElementById('newtask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});

