const express = require('express');
const fileUpload = require('express-fileupload');

const app = new express();
const port = process.env.PORT || 5000;

const indexNav = [
    {
        link : '/signin',name : 'SignIn'
    },
    {
        link : '/signup',name : 'SignUp'
    }
];
const homeNav = [
    {
        link :'/books', name :'Books'
    },
    {
        link :'/authors',name :'Authors'
    }, 
    {
        link :'/books/add',name :'Add Book'
    }, 
    {
        link :'/authors/add', name :'Add Author'
    } 
];
  
const signinRouter = require('./src/routes/signinRoutes')(indexNav);
const signupRouter = require('./src/routes/signupRoutes')(indexNav);
const booksRouter = require('./src/routes/bookRoutes')(homeNav);
const authorsRouter = require('./src/routes/authorRoutes')(homeNav);

app.use(fileUpload());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);

app.get ('/', function(req,res){
    res.render("index",
    {
        indexNav,
        title : 'Library'
    });
});

app.listen(port,()=>{console.log("Server Ready at" + port)} );