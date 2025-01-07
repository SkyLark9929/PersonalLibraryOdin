// declaration of book class
class bookClass{
  constructor(author, title, numberOfPages, status, completedPages){
    this.id = Date.now().toString(36) + Math.random().toString(36).substring(2); // generates unique ID for the book in the database
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.status = status;
    this.completedPages = completedPages;
    this.searchSignature = this.author + '' + this.title;
  }

  get bkId(){ // shall not be changed so no setter
    console.log(this.id);
    return this.id;
  };

  // get and set book author
  set bkAuthor(author){
    this.author = author;
  };

  get bkAuthor(){
    console.log(this.author);
    return this.author;
  };

  // get and set book title
  set bkTitle(title){
    this.title = title;
  };

  get bkTitle(){
    console.log(this.title);
    return this.title;
  };

  // get and set book number of pages
  set bkNumberOfPages(numberOfPages){
    this.numberOfPages = numberOfPages;
  };

  get bkNumberOfPages(){
    console.log(this.numberOfPages);
    return this.numberOfPages;
  };

  // get and set book status
  set bkStatus(status){
    this.status = status;
  };

  get bkStatus(){
    console.log(this.status);
    return this.status;
  };

  get bkProgress(){
    let progress;
    if(this.completedPages == 0){
      progress = 0;
    } else {
      progress = Math.round((this.completedPages / this.numberOfPages) * 100);
    };

    return progress;
  }

  // get and set completed pages
  set bkCompletedPages(completedPages){
    this.completedPages = completedPages;
  };

  get bkCompletedPages(){
    console.log(this.completedPages);
    return this.completedPages;
  };
};


// declaring library class
function bookKeeper(){
  const storage = [];

  const addBook = (author, title, numberOfPages, status, completedPages) => {
    bookObj = new bookClass(author, title, numberOfPages, status, completedPages);
    storage.push(bookObj);
    console.log(storage);
  };

  const rmBook =(id) => {
    // find index of book with id
    let bookIndex;
    for(let book of storage){
      if(book.bkId == id){
        bookIndex = storage.indexOf(book);
      };
    };

    // remove book
    storage.splice(bookIndex, 1);
  };

  const bringAllBooks = () => {
    console.log(storage);
    return storage;
  };
  
  return {addBook, rmBook, bringAllBooks};
};

const testBook = new bookClass('F.M. Dostoevsky', 'Brothers Karamazov', '1254', 'NOT STARTED', '0');

// dom manipulation
function domController(){
  const main = document.querySelector('main');
  const addBookBtn = document.querySelector('.add-book');
  const confirmAddBookBtn = document.querySelector('.confirm-add-book');
  const addBookDialog = document.querySelector('.add-book-dialog');
  const titleInput = document.querySelector('#title');
  const authorInput = document.querySelector('#author');
  const numberOfPagesInput = document.querySelector('#number-of-pages');
  const statusInput = document.querySelector('#status');
  const completedPagesInput = document.querySelector('#completed-pages');
  const keeper = bookKeeper();

  const displayAllBooks = () => {
    // remove all books from display
    let everyBookContainer = document.querySelectorAll('.book-container');
    for (let container of everyBookContainer){
      container.remove();
    };

    // get all the books in the library
    books = keeper.bringAllBooks();
    console.log('trying to display books:')
    console.log(books);

    //display books in the library
    for(let book of books){
      // create book container
      const container = document.createElement('div');
      container.id = book.bkId;
      container.classList.add('book-container');

      // create book header
      const bookHeader = document.createElement('h1');
      bookHeader.classList.add('title-author');
      bookHeader.textContent = `${book.bkTitle} by ${book.bkAuthor}`;
      container.appendChild(bookHeader);

      // create book controls container and controls
      const bookControlsContainer = document.createElement('div');
      bookControlsContainer.classList.add('controls-container');
      const bookDeleteButton = document.createElement('button');
      bookDeleteButton.classList.add('delete');
      const bookDeleteIcon = document.createElement('img');
      bookDeleteIcon.classList.add('icon');
      bookDeleteIcon.src = 'assets/icons/trash-can-outline.svg';
      bookDeleteButton.appendChild(bookDeleteIcon);
      // bookDeleteButton.addEventListener('click', (e) => deleteBook(e));
      // bookControlsContainer.appendChild(bookEditButton); 
      bookControlsContainer.appendChild(bookDeleteButton);
      container.appendChild(bookControlsContainer);

      // book Number of pages
      const bookPageNumber = document.createElement('p');
      bookPageNumber.classList.add('number-pages');
      bookPageNumber.textContent = `PAGES #:${book.bkNumberOfPages}`;
      container.appendChild(bookPageNumber);

      // book status
      const bookStatusP = document.createElement('p');
      bookStatusP.classList.add('status');
      bookStatusP.textContent = 'STATUS: ';
      const bookStatusSpan = document.createElement('span');
      bookStatusSpan.classList.add(book.bkStatus.toLowerCase());
      bookStatusSpan.textContent = book.bkStatus;
      bookStatusP.appendChild(bookStatusSpan);
      container.appendChild(bookStatusP);

      // book progress
      const bookProgress = document.createElement('p');
      bookProgress.classList.add('progress');
      bookProgress.textContent = `PROGRESS: ${book.bkProgress}%`; // TODO: replace NaN with '-' if NaN
      container.appendChild(bookProgress);

      main.appendChild(container);
    };
  };

  const modalHandler = () => {
    addBookDialog.showModal();
  };

  const addBook = () => {
    keeper.addBook(authorInput.value, titleInput.value, numberOfPagesInput.value, statusInput.value, completedPagesInput.value);
    displayAllBooks();
  };

  addBookBtn.addEventListener('click', modalHandler);
  confirmAddBookBtn.addEventListener('click', addBook);
}


domController()