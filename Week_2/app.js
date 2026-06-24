const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const notification = document.getElementById("notification");

function showNotification(message, type) {
    notification.textContent = message;
    notification.className = type;

    setTimeout(() => {
        notification.textContent = "";
        notification.className = "";
    }, 2000);
}

function taskExists(taskText) {
    const tasks = document.querySelectorAll("#taskList li");

    for (let task of tasks) {
        const existingTask = task.querySelector("span").textContent;

        if (existingTask.toLowerCase() === taskText.toLowerCase()) {
            return true;
        }
    }

    return false;
}

addBtn.addEventListener("click", addTask);

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        showNotification("Task cannot be empty!", "error");
        return;
    }

    if (taskExists(task)) {
    showNotification("Task already exists!","error");
    return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${taskText}</span>

        <div class="task-buttons">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    taskList.appendChild(li);

    taskInput.value = "";

    showNotification("Task added successfully!", "success");

    const editBtn = li.querySelector(".edit-btn");
    const deleteBtn = li.querySelector(".delete-btn");

    editBtn.addEventListener("click", () => {
        const taskSpan = li.querySelector("span");

        const updatedTask = prompt(
            "Edit Task:",
            taskSpan.textContent
        );

        if (
            updatedTask !== null &&
            updatedTask.trim() !== ""
        ) {
            taskSpan.textContent = updatedTask.trim();
            showNotification(
                "Task updated successfully!",
                "success"
            );
        } else if (updatedTask !== null) {
            showNotification(
                "Task cannot be empty!",
                "error"
            );
        }
    });

    deleteBtn.addEventListener("click", () => {
        li.remove();

        showNotification(
            "Task deleted successfully!",
            "success"
        );
    });
}