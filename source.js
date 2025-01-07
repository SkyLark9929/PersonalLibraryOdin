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
  const addBookBtn = document.querySelector('.add-book');
  const confirmAddBookBtn = document.querySelector('.confirm-add-book');
  const addBookDialog = document.querySelector('.add-book-dialog');
  const titleInput = document.querySelector('#title');
  const authorInput = document.querySelector('#author');
  const numberOfPagesInput = document.querySelector('#number-of-pages');
  const statusInput = document.querySelector('#status');
  const completedPagesInput = document.querySelector('#completed-pages');
  const keeper = bookKeeper();


  const modalHandler = () => {
    addBookDialog.showModal();
  };

  const addBook = () => {
    keeper.addBook(authorInput.value, titleInput.value, numberOfPagesInput.value, statusInput.value, completedPagesInput.value);
  };

  addBookBtn.addEventListener('click', modalHandler);
  confirmAddBookBtn.addEventListener('click', addBook);
}


domController()