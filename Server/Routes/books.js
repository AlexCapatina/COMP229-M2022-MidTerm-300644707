"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const books_1 = __importDefault(require("../Models/books"));
router.get('/', (req, res, next) => {
    books_1.default.find((err, books) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('books/index', {
                title: 'Books',
                page: 'books',
                books: books
            });
        }
    });
});
router.get('/add', (req, res, next) => {
    res.render('books/details', {
        title: 'Add Book',
        page: 'books',
        books: ''
    });
});
router.post('/add', (req, res, next) => {
    let newBook = new books_1.default({
        "Author": req.body.author,
        "Genre": req.body.genre,
        "Description": req.body.Description,
        "Price": req.body.price,
        "Title": req.body.title
    });
    books_1.default.create(newBook, function (err, Book) {
        if (err) {
            return console.error(err);
            res.end(err);
        }
        else {
            res.redirect('/books');
        }
    });
});
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    books_1.default.findById(id, {}, {}, function (err, updateBook) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('books/details', {
                title: 'Edit Book',
                page: 'books',
                books: updateBook
            });
        }
    });
});
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    let updateBook = new books_1.default({
        "_id": id,
        "Author": req.body.author,
        "Genre": req.body.genre,
        "Price": req.body.price,
        "Title": req.body.title
    });
    books_1.default.updateOne({ _id: id }, updateBook, function (err) {
        if (err) {
            return console.error(err);
        }
        res.redirect('/books');
    });
});
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    books_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/books');
        }
    });
});
//# sourceMappingURL=books.js.map