// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  book.find( (err, books) => {
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

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) =>
 {  
    res.render('books/details', {
      title: 'Add Book',
      page: 'books',
      books: ''
     });  
   
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => 
{
  let newBook = new book
  ({
    "Author": req.body.author,    
    "Genre": req.body.genre,
    "Description": req.body.Description,
    "Price": req.body.price,
    "Title": req.body.title
  });
    
book.create(newBook, function(err, Book)
  {
    if (err) {
      return console.error(err);
      res.end(err);
    }else{
      res.redirect('/books');
    }
  });
  
});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) =>
 {
  let id = req.params.id;

  book.findById(id, {}, {}, function(err, updateBook) 
  {
    if (err){
      console.log(err);
      res.end(err);
    }
    else{
      res.render('books/details', {
        title: 'Edit Book',
        page: 'books',
        books: updateBook
       });  
    }
  }
  )
  
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id;
  
  //isntantiate a new book to edit
  let updateBook = new book
  ({
    "_id": id,    
    "Author": req.body.author,    
    "Genre": req.body.genre,
    "Price": req.body.price,
    "Title": req.body.title
  });

  //update book in database
  book.updateOne({_id: id}, updateBook, function(err: ErrorCallback){
    if (err) {
      return console.error(err);
    }
    //return to main page after successful update
    res.redirect('/books');
  }) 
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    book.remove({_id: id}, (err) => {
      if (err){
        console.log(err);
        res.end(err);
      }else{
        res.redirect('/books')
      }
    })    
});


//module.exports = router;
