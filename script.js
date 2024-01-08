let library = [];

let book1 = new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 223, true);
let book2 = new Book("Harry Potter and the Chamber of Secrets", "J.K. RowlingRowlingRowlingRowlingRowlingRowling", 243, true);
let book3 = new Book("Harry Potter and the Prisoner of Azkaban", "J.K. Rowling", 273, true);
let book4 = new Book("Harry Potter and the Goblet of Fire", "J.K. Rowling", 223, true);
let book5 = new Book("Harry Potter and the Order of the Phoenix", "J.K. Rowling", 253, false);
let book6 = new Book("Harry Potter and the Half-Blood Prince", "J.K. Rowling", 313, false);
let book7 = new Book("Harry Potter and the Deathly Hallows", "J.K. Rowling", 343, false);

library.push(book1);
library.push(book2);
library.push(book3);
library.push(book4);
library.push(book5);
library.push(book6);
library.push(book7);

loadBooks();
addListenerNewBook();

function Book(title, author, numPages, isRead){
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
    this.info = ()=>{
      return `${this.title} by ${this.author}, ${numPages} pages, ${isRead ? "has been read" :"not read yet"}.`;
    }
}

function loadBooks(){
  let container = document.querySelector(".books-container");
  
  library.forEach((item, index)=>{
    container.appendChild(generateBookEl(item, index));
  });
}

function generateBookEl(item, index){
  const book = document.createElement("div");
    book.classList.add("book");

  const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");
  const buttonGrp = document.createElement("div");
    buttonGrp.classList.add("button-group");
    
  const title = document.createElement("span");
    title.classList.add("title");
    title.innerText = item.title;
  const author = document.createElement("span");
    author.classList.add("author");
    author.innerText = item.author;
  const numPages = document.createElement("span");
    numPages.classList.add("num-pages");
    numPages.innerText = item.numPages;

  bookInfo.appendChild(title);
  bookInfo.appendChild(author);
  bookInfo.appendChild(numPages);

  const toggleRead = document.createElement("button");
    if(item.isRead){
      toggleRead.classList.add("read");
      toggleRead.innerText = "Read";
    }
    else{
      toggleRead.classList.add("not-read");
      toggleRead.innerText = "Not Read";
    }
    toggleRead.setAttribute("data-index", index);
  const remove = document.createElement("button");
    remove.classList.add("remove");
    remove.innerText = "Remove";
    remove.setAttribute("data-index", index);
    
  buttonGrp.appendChild(toggleRead);
  buttonGrp.appendChild(remove);

  book.appendChild(bookInfo);
  book.appendChild(buttonGrp);

  return book;
}

function addListenerNewBook(){
  const addBtn = document.querySelector("#addBtn");
  const addBook = document.querySelector("#addBook");
  const cancel = document.querySelector("#cancelBook");
  const modal = document.querySelector(".addNewBook-modal");
  const dialogContainer = document.querySelector(".dialog-container");

  dialogContainer.addEventListener("click", ()=>{
    // dialog.classList.add("shake");

    // setTimeout(()=>{
    //   dialog.classList.remove("shake");
    // }, 500)

    modal.classList.remove("show-modal");
    dialogContainer.classList.add("hide-container");
  })

  addBtn.addEventListener("click", ()=>{
    modal.classList.add("show-modal");
    dialogContainer.classList.remove("hide-container");
  })

  addBook.addEventListener("click", ()=>{
    modal.classList.remove("show-modal");
    dialogContainer.classList.add("hide-container");
  });
}
