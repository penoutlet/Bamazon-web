var morgan = require('morgan');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars')
var db = require('./models');
var express = require('express');
var app = express();
var port = 3000;
require('./controllers/routes.js')(app);


// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// morgan
app.use(morgan('dev'));

console.log('Bamazon ready to go. ')


db.sequelize.sync({ force: true }).then(function(){
  app.listen(port, ()=> {
    console.log('App listening on port ' + port);
  });
});
