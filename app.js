document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? "checked" : ""}>
                <span>${task.text}</span>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
                <span>${task.completed ? "Completed" : ""}</span>
            `;

            // Add event listeners for edit, delete, and completion
            const editButton = taskItem.querySelector(".edit");
            const deleteButton = taskItem.querySelector(".delete");
            const checkbox = taskItem.querySelector("input");

            editButton.addEventListener("click", () => {
                const newText = prompt("Edit task:", task.text);
                if (newText !== null) {
                    task.text = newText;
                    saveTasks();
                    renderTasks();
                }
            });

            deleteButton.addEventListener("click", () => {
                tasks.splice(i, 1);
                saveTasks();
                renderTasks();
            });

            checkbox.addEventListener("change", () => {
                task.completed = checkbox.checked;
                saveTasks();
                renderTasks();
            });

            taskList.appendChild(taskItem);
        }
    }

    // Add a new task
    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = "";
        }
    });

    // Initialize by rendering tasks
    renderTasks();
});
