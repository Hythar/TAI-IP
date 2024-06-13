const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const themeToggle = document.getElementById('theme-toggle');
const itemsLeft = document.getElementById('items-left');

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
    updateItemsLeft();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
    updateItemsLeft();
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
    listContainer.innerHTML = localStorage.getItem("data");
    updateItemsLeft();
}

function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.className = theme;
}

function toggleTheme() {
    const theme = document.body.className === 'light' ? 'dark' : 'light';
    document.body.className = theme;
    localStorage.setItem('theme', theme);
}

function updateItemsLeft() {
    const totalItems = listContainer.getElementsByTagName('li').length;
    const completedItems = listContainer.getElementsByClassName('checked').length;
    const activeItems = totalItems - completedItems;
    itemsLeft.textContent = `${activeItems} items left`;
}

function filterTasks(filter) {
    const tasks = listContainer.getElementsByTagName('li');
    for (let task of tasks) {
        switch (filter) {
            case 'all':
                task.style.display = 'list-item';
                break;
            case 'active':
                if (task.classList.contains('checked')) {
                    task.style.display = 'none';
                } else {
                    task.style.display = 'list-item';
                }
                break;
            case 'completed':
                if (task.classList.contains('checked')) {
                    task.style.display = 'list-item';
                } else {
                    task.style.display = 'none';
                }
                break;
        }
    }
}

function clearCompletedTasks() {
    const tasks = listContainer.getElementsByClassName('checked');
    while (tasks.length > 0) {
        tasks[0].parentNode.removeChild(tasks[0]);
    }
    saveData();
    updateItemsLeft();
}

themeToggle.addEventListener('click', toggleTheme);

showData();
loadTheme();
