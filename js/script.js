let button = document.getElementById("toggle-theme");
const html = document.querySelector("html");
let img = document.querySelector("#img");
let addtaskInput = document.querySelector("#add-task-input");
let addtaskBtn = document.querySelector("#add-task");
let searchInput = document.querySelector("#searchInput");
let tasksContainer = document.querySelector(".tasks");
let filter = document.querySelector("#filter");
let imgEmpty = document.querySelector(".empty");

let popUp = document.querySelector("#popup");
let cancelBtn = document.querySelector("#cancel-popup");

// Functions

const cancelPopUP = () => popUp.classList.toggle("hidden");

const abrirPopUp = () => popUp.classList.toggle("hidden");

const filtrar = (filterValue) => {
  const todos = document.querySelectorAll(".task");

  switch (filterValue) {
    case "all":
      todos.forEach((todo) => todo.classList.remove("hide"));
      break;
    case "complete":
      todos.forEach((todo) => {
        todo.classList.contains("complete")
          ? todo.classList.remove("hide")
          : todo.classList.toggle("hide");
      });
      break;
    case "incomplete":
      todos.forEach((todo) => {
        !todo.classList.contains("complete")
          ? todo.classList.remove("hide")
          : todo.classList.toggle("hide");
      });
      break;
    default:
      break;
  }
};


const createTask = (span) => {
  imgEmpty.classList.add("hidden");

  const divTask = document.createElement("div");
  divTask.classList.add("task");
  tasksContainer.appendChild(divTask);

  const taskTitle = document.createElement("div");
  taskTitle.classList.add("task-title");
  divTask.appendChild(taskTitle);

  let title = document.createElement("span");
  title.textContent = span;
  taskTitle.appendChild(title);

  const options = document.createElement("div");
  options.classList.add("task-options");
  divTask.appendChild(options);

  const btn = document.createElement("button");
  const imgCheck = document.createElement("img");
  imgCheck.src = "images/check.svg";
  imgCheck.classList.add("finish");
  options.appendChild(btn);
  btn.appendChild(imgCheck);

  imgCheck.addEventListener("click", () => {
    divTask.classList.toggle("complete");
  });

  const btn3 = document.createElement("button");
  const imgEdit = document.createElement("img");
  imgEdit.src = "images/edit.svg";
  imgEdit.classList.add("edit");
  btn3.appendChild(imgEdit);
  options.appendChild(btn3);

  const btn2 = document.createElement("button");
  const imgDelete = document.createElement("img");
  imgDelete.src = "images/trash.svg";
  imgDelete.classList.add("remove");
  btn2.appendChild(imgDelete);
  options.appendChild(btn2);

  imgDelete.addEventListener("click", () => {
    divTask.remove();
  });

  addtaskInput.value = "";
};

// Events

cancelBtn.addEventListener("click", () => {
  cancelPopUP();
});

button.addEventListener("click", () => {
  html.classList.toggle("dark");

  if (html.classList.contains("dark")) {
    img.src = "../images/sun.svg";
  } else {
    img.src = "../images/moon.svg";
  }
});

filter.addEventListener("change", (e) => {
  let filterValue = e.target.value;
  filtrar(filterValue);
});

addtaskBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let inputValue = addtaskInput.value.trim();

  if (inputValue) {
    createTask(inputValue);
    addtaskInput.value = "";
    cancelPopUP();
  }
});

addtaskInput.addEventListener("keyup", (e) => {
  e.preventDefault();

  let inputValue = addtaskInput.value.trim();

  if (e.key === "Enter" && !addtaskInput.value == "") {
    createTask(inputValue);
    addtaskInput.value = "";
    cancelPopUP();
  }
});

searchInput.addEventListener("input", () => {
  let titles = document.querySelectorAll(".task");
  let searchTerm = searchInput.value.toLowerCase();

  titles.forEach((title) => {
    let name = title.textContent.toLowerCase();

    if (name.includes(searchTerm)) {
      title.classList.remove("hide");
    } else {
      title.classList.add("hide");
    }
  });
});
