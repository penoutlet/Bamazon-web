var sequelize = require('sequelize');
var db = require('../models');

  $('#add-form').hide();
  $('#show-add-form-button').on('click', function() {
    $('#add-form').show()
  });

  $('#hide-add-form-button').on('click', function(){
    $('#add-form').hide()
  });

  $('#show-table-button').on('click', function() {
    $('#manager-table').show();
  });

  $('#hide-table-button').on('click', function(){
    $('#manager-table').hide()
  });

  $('#delete-btn').on('click',()=>{
    console.log('test' + {{this.id}});
  	db.products
  		.destroy({
  			where: {
  				id: {{this.id}}
  			}
  		})
  		.then((response)=>{
  			console.log(req.body.id + 'successfully deleted.');
  		});

  })
