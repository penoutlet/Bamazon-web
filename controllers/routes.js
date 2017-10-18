var db = require('../models');
var express = require('express');
var app = express.Router();
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');


module.exports = (app)=> {

// boilerplate bodyParser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: true
  }));
// Main views

// index
app.get('/', (req,res)=>{
  db.products.findAll({})
    .then((product)=>{
      res.render('index', {product});
    });
});

// manager sign in
app.get('/managersignin',(req,res)=>{
  res.render('managersignin');
});

// display products in manager's view
app.get('/manager', (req,res)=>{
  db.products.findAll({})
    .then((product)=>{
      res.render('manager', {product});
    });
});

// route to products in plain json
app.get('/products', (req,res)=>{
  db.products
  .findAll({})
  .then((data)=>{
      res.json(data);
  });
});
// route to add products
app.post('/products', (req,res)=>{
  console.log("req.body" + req.body);

  db.products
    .create({product_name: req.body.product_name, department:req.body.department, price: req.body.price,
    stock_quantity: req.body.stock_quantity})
    .then((response)=>{
      console.log(req.body +'product successfully added.');
      res.redirect('/manager')
    });
});

// delete
app.delete('/products:id', (req,res)=>{
  console.log(req.params.id)
  db.products
    .findAll({where:{id:req.params.id}})
    .then((response)=>{
    db.products.destroy({where: {id: req.params.id}})
    .then((response)=>{
      console.log(response);
      res.redirect('/manager');
    });
});
});

//update
app.put('products/:id', (req,res)=>{
  db.products
    .update(req.body,
      {
      where: {
        id: req.params.id
      }
    })
    .then((response)=>{
      console.log(req.params.id + 'succesfully updated')
    });
});

//create new manager
app.post('/users', (req,res)=> {
  var saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err,salt)=> {
      bcrypt.hash(req.body.password, salt, (err,hash)=> {
        db.User
          .create({email:req.body.email, password:hash})
          .then((response)=>{
            console.log('User Added.');
            res.redirect('/manager');
        });
      });
    });
});


};
