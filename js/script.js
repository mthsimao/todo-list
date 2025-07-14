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

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  html.classList.add("dark");
  img.src = "../images/sun.svg";
} else {
  html.classList.remove("dark");
  img.src = "../images/moon.svg";
}

const cancelPopUP = () => popUp.classList.toggle("hidden");

const abrirPopUp = () => popUp.classList.toggle("hidden");

const filtrar = (filterValue) => {
  const tasks = document.querySelectorAll(".task");

  switch (filterValue) {
    case "all":
      tasks.forEach((task) => task.classList.remove("hide"));
      break;
    case "complete":
      tasks.forEach((task) => {
        task.classList.contains("complete")
          ? task.classList.remove("hide")
          : task.classList.toggle("hide");
      });
      break;
    case "incomplete":
      tasks.forEach((task) => {
        !task.classList.contains("complete")
          ? task.classList.remove("hide")
          : task.classList.toggle("hide");
      });
      break;
    default:
      break;
  }
};

const createTask = (span, done = 0, save = 1) => {
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
    updateTaskStatusLocalStorage(span);
    checkIfEmpty();
  });

  const btn2 = document.createElement("button");
  const imgDelete = document.createElement("img");
  imgDelete.src = "images/trash.svg";
  imgDelete.classList.add("remove");
  btn2.appendChild(imgDelete);
  options.appendChild(btn2);

  imgDelete.addEventListener("click", () => {
    divTask.remove();
    removeTaskLocalStorage(span);
    checkIfEmpty();
  });

  // utilizando dados da local storage

  if (done) {
    divTask.classList.toggle("complete");
  }

  if (save) {
    saveTaskLocalStorage({ span, done });
  }

  addtaskInput.value = "";
  checkIfEmpty();
};

// Events

cancelBtn.addEventListener("click", () => {
  cancelPopUP();
});

button.addEventListener("click", () => {
  html.classList.toggle("dark");

  if (html.classList.contains("dark")) {
    img.src = "../images/sun.svg";
    localStorage.setItem("theme", "dark");
  } else {
    img.src = "../images/moon.svg";
    localStorage.setItem("theme", "light");
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

// local storage

const getTaskLocalStorage = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  return tasks;
};

const loadTasks = () => {
  const tasks = getTaskLocalStorage();

  tasks.forEach((task) => {
    createTask(task.span, task.done, 0);
  });
};

const saveTaskLocalStorage = (task) => {
  const tasks = getTaskLocalStorage();

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const removeTaskLocalStorage = (taskText) => {
  const tasks = getTaskLocalStorage();

  const filteredTasks = tasks.filter((task) => task.span !== taskText);

  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
};

const taskStatusLocalStorage = (taskText) => {
  const tasks = getTaskLocalStorage();

  tasks.map((task) =>
    task.span === taskText ? (task.done = !task.done) : null
  );

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const checkIfEmpty = () => {
  const tasks = getTaskLocalStorage();

  if (tasks.length === 0) {
    imgEmpty.classList.remove("hidden");
  } else {
    imgEmpty.classList.add("hidden");
  }
};

loadTasks();
checkIfEmpty();
