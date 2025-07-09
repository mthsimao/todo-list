let button = document.getElementById("toggle-theme");
const html = document.querySelector("html");
let img = document.querySelector("#img");
let addNoteInput = document.querySelector("#add-note-input");
let addNoteBtn = document.querySelector("#add-note-btn");
let notesContainer = document.querySelector(".notes");

button.addEventListener("click", () => {
  html.classList.toggle("dark");

  if (html.classList.contains("dark")) {
    img.src = "../images/sun.svg";
  } else {
    img.src = "../images/moon.svg";
  }
});

const createNote = () => {
  const div = document.createElement("div");

  let title = addNoteInput.value;

  let boxTitle = document.createElement('div')
  boxTitle.innerHTML = `<input type="checkbox" id="checkInput"> <p>${title}</p>`

  div.append(boxTitle);

  notesContainer.appendChild(div);
};

addNoteBtn.addEventListener("click", () => {
  console.log("oi");
  createNote();
});
