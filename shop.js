//buy button on click, update the product to be -1
$('#buy-button').on('click',()=>{
  $.ajax(METHOD='UPDATE', URL: 'localhost:3001/products',(error, results)=>{
    if (error) {
      console.log(error);
    }
    else {
      console.log(results);
      results.stock_quantity - 1
    }
  })
})
