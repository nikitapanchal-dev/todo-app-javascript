let inputBox = document.getElementById("input-box");
let addBtn = document.getElementById("add");
let listContainer = document.getElementById("listcontainer");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

function addTask() {
    let value = inputBox.value.trim();
    if (value === "") return;

    tasks.push({
        text: value,
        completed: false
    });

    saveTasks();
    renderTasks();
    inputBox.value = "";
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    listContainer.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="deleteBtn">❌</button>
        `;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        li.querySelector(".deleteBtn").addEventListener("click", (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        listContainer.appendChild(li);
    });
}

addBtn.addEventListener("click", addTask);

inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});
