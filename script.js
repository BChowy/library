const BOOK_LIST = [];

function Book(title, author, pages, read) {
    // the constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.addToList = function () {
    BOOK_LIST.push(this);
};

