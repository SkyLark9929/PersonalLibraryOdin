// declaration of book class
class bookClass{
  constructor(author, title, numberOfPages, status, completedPages){
    this.id = Date.now.toString(36) + Math.random.toString(36).substring(2); // generates unique ID for the book in the database
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.status = status;
    this.completedPages = completedPages;
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
class libraryClass{
  constructor(){
    this.storage = [];
  };

  get lbStorage(){
    return this.storage;
  };

  addBook(book){
    this.storage.push(book);
  };

  rmBook(id){
    // find index of book with id
    let bookIndex;
    for(let book of this.storage){
      if(book.bkId == id){
        bookIndex = this.storage.indexOf(book);
      };
    };

    // remove book
    this.storage.splice(bookIndex, 1);
  };
};

const library = new libraryClass();
const testBook = new bookClass('F.M. Dostoevsky', 'Brothers Karamazov', '1254', 'NOT STARTED', '0');

library.addBook(testBook);
console.log(library.lbStorage);

library.rmBook(testBook.bkId);
console.log(library.lbStorage);