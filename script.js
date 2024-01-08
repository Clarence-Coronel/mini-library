function Book(title, author, pageNum, isRead){
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.isRead = isRead;
    this.info = ()=>{
      return `${this.title} by ${this.author}, ${pageNum} pages, ${isRead ? "has been read" :"not read yet"}.`;
    }
}