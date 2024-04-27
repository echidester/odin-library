// Variables
const myLibrary = [];

// DOM Elements
const newBookBtn = document.querySelector(".newBookBtn");
const newBookWindow = document.querySelector(".newBookWindow");
const closeWindowBtn = document.querySelector(".closeWindow");
const submitBtn = document.querySelector(".submitBtn");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const numPages = document.querySelector("#numPages");
const read = document.querySelector("#read");
const booksContainer = document.querySelector(".books");

// Event Listeners
newBookBtn.addEventListener("click", function () {
  newBookWindow.showModal();
});

closeWindowBtn.addEventListener("click", function () {
  newBookWindow.close();
  author.value = "";
  title.value = "";
  numPages.value = null;
  read.checked = false;
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  addBookToLibrary(author.value, title.value, numPages.value, read.checked);
  author.value = "";
  title.value = "";
  numPages.value = null;
  read.checked = false;
  newBookWindow.close();
  displayBooks(myLibrary);
  addRemoveBtnListeners();
  addReadBtnListeners();
});

// Constructors
function Book(author, title, numPages, read) {
  (this.author = author),
    (this.title = title),
    (this.numPages = numPages),
    (this.read = read);
}

Book.prototype.switchRead = function (readStatus) {
  this.read = !readStatus;
};

// Functions
function addBookToLibrary(author, title, numPages, read) {
  let book = new Book(author, title, numPages, read);
  myLibrary.push(book);
}

function displayBooks(library) {
  document.querySelector(".books").innerHTML = "";
  for (let i = 0; i < library.length; i++) {
    let book = library[i];
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
          <h3 class="title">${book.title}</h3>
          <p class="author">${book.author}</p>
          <p class="pages">${book.numPages}</p>
          <p class="read">${book.read ? "Read" : "Not Read"}</p>
          <button class="readBtn" id="${i}">${
      book.read ? "Mark Unread" : "Mark Read"
    }</button>
          <button class="rmBtn" id=${i}>Remove Book</button>`;
    booksContainer.appendChild(bookCard);
  }
}

function addRemoveBtnListeners() {
  const handleClick = function (e) {
    console.log(e.target.id);
    myLibrary.splice(e.target.id, 1);
    displayBooks(myLibrary);
    addRemoveBtnListeners();
    addReadBtnListeners();
  };
  const removeBookBtns = document.querySelectorAll(".rmBtn");

  removeBookBtns.forEach((button) => {
    button.removeEventListener("click", handleClick);
    button.addEventListener("click", handleClick);
  });
}

function addReadBtnListeners() {
  const handleClick = function (e) {
    const index = e.target.id;
    myLibrary[index].switchRead(myLibrary[index].read);
    displayBooks(myLibrary);
    addRemoveBtnListeners();
    addReadBtnListeners();
  };
  const readBookBtns = document.querySelectorAll(".readBtn");

  readBookBtns.forEach((button) => {
    button.removeEventListener("click", handleClick);
    button.addEventListener("click", handleClick);
  });
}

// Manual Implementation
addBookToLibrary(
  "Helen Czerski",
  "Storm in a Teacup: The Physics of Everyday Life",
  288,
  false
);

addBookToLibrary(
  "J.K. Rowling",
  "Harry Potter and the Goblet of Fire",
  734,
  true
);

// Build Application

displayBooks(myLibrary);
addRemoveBtnListeners();
addReadBtnListeners();
