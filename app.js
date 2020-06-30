var express = require('express');
var app = express();
require('dotenv').config();
var path = require('path');
//const { ENGINE_METHOD_ALL } = require('constants');
require('ejs');
var apiRouter = require('./routes/Router');
const mongoose = require('mongoose');

var pw = process.env.PASSWORD
var url = `mongodb+srv://root:${pw}@cluster0.mdxaz.mongodb.net/mydb_daejeon?retryWrites=true&w=majority`
mongoose.connect(url,{useNewUrlParser: true , useUnifiedTopology: true})


app.set('views', path.resolve(__dirname +'/views'));   //셋팅
app.set('view engine' , 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));   //미들웨어
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use('/', apiRouter);
const port = process.env.PORT || 3000


app.listen(port, function() {   //서버실행
    console.log(`Server is Starting at http://localhost:${port}`)


});
