const express = require('express');
const { db, findById } = require('../model/Bookdata');
const Bookdata = require('../model/Bookdata');
const booksRouter = express.Router();

function router(homeNav){
    // var books = [
    //     {
    //         title: 'Many Lives, Many Masters',
    //         author: 'Dr Brian Weiss',
    //         genre: 'Biography',
    //         img: "many lives.jpeg"
    //     },
    //     {
    //         title: 'The Laws of the Spirit World',
    //         author: 'Khorshed Bhavnagri',
    //         genre: 'Spirituality',
    //         img: "spirit world.jpeg"
    //     },
    //     {
    //         title: 'Pride and Prejudice',
    //         author: 'Jane Austen',
    //         genre: 'Romantic',
    //         img: "pride and prejudice.jpeg"
    //     },
    //     {
    //         title: 'The Diary of a Young Girl',
    //         author: 'Anne Frank',
    //         genre: 'Autobiography',
    //         img: "young girl.jpeg"
    //     },
    //     {
    //         title: 'Charlie and the Chocolate Factory',
    //         author: 'Roald Dahl',
    //         genre: 'Fantasy Fiction',
    //         img: "charlie.jpeg"  
    //     }
    // ]
  
    booksRouter.get('/', function(req,res){
        Bookdata.find()
            .then(function(books){
                const booksData = books.map(book => ({
                    _id: book._id,
                    title: book.title,
                    author: book.author,
                    genre: book.genre,
                    image: `data:${book.image.mimetype};base64,${Buffer.from(book.image.data, 'binary').toString('base64')}`
                }))
                res.render("books", {
                    homeNav,
                    title : 'Library',
                    books:booksData
                });
            })        
    });

    booksRouter.get('/add', function(req,res){ 
        res.render('addEditBook', {
            homeNav,
            operation: 'Add',
            title : 'Library',
            book: {}
        }); 
    }); 

    booksRouter.get('/edit/:id', function(req,res){ 
        const id = req.params.id;
        Bookdata.findOne({_id: id})
            .then(function(book) {
                res.render('addEditBook', {
                    homeNav,
                    operation: 'Edit',
                    title: 'Library',
                    book
                }); 
            });
    }); 

    booksRouter.get('/delete/:id', function(req,res){
        const id = req.params.id;
        Bookdata.findByIdAndDelete(id, function(err, doc){
            if (!err) {
                res.redirect('/books');
            }
        });
    });
        
    booksRouter.post('/save',function(req,res){
        console.log('REQUEST :::::::::::: ', req.body);
        const item = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            image: req.files.image
        };
        if (req.body._id) {
            const id = req.body._id;
            Bookdata.findOneAndUpdate({_id: id}, item, function() {
                res.redirect('/books');   
            });
        } else {
            const book = Bookdata(item);
            book.save();
            res.redirect('/books');   
        }
    }); 
        
    booksRouter.get('/:id', function(req,res){
        const id = req.params.id;
        Bookdata.findOne({_id: id})
        .then(function(book) {
            const bookData = {
                _id: book._id,
                title: book.title,
                author: book.author,
                genre: book.genre,
                image: `data:${book.image.mimetype};base64,${Buffer.from(book.image.data, 'binary').toString('base64')}`
            };
            res.render('book', {
                homeNav, 
                title : 'Library',
                book: bookData
            });
        })        
    });
    
    return booksRouter;
}
module.exports = router;