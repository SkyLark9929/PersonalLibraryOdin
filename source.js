const myLibrary = [];

function Book(author, title, numberOfPages, status) {
  this.author = author;
  this.title = title;
  this.numberOfPages = numberOfPages;
  this.status = status;
};

function addBookToLibrary(book, library) {
  library.push(book);
};

function displayBooks(library){
    for(let book of library){
        for(let property in book){
            console.log(property, ':', book[property]);
        };
    };
};

let book1 = new Book('Tolkien', 'LOTR', '457', 'unread');

addBookToLibrary(book1, myLibrary);
displayBooks(myLibrary);