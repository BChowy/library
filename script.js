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

function clearAndCloseDialog() {
    TITLE_FIELD.value = '';
    AUTHOR_FIELD.value = ''
    PAGES_FIELD.value = '';
    READ_CHECKBOX.checked = false;
    DIALOG.close();
}

ADD_BTN.addEventListener("click", () => {
    DIALOG.showModal();
});

CONFIRM_BTN.addEventListener("click", () => {
    const book = new Book(TITLE_FIELD.value, AUTHOR_FIELD.value, PAGES_FIELD.value, READ_CHECKBOX.checked)
    book.addToList();
    refreshLibrary();
    clearAndCloseDialog();
});

CANCEL_BTN.addEventListener("click", clearAndCloseDialog);


function createBook(book) {
    const
        BOOK_CARD = document.createElement('div'),
        BOOK_CARD_TEXT = document.createElement('div'),
        BOOK_TITLE = document.createElement('p'),
        BOOK_AUTHOR = document.createElement('p'),
        BOOK_PAGES = document.createElement('p');

    BOOK_CARD.classList.add('book');
    BOOK_CARD_TEXT.classList.add('text');

    BOOK_TITLE.textContent = book.title;
    BOOK_AUTHOR.textContent = book.author;
    BOOK_PAGES.textContent = book.pages;

    BOOK_CARD_TEXT.appendChild(BOOK_TITLE);
    BOOK_CARD_TEXT.appendChild(BOOK_AUTHOR);
    BOOK_CARD_TEXT.appendChild(BOOK_PAGES);


    const svgNS = 'http://www.w3.org/2000/svg';
    const
        btnsDiv = document.createElement('div'),
        readBtn = document.createElement('button'),
        deleteBtn = document.createElement('a'),
        deleteIcon = document.createElementNS(svgNS, 'svg'),
        deleteIconPath = document.createElementNS(svgNS, 'path');

    btnsDiv.classList.add('action');
    readBtn.textContent = 'READ';

    if (book.read) readBtn.classList.add('completed');

    readBtn.addEventListener('click', () => {
        readBtn.classList.toggle('completed');
    });

    deleteIcon.setAttribute('xmlns', svgNS);
    deleteIcon.setAttribute('viewBox', '0 0 24 24');
    deleteIconPath.setAttribute('d', 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z');

    deleteIcon.appendChild(deleteIconPath);
    deleteBtn.appendChild(deleteIcon);

    deleteBtn.addEventListener('click', () => {
        const bookToDeleteIndex = BOOK_LIST.findIndex(b => b === book); // Find the index of the book object
        if (bookToDeleteIndex > -1) {
            BOOK_LIST.splice(bookToDeleteIndex, 1); // Remove the book object from the list
            refreshLibrary(); // Update the displayed book list
        }
    });

    btnsDiv.appendChild(readBtn);
    btnsDiv.appendChild(deleteBtn);


    BOOK_CARD.appendChild(BOOK_CARD_TEXT);
    BOOK_CARD.appendChild(btnsDiv);

    return BOOK_CARD;
}

function refreshLibrary() {
    // Create new book card elements for each book
    const updatedBooks = BOOK_LIST.map(createBook);
    LIBRARY.replaceChildren(...updatedBooks);

}
