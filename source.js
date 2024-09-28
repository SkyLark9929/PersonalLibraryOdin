const myLibrary = [];

function Book(author, title, numberOfPages, status) {
  this.author = author;
  this.title = title;
  this.numberOfPages = numberOfPages;
  this.status = status;

  //DOM elements of the book
  this.bookContainer = document.createElement('div', {class: 'book-container'});
};

function addBookToLibrary(book, library) {
  library.push(book);
};

function displayBooks(library){
    for(let book of library){
      
    };
};

let book1 = new Book('Tolkien', 'the Hobbit', '457', 'unread');

addBookToLibrary(book1, myLibrary);
displayBooks(myLibrary);