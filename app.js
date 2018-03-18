var express = require('express');
var bodyParser = require('body-parser');
var cookieParser  = require('cookie-parser');

var session = require('express-session');

var app = express()
var port= 5000;

var nav =   [
    {Link: '/Books', Text: 'Book'},
    {Link:'/Authors', Text: 'Author'}
];
var bookRouther = require('./src/routes/bookRoutes')(nav);
var adminRouther = require('./src/routes/adminRoutes')(nav);
var authRouther = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));


require('./src/config/passport')(app);
app.set('views', 'src/views');
//app.set('view engine', 'jade');

//var hb = require('express-handlebars');
//app.engine('.hbs',hb({extname:'.hbs'}));
//app.set('view engine', '.hbs');


app.set('view engine', 'ejs');

app.use('/Books', bookRouther);
app.use('/Admin', adminRouther);
app.use('/Auth', authRouther);

app.get('/',function (req,res) {
    res.render('index',
        {title: "hello" ,
            nav: [
                {Link: '/Books', Text: 'Books'},
                {Link:'/Authors', Text: 'Authors'}
                ]});
});

app.get('/books',function (req,res) {
    res.send("Hello books");
});
app.listen(port, function (err) {
    console.log("Starting server");

});