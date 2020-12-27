const express = require('express');
const { db, findById } = require('../model/Bookdata');
const Authordata = require('../model/authorData');
const authorsRouter = express.Router();

function router(homeNav){
// var authors = [
//     {
//         name: 'Henry James',
//         genre: 'Novel',
//         img: "henry james.jpeg"
//     },
//     {
//         name: 'Ernest Hemingway',
//         genre: 'Fiction',
//         img: "ernest.jpeg"
//     },
//     {
//         name: 'Arundhati Roy',
//         genre: 'Fiction',
//         img: "arundhati roy.jpeg"
//     },
//     {
//         name: 'Arthur Canon Doyle',
//         genre: 'Detective',
//         img: "arthur.jpeg"
//     },
//     {
//         name: 'Harper Lee',
//         genre: 'Literature',
//         img: "harper lee.jpeg"
//     }
// ]
authorsRouter.get ('/', function(req,res){
    Authordata.find()
        .then(function(authors){
            const authorsData = authors.map(author => ({
                _id: author._id,
                name: author.name,
                genre: author.genre,
                image: `data:${author.image.mimetype};base64,${Buffer.from(author.image.data, 'binary').toString('base64')}`
            }))
            console.log('DATA ::', authors, authorsData);
            res.render("authors", {
                homeNav,
                title : 'Library',
                authors: authorsData
            });
        })       
});

authorsRouter.get('/add', function(req,res){
    res.render('addEditAuthor', {
        homeNav,
        operation: 'Add',
        title : 'Library',
        author: {}
    });  
});

authorsRouter.get('/edit/:id', function(req,res){ 
    const id = req.params.id;
    Authordata.findOne({_id: id})
        .then(function(author) {
            res.render('addEditAuthor', {
                homeNav,
                operation: 'Edit',
                title: 'Library',
                author
            }); 
        });
}); 

authorsRouter.get('/delete/:id', function(req,res){
    const id = req.params.id;
    Authordata.findByIdAndDelete(id, function(err, doc){
        if (!err) {
            res.redirect('/authors');
        }
    });
});
    
authorsRouter.post('/save',function(req,res){
    console.log(req.body);
    console.log(req.files);
    var item = {
        name: req.body.name,
        genre: req.body.genre,
        image: req.files.image
    };
    if (req.body._id) {
        const id = req.body._id;
        Authordata.findOneAndUpdate({_id: id}, item, function() {
            res.redirect('/authors');   
        });
    } else {
        const author = Authordata(item);
        author.save();
        res.redirect('/authors');
    }
});

authorsRouter.get('/:id', function(req,res){
    const id = req.params.id;
    Authordata.findOne({_id:id})
    .then(function(author){
        console.log("Author : ", author);
        const authorData = {
            _id: author._id,
            name: author.name,
            genre: author.genre,
            image: `data${author.image.mimetype};base64,${Buffer.from(author.image.data, 'binary').toString('base64')}`
        }
        res.render('author',{
            homeNav, 
            title : 'Library',
            author: authorData
        });
    })  
});

    return authorsRouter;
}
module.exports = router;
