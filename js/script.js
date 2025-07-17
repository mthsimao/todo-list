let button = document.getElementById("toggle-theme");
const html = document.querySelector("html");
let img = document.querySelector("#img");
let addtaskInput = document.querySelector("#add-task-input");
let addtaskBtn = document.querySelector("#add-task");
let searchInput = document.querySelector("#searchInput");
let tasksContainer = document.querySelector(".tasks");
let filter = document.querySelector("#filter");
let imgEmpty = document.querySelector(".empty");

// Functions

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  html.classList.add("dark");
  img.src = "../images/sun.svg";
} else {
  html.classList.remove("dark");
  img.src = "../images/moon.svg";
}

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
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.id = "edit-btn";
  editInput.classList.add(
    "edit-input",
    "border",
    "border-purple",
    "rounded",
    "p-1.5",
    "w-full",
    "hidden"
  );
  taskTitle.appendChild(editInput);

  const options = document.createElement("div");
  options.classList.add("task-options");
  divTask.appendChild(options);

  // check button
  const btnCheck = document.createElement("button");
  const imgCheck = document.createElement("img");
  imgCheck.src = "images/check.svg";
  imgCheck.classList.add("finish");
  options.appendChild(btnCheck);
  btnCheck.appendChild(imgCheck);

  imgCheck.addEventListener("click", () => {
    divTask.classList.toggle("complete");
    updateTaskStatusLocalStorage(span);
    checkIfEmpty();
  });

  // edit button
  const btnEdit = document.createElement("button");
  const imgEdit = document.createElement("img");
  imgEdit.src = "images/edit.svg";
  imgEdit.classList.add("edit");
  btnEdit.appendChild(imgEdit);
  options.appendChild(btnEdit);

  imgEdit.addEventListener("click", () => {
    btnDelete.classList.toggle("hidden");
    btnCheck.classList.toggle("hidden");
    title.classList.add("hidden");
    editInput.classList.remove("hidden");
    editInput.value = title.textContent;
    editInput.focus();

    imgEdit.classList.add("hidden");

    // Criar botão de salvar
    const btnSave = document.createElement("button");
    const imgSave = document.createElement("img");
    imgSave.src = "images/save.svg"; // adicione esse ícone também
    imgSave.classList.add("save");
    btnSave.appendChild(imgSave);
    options.insertBefore(btnSave, btnDelete);

    imgSave.addEventListener("click", () => {
      const newValue = editInput.value.trim();
      if (newValue && newValue !== title.textContent) {
        updateTaskTextLocalStorage(span, newValue);
        span = newValue;
        title.textContent = newValue;
      }

      title.classList.remove("hidden");
      editInput.classList.add("hidden");
      imgEdit.classList.remove("hidden");
      btnDelete.classList.toggle("hidden");
      btnCheck.classList.toggle("hidden");
      btnSave.remove();
    });
  });

  // delete button
  const btnDelete = document.createElement("button");
  const imgDelete = document.createElement("img");
  imgDelete.src = "images/trash.svg";
  imgDelete.classList.add("remove");
  btnDelete.appendChild(imgDelete);
  options.appendChild(btnDelete);

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
  }
});

addtaskInput.addEventListener("keyup", (e) => {
  e.preventDefault();

  let inputValue = addtaskInput.value.trim();

  if (e.key === "Enter" && !addtaskInput.value == "") {
    createTask(inputValue);
    addtaskInput.value = "";
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

const updateTaskStatusLocalStorage = (taskText) => {
  const tasks = getTaskLocalStorage();

  tasks.map((task) =>
    task.span === taskText ? (task.done = !task.done) : null
  );

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// checando o local storage para ver se tem alguma tarefa
const checkIfEmpty = () => {
  const tasks = getTaskLocalStorage();

  if (tasks.length === 0) {
    imgEmpty.classList.remove("hidden");
  } else {
    imgEmpty.classList.add("hidden");
  }
};

// atualizar o nome da tarefa no local storage
const updateTaskTextLocalStorage = (oldText, newText) => {
  const tasks = getTaskLocalStorage();
  const updatedTasks = tasks.map((task) => {
    if (task.span === oldText) {
      return { ...task, span: newText };
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
};

loadTasks();
checkIfEmpty();
