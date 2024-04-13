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

// const BOOK_LIST = [];
const BOOK_LIST = [
    { title: 'The Fellowship of the Ring', author: 'J. R. R. Tolkien', pages: '482', read: true },
    { title: 'The Two Towers', author: 'J. R. R. Tolkien', pages: '352', read: false },
    { title: 'The Return of the King', author: 'J. R. R. Tolkien', pages: '492', read: false }
];


function Book(title, author, pages, read) {
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

// TODO: Check fields are not empty "REQUIRED"

function createBookText(book) {
    const
        BOOK_CARD_TEXT = document.createElement('div'),
        BOOK_TITLE = document.createElement('p'),
        BOOK_AUTHOR = document.createElement('p'),
        BOOK_PAGES = document.createElement('p');

    const { title, author, pages } = book;

    BOOK_CARD_TEXT.classList.add('text');

    BOOK_TITLE.textContent = title;
    BOOK_AUTHOR.textContent = author;
    BOOK_PAGES.textContent = pages;

    BOOK_CARD_TEXT.appendChild(BOOK_TITLE);
    BOOK_CARD_TEXT.appendChild(BOOK_AUTHOR);
    BOOK_CARD_TEXT.appendChild(BOOK_PAGES);

    return BOOK_CARD_TEXT;
}

function createBookActions(book) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const
        btnsDiv = document.createElement('div'),
        readBtn = document.createElement('button'),
        deleteBtn = document.createElement('a'),
        deleteIcon = document.createElementNS(svgNS, 'svg'),
        deleteIconPath = document.createElementNS(svgNS, 'path');

    const { read } = book;

    btnsDiv.classList.add('action');
    readBtn.textContent = 'READ';

    if (read) readBtn.classList.add('completed');

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
            refreshLibrary();
        }
    });

    btnsDiv.appendChild(readBtn);
    btnsDiv.appendChild(deleteBtn);

    return btnsDiv;
}

function createBook(book) {
    const BOOK_CARD = document.createElement('div');
    BOOK_CARD.classList.add('book');

    BOOK_CARD.appendChild(createBookText(book));
    BOOK_CARD.appendChild(createBookActions(book));

    return BOOK_CARD;
}

function refreshLibrary() {
    const updatedBooks = BOOK_LIST.map(createBook);  // Create new book card elements for each book
    LIBRARY.replaceChildren(...updatedBooks);

    if (!LIBRARY.hasChildNodes()) LIBRARY.appendChild(emptyLibraryMessage());
}

function emptyLibraryMessage() {
    const
        MESSAGE_DIV = document.createElement('div'),
        MESSAGE_TITLE = document.createElement('h1'),
        MESSAGE_BODY = document.createElement('h3');

    MESSAGE_DIV.classList.add('empty');
    MESSAGE_TITLE.textContent = 'Your library is empty!';
    MESSAGE_BODY.textContent = 'Start adding books to your library by clicking the "Add Book" button.';

    MESSAGE_DIV.appendChild(MESSAGE_TITLE);
    MESSAGE_DIV.appendChild(MESSAGE_BODY);

    return MESSAGE_DIV;
}

refreshLibrary();