const myLibrary = [];
let bookContainer, bookHeader, bookControlsContainer, bookEditButton, bookEditIcon,
bookDeleteButton, bookDeleteIcon, bookPageNumber, bookStatus, bookStatusSpan, bookProgress;

const MAIN = document.querySelector('main');

function Book(author, title, numberOfPages, status) {
  this.author = author;
  this.title = title;
  this.numberOfPages = numberOfPages;
  this.status = status;

  //DOM elements of the book
};

function addBookToLibrary(book, library) {
  library.push(book);
};

function displayBooks(library){
    for(let book of library){ // at which level is it possible to reuse the DOM elements?
      //book Container
      bookContainer = document.createElement('div');
      bookContainer.classList.add('book-container');

      //book Header
      bookHeader = document.createElement('h1');
      bookHeader.classList.add('title-author');
      bookHeader.textContent = `${book.title} by ${book.author}`;
      bookContainer.appendChild(bookHeader);

      //book Controls container and controls
      bookControlsContainer = document.createElement('div');
      bookControlsContainer.classList.add('controls-container');
      bookEditButton = document.createElement('button');
      bookEditButton.classList.add('edit');
      bookEditIcon = document.createElement('img');
      bookEditIcon.classList.add('icon');
      bookEditIcon.src = 'assets/icons/pencil-outline.svg';
      bookEditButton.appendChild(bookEditIcon);
      bookDeleteButton = document.createElement('button');
      bookDeleteButton.classList.add('delete');
      bookDeleteIcon = document.createElement('img');
      bookDeleteIcon.classList.add('icon');
      bookDeleteIcon.src = 'assets/icons/trash-can-outline.svg';
      bookDeleteButton.appendChild(bookDeleteIcon);
      bookControlsContainer.appendChild(bookEditButton); // is it necessary to repeat it like that or it can be done more elegantly?
      bookControlsContainer.appendChild(bookDeleteButton);
      bookContainer.appendChild(bookControlsContainer);

      // book Number of pages
      bookPageNumber = document.createElement('p');
      bookPageNumber.classList.add('number-pages');
      bookPageNumber.textContent = `PAGES #:${book.numberOfPages}`;
      bookContainer.appendChild(bookPageNumber);

      // book status
      bookStatus = document.createElement('p');
      bookStatus.classList.add('status');
      bookStatus.textContent = 'STATUS: ';
      bookStatusSpan = document.createElement('span');
      bookStatusSpan.classList.add(book['status'].toLowerCase());
      bookStatusSpan.textContent = book.status;
      bookStatus.appendChild(bookStatusSpan);
      bookContainer.appendChild(bookStatus);

      // book progress !incomplete
      bookProgress = document.createElement('p');
      bookProgress.classList.add('progress');
      bookProgress.textContent = 'PROGRESS: 100%';
      bookContainer.appendChild(bookProgress);

      // display that monstrosity
      MAIN.appendChild(bookContainer);
    };
};

let book1 = new Book('J.R. Tolkien', 'the Hobbit', '457', 'UNREAD');
let book2 = new Book('Homer', 'Odyssey', '1132', 'INPROGRESS');
let book3 = new Book('Jack London', 'Call of the Wild', '300', 'FINISHED');

addBookToLibrary(book1, myLibrary);
addBookToLibrary(book2, myLibrary);
addBookToLibrary(book3, myLibrary);

displayBooks(myLibrary);