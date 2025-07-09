let button = document.getElementById("toggle-theme");
const html = document.querySelector("html");
let img = document.querySelector("#img");
let addtaskInput = document.querySelector("#add-task-input");
let addtaskBtn = document.querySelector("#add-task-btn");
let tasksContainer = document.querySelector(".tasks");

button.addEventListener("click", () => {
  html.classList.toggle("dark");

  if (html.classList.contains("dark")) {
    img.src = "../images/sun.svg";
  } else {
    img.src = "../images/moon.svg";
  }
});

const createtask = () => {
  const divTask = document.createElement("div");
  divTask.classList.add("task");

  const divTaskHeader = document.createElement("div");
  divTaskHeader.classList.add("task-header");

  const taskTitle = document.createElement("div");
  taskTitle.classList.add("task-title");

  let title = document.createElement("span");
  title.textContent = addtaskInput.value;

  const options = document.createElement("div");
  options.classList.add("task-options");

  const btn = document.createElement("button");
  const imgCheck = document.createElement('img')

  imgCheck.src = 'images/check.svg'

  taskTitle.appendChild(title);
  divTaskHeader.appendChild(taskTitle);
  divTask.appendChild(divTaskHeader);
  tasksContainer.appendChild(divTask)
};

addtaskBtn.addEventListener("click", () => {
  console.log("oi");
  createtask();
});
