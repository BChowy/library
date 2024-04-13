// Library
const
    LIBRARY = document.querySelector('.library'),
    EMPTY_MESSAGE = document.querySelector('.empty'),
    ADD_BTN = document.querySelector('.add-btn');

// Dialog
const
    DIALOG = document.querySelector("dialog"),
    TITLE_FIELD = document.querySelector('#book-title'),
    AUTHOR_FIELD = document.querySelector('#book-author'),
    PAGES_FIELD = document.querySelector('#book-pages'),
    READ_CHECKBOX = document.querySelector('#is-read'),
    CONFIRM_BTN = document.querySelector('.confirm'),
    CANCEL_BTN = document.querySelector('.cancel');

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

ADD_BTN.addEventListener("click", () => {
    DIALOG.showModal();
});

CONFIRM_BTN.addEventListener("click", () => {
    const book = new Book(TITLE_FIELD.value, AUTHOR_FIELD.value, PAGES_FIELD.value, READ_CHECKBOX.checked)
    book.addToList();
});

