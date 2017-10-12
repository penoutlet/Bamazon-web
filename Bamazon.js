var mysql = require("mysql");
var inquirer = require("inquirer");

var catalog = "";

var Product_ID = 0;
var Quantity = "";
var price = 0;


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "Bamazon_db"
});

connection.connect(function(err){
	if (err) throw err;
	console.log("connected as id" + connection.threadId + "\n");

});


// initial Questions function to ask users if they want to purchse or add an item.

function initialQuestions(){

inquirer.prompt([
{
name: "initial",
message: "Would you like to (1) make a purchase? or (2) add a product  Press 1 or 2."
}
  ]).then(function(answers){
    console.log(answers.initial);
    if (answers.initial ==="1"){
      productDisplay();
    }
    else {
      addtoDB();
    }
  });

};

// couldn't quite get this to work. 
function addtoDB(){

inquirer.prompt([

{
name:"newName",
message:"What is the name of the product?"
},
{
name:"newStock",
message: "How many are available?"
},
{
name: "newPrice",
message: "What is the price?"
},
{
name: "newDepartment",
message: "To which department does the product belong?"
}


  ]).then(function(answers){
   
// [ answers.newName, answers.newStock,answers.newPrice, answers.newDepartment]  
connection.query("INSERT INTO products (product_name, department_name, price, stock) VALUES" + "(" + "'" + answers.newName + "'" + "," + "'" + answers.newDepartment + "'" +  ","  + answers.newStock + "," + answers.newPrice  + ");",
  function (err,results,field){
    if (err) throw err;
  });
    console.log('Successfully added.' + " Product " + answers.newName + " Department " + answers.newDepartment + " Price " + answers.newPrice 
    + " Quantity " + answers.newStock + " Exiting Bamazon. Thanks! " );
  connection.end();

});
};


// product catalog display
function productDisplay (){ 
connection.query("SELECT * FROM products", function(err,results,field){
  for (var i = 0; i < results.length; i++){
    console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + "$" +  results[i].price + " | " + "Stock:" + results[i].stock);

  }
  purchaseQuestions();
});
};
// purchase questions

function purchaseQuestions(){
  inquirer.prompt([

  {
  name: "Product_ID",
  message: "What is the ID of the product you would like to buy?"
  },
  {
  name: "Quantity",
  message: "How many would you like to buy"
  },
]).then(function(answers){

  Product_ID = answers.Product_ID,
  Quantity = answers.Quantity

  if (Product_ID != 0 && Quantity != 0){
  stockCheck();
}
  else {
  console.log("No product selected.");
  purchaseQuestions();
}
});

};


// purchaseDisplay(), purchaseConfirm()
function stockCheck() {
  

// displays info of the specific product selected for confirmation purposes.
  var query = "SELECT price, stock, product_name FROM products WHERE ?"
  connection.query(query, {item_id: Product_ID}, function(err, results,field){
  console.log("Purchase |||" + JSON.stringify("Product name " + results[0].product_name + " | "+ "Quantity " + Quantity));
  
// checks the stock of the item.
    var stock = results[0].stock;
    var stockCheck = results[0].stock -= Quantity;
    if (stockCheck < 0) {
      console.log("Insufficient inventory.");
      purchaseQuestions();
    }
  
// if there is enough in stock, the price is calculated. 
    else {
      var total = results[0].price * Quantity;
      console.log("Total Cost " + "$" + total); 
       console.log((Quantity));
 
      confirmPurchase();    
  
  }  

  });
};




// confirm the purchase before updating the database.
function confirmPurchase(){

  inquirer.prompt([
    {
    name: "Purchase",
    message: "Purchase? (y for yes or any other key to exit.)"
    }
    ]).then(function(answers){
      if (answers.Purchase === "y") {
      // update the database
      console.log("Purchase successful! Thank you for shopping.")
      
      updateDB();            
      connection.end();
    }
      else {
        console.log("Ok, have a nice day!");
        connection.end();
    }
  });
        
}; // confirmPurchase function end


//function to change database to reflect purchase.

function updateDB(){
  var update = "UPDATE products SET stock = stock -" + Quantity + " WHERE ?"
  connection.query(update, {item_id: Product_ID}, function(err,results,field){
  if (err) throw err;

});

};



// run program
initialQuestions();
// productDisplay ();
// purchaseQuestions ();
