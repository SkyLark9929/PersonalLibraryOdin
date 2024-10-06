const myLibrary = [];
const placeholderBook = new Book('F.M. Dostoevskiy', 'the Possessed', '2421', 'INPROGRESS', '243');

myLibrary.push(placeholderBook);

let bookContainer, bookHeader, bookControlsContainer, bookEditButton, bookEditIcon,
bookDeleteButton, bookDeleteIcon, bookPageNumber, bookStatusP, bookStatusSpan, bookProgress;
let everyBookContainer;

const ADD_BOOK_DIALOG = document.querySelector('.add-book-dialog');
const ADD_BOOK_BTN = document.querySelector('.add-book');
ADD_BOOK_BTN.addEventListener('click', displayAddBookDialog);
const CONFIRM_ADD_BOOK_BTN = document.querySelector('.confirm-add-book');
CONFIRM_ADD_BOOK_BTN.addEventListener('click', addBookToLibrary);
const MAIN = document.querySelector('main');

function Book(author, title, numberOfPages, status, completedPages) {
  this.author = author;
  this.title = title;
  this.numberOfPages = numberOfPages;
  this.status = status;
  this.completedPages = completedPages;

  this.progress = Math.round((completedPages / numberOfPages) * 100);
};

// Add book button and funcitons
/// necessary book characteristics
let book, author, title, bookStatus, numberOfPages, completedPages;

/// necessary elements
let bookTitleField = document.querySelector('#title');
let bookAuthorField = document.querySelector('#author');
let bookNumberOfPagesField = document.querySelector('#number-of-pages');
let bookStatusField = document.querySelector('#status');
let bookCompletedPagesField = document.querySelector('#completed-pages');

/// add book function itself
function addBookToLibrary() {
  author = bookAuthorField.value;
  title = bookTitleField.value;
  numberOfPages = bookNumberOfPagesField.value;
  bookStatus = bookStatusField.value;
  completedPages = bookCompletedPagesField.value;

  // add book to the library
  book = new Book(author, title, numberOfPages, bookStatus, completedPages);
  myLibrary.push(book);

  // add book to the page
  displayBooks(myLibrary);
};

function displayAddBookDialog(){
  ADD_BOOK_DIALOG.showModal();
};

// Display books functions
// FIXME: If I call this funciton every time I need to add book, I will have to purge and reload all the elements which is inefficient
// It would have been much better if I separated displayBook function and display all books in the library function
function displayBooks(library){
    everyBookContainer = document.querySelectorAll('.book-container');

    for (let container of everyBookContainer){
      container.remove();
    };

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
      bookControlsContainer.appendChild(bookEditButton); 
      bookControlsContainer.appendChild(bookDeleteButton);
      bookContainer.appendChild(bookControlsContainer);

      // book Number of pages
      bookPageNumber = document.createElement('p');
      bookPageNumber.classList.add('number-pages');
      bookPageNumber.textContent = `PAGES #:${book.numberOfPages}`;
      bookContainer.appendChild(bookPageNumber);

      // book status
      bookStatusP = document.createElement('p');
      bookStatusP.classList.add('status');
      bookStatusP.textContent = 'STATUS: ';
      bookStatusSpan = document.createElement('span');
      bookStatusSpan.classList.add(book['status'].toLowerCase());
      bookStatusSpan.textContent = book.status;
      bookStatusP.appendChild(bookStatusSpan);
      bookContainer.appendChild(bookStatusP);

      // book progress !incomplete
      bookProgress = document.createElement('p');
      bookProgress.classList.add('progress');
      bookProgress.textContent = `PROGRESS: ${book.progress}%`;
      bookContainer.appendChild(bookProgress);

      // display that monstrosity
      MAIN.appendChild(bookContainer);
    };
};

displayBooks(myLibrary);