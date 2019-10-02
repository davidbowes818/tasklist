// DEFINE UI VARS
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// LOAD EVENT LISTENERS

loadEventListeners();

function loadEventListeners() {
  // DOM LOAD EVENT
  document.addEventListener("DOMContentLoaded", getTasks);
  // SUBMIT FORM EVENT
  form.addEventListener("submit", addTask);
  // REMOVE TASK EVENT
  taskList.addEventListener("click", removeTask);
  // CLEAR TASKS EVENT
  clearBtn.addEventListener("click", clearTasks);
  // FILTER TASKS EVENT
  filter.addEventListener("keyup", filterTasks);
}

// GET TASKS FROM LS
function getTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    // CREATE LI ELEMENT
    const li = document.createElement("li");
    // ADD CLASS NAME
    li.className = "collection-item";
    // CREATE TEXT NODE
    li.appendChild(document.createTextNode(task));
    // CREATE LINK ELEMENT
    const link = document.createElement("a");
    // ADD CLASS NAME
    link.className = "delete-item secondary-content";
    // ICON HTML
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    // APPEND LINK TO LI
    li.appendChild(link);
    // APPEND LI TO UL
    taskList.appendChild(li);
  });
}

// ADD TASK
function addTask(e) {
  // CHECK FOR INPUT
  if (taskInput.value === "") {
    alert("Please add a task");
  } else {
    // CREATE LI ELEMENT
    const li = document.createElement("li");
    // ADD CLASS NAME
    li.className = "collection-item";
    // CREATE TEXT NODE
    li.appendChild(document.createTextNode(taskInput.value));
    // CREATE LINK ELEMENT
    const link = document.createElement("a");
    // ADD CLASS NAME
    link.className = "delete-item secondary-content";
    // ICON HTML
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    // APPEND LINK TO LI
    li.appendChild(link);
    // APPEND LI TO UL
    taskList.appendChild(li);
    // STORE IN LS
    storeTaskInLocalStorage(taskInput.value);
    // CLEAR INPUT
    taskInput.value = "";
  }

  e.preventDefault();
}

// STORE TASK
function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// REMOVE TASK

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // REMOVE FROM LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// REMOVE FROM LS
function removeTaskFromLocalStorage(taskItem) {
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// CLEAR TASKS

function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // CLEAR TASKS FROM LS
  clearTasksFromLocalStorage();
}

// CLEAR TASKS FROM LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// FILTER TASKS

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
