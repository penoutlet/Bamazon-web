var morgan = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars')
var db = require('./models');
var express = require('express');
var app = express();
var port = 3000;
// boilerplate setup for dependencies.
// // Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static(process.cwd() + "/public"));
// var morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: true}));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// morgan
app.use(morgan('dev'));

console.log('Bamazon ready to go. ')

app.get('/', (req,res)=> {
  db.products.findAll({})
    .then((response)=>{
      res.render('index')
    });
});
// db.sequelize.sync({}).
app.listen(port, ()=> {
  console.log('App listening on port ' + port);
});
