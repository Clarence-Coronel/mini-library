let library = [];

let book1 = new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 223, true);
let book2 = new Book("Harry Potter and the Chamber of Secrets", "J.K. Rowling", 243, true);
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
    this.isActive = true;
    this.info = ()=>{
      return `${this.title} by ${this.author}, ${numPages} pages, ${isRead ? "has been read" :"not read yet"}.`;
    }
}

function loadBooks(){
  let container = document.querySelector(".books-container");
  
  library.forEach((item, index)=>{
    try {
      container.appendChild(generateBookEl(item, index));
    } catch (error) {
      
    }
  });
}

function generateBookEl(item, index){

  if(!item.isActive) return null;

  const book = document.createElement("div");
    book.classList.add("book");
    book.setAttribute("data-index", index);

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
    toggleRead.classList.add("toggle-read")
    if(item.isRead){
      toggleRead.classList.add("read");
      toggleRead.innerText = "Finished";
    }
    else{
      toggleRead.classList.add("not-read");
      toggleRead.innerText = "Not Read";
    }
    toggleRead.setAttribute("data-index", index);
    toggleRead.addEventListener("click", ()=>{
      toggleIsRead(index);
    });
  const remove = document.createElement("button");
    remove.classList.add("remove");
    remove.innerText = "Remove";
    remove.setAttribute("data-index", index);
    remove.addEventListener("click", ()=>{
      removeBook(index);
    });
    
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
  const form = document.querySelector(".addNewBook-modal form");

  dialogContainer.addEventListener("click", ()=>{
    // dialog.classList.add("shake");

    // setTimeout(()=>{
    //   dialog.classList.remove("shake");
    // }, 500)

    modal.classList.remove("show-modal");
    dialogContainer.classList.add("hide-container");
    document.querySelector(".error").classList.remove("show-error");
    form.reset();
  })

  addBtn.addEventListener("click", ()=>{
    modal.classList.add("show-modal");
    dialogContainer.classList.remove("hide-container");
  })

  form.onsubmit = ()=>{
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#numPages").value;
    let isRead = document.querySelector("#isRead").checked;

    let alreadyExist = false;

    library.forEach(book=>{
      if(book.title.toLowerCase() == title.toLowerCase() && book.isActive){
        document.querySelector(".error").classList.add("show-error");
        alreadyExist = true;
      }
    })

    if(alreadyExist) return;

    let tempBook = new Book(title, author, pages, isRead);

    library.push(tempBook);
    document.querySelector(".error").classList.remove("show-error");
    form.reset();

    document.querySelector(".books-container").appendChild(generateBookEl(tempBook,library.length-1));
    modal.classList.remove("show-modal");
    dialogContainer.classList.add("hide-container");
  }
}

function removeBook(index){
    library[index].isActive = false;
    document.querySelector(`.book[data-index="${index}"]`).remove();
}

function toggleIsRead(index){
  library[index].isRead = library[index].isRead ? false : true;

  if(library[index].isRead){
    let toggle = document.querySelector(`.book[data-index="${index}"] .toggle-read`);
    toggle.classList.remove("not-read");
    toggle.classList.add("read")
    toggle.innerText = "Finished";
  } 
  else if(!library[index].isRead){
    let toggle = document.querySelector(`.book[data-index="${index}"] .toggle-read`);
    toggle.classList.remove("read");
    toggle.classList.add("not-read");
    toggle.innerText = "Not Read";
  } 
}
