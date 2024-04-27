const myLibrary = [];

function Book(author, title, numPages, read) {
  (this.author = author),
    (this.title = title),
    (this.numPages = numPages),
    (this.read = read);
}

function addBookToLibrary(author, title, numPages, read) {
  // take a user's input and store the new book objects into an array
  let book = new Book(author, title, numPages, read);
  myLibrary.push(book);
}

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

console.log(myLibrary);

for (let i = 0; i < myLibrary.length; i++) {
  let book = myLibrary[i];
  let bookDiv = document.createElement("div");
  bookDiv.classList.add("book-card");
  bookDiv.innerHTML = `
    <h3 class="title">${book.title}</h3>
    <p class="author">${book.author}</p>
    <p class="pages">${book.numPages}</p>
    <p class="read">${book.read ? "Read" : "Not Read"}</p>`;
  document.querySelector(".books").appendChild(bookDiv);
}
