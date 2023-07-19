const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        taskInput.style.borderColor = "#dc3545";
        return;
    }

    taskInput.style.borderColor = "#ccc";

    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);
    taskInput.value = "";
    taskInput.focus();
    updateEmptyMessage();
}

function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete" onclick="deleteTask(this)"><i class="fas fa-trash"></i></button>
    `;
    li.addEventListener("click", toggleComplete);
    return li;
}

function toggleComplete() {
    this.classList.toggle("completed");
}

function deleteTask(deleteButton) {
    const listItem = deleteButton.parentElement;
    const confirmed = confirm("Are you sure you want to delete this task?");
    if (confirmed) {
        listItem.remove();
        updateEmptyMessage();
    }
}

function clearCompleted() {
    const completedTasks = taskList.querySelectorAll(".completed");
    completedTasks.forEach(task => task.remove());
    updateEmptyMessage();
}

function updateEmptyMessage() {
    const emptyMessage = document.getElementById("emptyMessage");
    emptyMessage.style.display = taskList.children.length === 0 ? "block" : "none";
}

// Add task when pressing Enter key
taskInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        addTask();
    }
});

// Show credits on hover
const footer = document.querySelector("footer");
footer.addEventListener("mouseover", function () {
    footer.style.opacity = "0.7";
});

footer.addEventListener("mouseout", function () {
    footer.style.opacity = "1";
});
