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
    return this.id;
  };

  // get and set book author
  set bkAuthor(author){
    this.author = author;
  };

  get bkAuthor(){
    return this.author;
  };

  // get and set book title
  set bkTitle(title){
    this.title = title;
  };

  get bkTitle(){
    return this.title;
  };

  // get and set book number of pages
  set bkNumberOfPages(numberOfPages){
    this.numberOfPages = numberOfPages;
  };

  get bkNumberOfPages(){
    return this.numberOfPages;
  };

  // get and set book status
  set bkStatus(status){
    this.status = status;
  };

  get bkStatus(){
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
    return this.completedPages;
  };
};


// declaring library class
function bookKeeper(){
  const storage = [];

  const addBook = (author, title, numberOfPages, status, completedPages) => {
    bookObj = new bookClass(author, title, numberOfPages, status, completedPages);
    storage.push(bookObj);
  };

  const rmBook = (id) => {
    // find index of book with id
    let bookIndex;
    for(let book of storage){
      if(book.bkId == id){
        console.log(book.bkId);
        console.log('ID match');
        bookIndex = storage.indexOf(book);
        storage.splice(bookIndex, 1);
      } else {
        console.log(book.bkId);
        console.log('No ID match');
      };
    };
  };

  const bringAllBooks = () => {
    return storage;
  };

  const spawnHarvardClassics = () => {
    return new Promise(resolve => {
    fetch('/prefilledbooks/books.json')
      .then(response => {
          if (!response.ok) {
              throw new Error("HTTP error " + response.status);
          }
          return response.json();
      })
      .then(json => {
          booksHarvard = json;
          console.log(`Loaded json: ${booksHarvard}`);
      
          for(let book of booksHarvard.harvard_classics){
            console.log(`Pushing ${book.title} to the storage`)
            addBook(book.author, book.title, book.numberOfPages, book.status, book.completedPages);
          };

          resolve('all books added')
      })
      .catch(function () {
          this.dataError = true;
      })
    });
  };
  
  return {addBook, rmBook, bringAllBooks, spawnHarvardClassics};
};

const testBook = new bookClass('F.M. Dostoevsky', 'Brothers Karamazov', '1254', 'NOT STARTED', '0');

// dom manipulation
function domController(){
  const main = document.querySelector('main');
  const addBookBtn = document.querySelector('.add-book');
  const delBookDialog = document.querySelector('.are-you-sure');
  const confirmDelBookBtn = document.querySelector('#yes-im-sure');
  const confirmAddBookBtn = document.querySelector('.confirm-add-book');
  const addBookDialog = document.querySelector('.add-book-dialog');
  const titleInput = document.querySelector('#title');
  const authorInput = document.querySelector('#author');
  const numberOfPagesInput = document.querySelector('#number-of-pages');
  const statusInput = document.querySelector('#status');
  const completedPagesInput = document.querySelector('#completed-pages');
  const fillWithBooksDialog = document.querySelector('.fill-with-books');
  const fillWithBooksYesBtn = document.querySelector('#yes-fill');
  const keeper = bookKeeper();
  let idToDelete;


  const loadBookRepo = () => {
    keeper.spawnHarvardClassics().then((resolve) => {console.log(`spawn fulfilled ${resolve}`); displayAllBooks()})
  };

  fillWithBooksYesBtn.addEventListener('click', loadBookRepo);
  fillWithBooksDialog.showModal();

  const displayAllBooks = () => {
    // remove all books from display
    console.log('Trying to display books');
    let everyPage = document.querySelectorAll('.page');

    for (let page of everyPage){
      page.remove();
    };

    // get all the books in the library
    books = keeper.bringAllBooks();

    // divide books into arrays corresponding to the pages
    chunkedBooks = divideArrayIntoChunks(books, 6);
    console.log(chunkedBooks);

    let pageButtonContainer = document.querySelector('.page-button-container');

    //create page button container
    if(!pageButtonContainer){
      pageButtonContainer = document.createElement('div');
      pageButtonContainer.classList.add('page-button-container');  
    } else {
      let everyPageButton = document.querySelectorAll('.page-button');
      for(let pageButton of everyPageButton){
        pageButton.remove();
      };
    };

    //display books in the library
    for(let chunk of chunkedBooks){
      const pageIndex = chunkedBooks.indexOf(chunk);
      const pageNumber = pageIndex + 1;
      const page = document.createElement('div');
      page.classList.add('page');
      page.classList.add(pageNumber);

      if(pageIndex !== 0){
        page.style.display = 'none';
      };

      for(let book of chunk){
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
        bookDeleteButton.addEventListener('click', delBookModalHandler);
        const bookDeleteIcon = document.createElement('img');
        bookDeleteIcon.classList.add('icon');
        bookDeleteIcon.src = 'assets/icons/trash-can-outline.svg';
        bookDeleteButton.appendChild(bookDeleteIcon);
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

        page.appendChild(container);
      };

      const pageButton = document.createElement('button');
      pageButton.classList.add('page-button');
      pageButton.textContent = pageNumber;
      pageButton.value = pageNumber;
      pageButton.addEventListener('click', openDesiredPage)

      main.appendChild(page);
      pageButtonContainer.appendChild(pageButton);
    };

    main.appendChild(pageButtonContainer);
  };

  const divideArrayIntoChunks = (array, n) => {
    const numberOfChunks = Math.ceil(array.length / n);

    return [...Array(numberOfChunks)]
    .map((value, index) => {
      return array.slice(index * n, (index + 1) * n);
    });
  };

  const openDesiredPage = (e) => {
    let desiredPage = e.target.value;
    const allPages = document.querySelectorAll('.page');
    for(let page of allPages){
      if(page.classList.contains(desiredPage)){
        page.style.display = 'block';
      } else {
        page.style.display = 'none';
      };
    };
  }; 

  const addBookModalHandler = () => {
    addBookDialog.showModal();
  };

  const addBook = () => {
    keeper.addBook(authorInput.value, titleInput.value, numberOfPagesInput.value, statusInput.value, completedPagesInput.value);
    displayAllBooks();
  };

  const delBookModalHandler = (e) => {
    idToDelete = e.currentTarget.parentElement.parentElement.id;
    console.log(`deleting id ${idToDelete}`);
    delBookDialog.showModal();
  };

  const delBook = () => {
    keeper.rmBook(idToDelete);
    displayAllBooks();
    idToDelete = undefined;
  };

  addBookBtn.addEventListener('click', addBookModalHandler);

  confirmAddBookBtn.addEventListener('click', addBook);
  confirmDelBookBtn.addEventListener('click', delBook);
};


domController();