// Factory Function
function Library() {
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

  // Methods
  const addBookToLibrary = (author, title, numPages, read) => {
    let book = new Book(author, title, numPages, read);
    myLibrary.push(book);
  };

  const displayBooks = () => {
    booksContainer.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
      let book = myLibrary[i];
      let bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
      bookCard.innerHTML = `
          <h3 class="title">${book.title}, <span class="author">${
        book.author
      }</span></h3>
          <p class="pages">${book.numPages} pages</p>
          <p class="read">${book.read ? "Read" : "Not Read"}</p>
          <div class="btns">
          <button class="readBtn" id="${i}">${
        book.read ? "Mark Unread" : "Mark Read"
      }</button>
          <button class="rmBtn" id=${i}>Remove Book</button></div>`;
      booksContainer.appendChild(bookCard);
    }
  };

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
    displayBooks();
    addRemoveBtnListeners();
    addReadBtnListeners();
  });

  // Event Listener Methods
  const addRemoveBtnListeners = () => {
    const handleClick = function (e) {
      myLibrary.splice(e.target.id, 1);
      displayBooks();
      addRemoveBtnListeners();
      addReadBtnListeners();
    };

    const removeBookBtns = document.querySelectorAll(".rmBtn");

    removeBookBtns.forEach((button) => {
      button.removeEventListener("click", handleClick);
      button.addEventListener("click", handleClick);
    });
  };

  const addReadBtnListeners = () => {
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
  };

  const getLibrary = () => myLibrary;

  return {
    addBookToLibrary,
    displayBooks,
    getLibrary,
    addRemoveBtnListeners,
    addReadBtnListeners,
  };
}

// Class Constructor
class Book {
  constructor(author, title, numPages, read) {
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.read = read;
  }

  switchRead(readStatus) {
    this.read = !readStatus;
  }
}

// Manual Implementation
const library = Library();
library.addBookToLibrary(
  "Helen Czerski",
  "Storm in a Teacup: The Physics of Everyday Life",
  288,
  false
);

library.addBookToLibrary(
  "J.K. Rowling",
  "Harry Potter and the Goblet of Fire",
  734,
  true
);

// Build Application

library.displayBooks();
library.addRemoveBtnListeners();
library.addReadBtnListeners();
