let inputBox = document.getElementById("input-box")
let addBtn = document.getElementById("add")
let listContainer = document.getElementById("listcontainer")

let tasks = []
let storedTasks = localStorage.getItem("tasks")

if (storedTasks) {
    tasks = JSON.parse(storedTasks)
    renderTasks()
}

function addTask() {
    let value = inputBox.value.trim()

    if (value === "") return

    tasks.push({
        text: value,
        completed: false
    })  

    saveTasks()
    renderTasks()

    inputBox.value = ""
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function renderTasks() {
    listContainer.innerHTML = ""

    tasks.forEach(function(task, index) {
        let li = document.createElement("li")

        let span = document.createElement("span")
        span.innerText = task.text

        if (task.completed) {
            li.classList.add("completed")
        }

        let dltBtn = document.createElement("button")
        dltBtn.innerText = "❌"
        dltBtn.classList.add("deleteBtn")

        dltBtn.addEventListener("click", function(e) {
            e.stopPropagation()
            tasks.splice(index, 1)
            saveTasks()
            renderTasks()
        })

            li.addEventListener("click", function() {
            tasks[index].completed = !tasks[index].completed
            saveTasks()
            renderTasks()
        })

        li.appendChild(span)
        li.appendChild(dltBtn)

        listContainer.appendChild(li)
    })
}

addBtn.addEventListener("click", addTask)

inputBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addTask()
    }
})
