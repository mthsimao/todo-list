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

const createTask = () => {
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
  const imgCheck = document.createElement("img");
  imgCheck.src = "images/check.svg";

  const btn2 = document.createElement("button");
  const imgDelete = document.createElement("img");
  imgDelete.src = "images/trash.svg";

  const description = document.createElement('div')
  description.classList.add('task-description')
  const descriptionParagraphy = document.createElement('p')

  descriptionParagraphy.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, dicta amet placeat possimus provident at fugit impedit ut harum debitis quia culpa animi laborum ab optio eaque dolor ipsa et.'

  description.appendChild(descriptionParagraphy)

  tasksContainer.appendChild(divTask);
  divTask.appendChild(divTaskHeader);
  divTask.appendChild(description)
  divTaskHeader.appendChild(taskTitle);
  divTaskHeader.appendChild(options)
  taskTitle.appendChild(title);
  
  options.appendChild(btn);
  options.appendChild(btn2);
  btn.appendChild(imgCheck);
  btn2.appendChild(imgDelete);
 
  
};

addtaskBtn.addEventListener("click", () => {
  console.log("oi");
  createTask();
});
