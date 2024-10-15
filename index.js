const express = require('express');
const path = require('path')
const app = express();
const router = require('./routers/index')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require('./config/db')
const passport = require('./config/passport')
const express_session = require('express-session');

const PORT=4000;
const myPath=path.join(__dirname,'/views')

app.set('view engine','ejs');
app.set('views',myPath);


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser());

app.use(express_session({ secret: 'mySecret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(myPath));
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));
// app.use('/images', express.static(path.join(__dirname, 'views/images')));


app.use('/',router);

app.listen(PORT,(err)=>{
    if(!err) console.log(`server running ${PORT}`);
})