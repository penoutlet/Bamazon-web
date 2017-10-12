var React = require('react')
var createReactClass = require('create-react-class')


var signUpForm = createReactClass({
  render:function(){
    return(
      <form>
        <input type="text" class="form-control" placeholder="Username. (public)" id = 'user' name = 'username'>
        <input type='text' class='form-control' placeholder='Password (private).' id = 'user' name = 'password'>
        <input type='text' class='form-control' placeholder='Email (private.' id = 'user' name = 'email'>
        <input type='text' class='form-control' placeholder='Looking for... (public).' id = 'user' name = 'lookingfor'>

        <button type="submit" class="btn btn-info" id = 'add-button'> Sign-up </button>

      </form>


    )//return
  }//render
})// createReactClass
