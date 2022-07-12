import {
    checkFields
} from "./utils.js"

let userInfo = {}

const form = document.querySelector("[data-form-signup]")
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const data = userInfo
    if (data) {
        delete data.passwordConfirm
        await registerUser(data)
    }
})

const inputs = document.querySelectorAll('input')
inputs.forEach(input => {
    input.addEventListener('keyup', ({target}) => {
        const {value, name} = target
        userInfo[name] = value
        checkFields(userInfo, 'signup')
    })
})

async function registerUser(user) {
    const options = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(user)
    }
 
    await fetch("https://ctd-fe2-todo-v2.herokuapp.com/v1/users", options)
        .then((res) => res.json())
        .then(({ jwt }) => {
            if (!jwt) {
                alert("Usuario já cadastrado! Sou um alerta")
                throw new Error("Usuario já cadastrado! Sou um print no console")
            }

            alert("Usuario cadastrado com sucesso!")
            localStorage.setItem("jwt", JSON.stringify(jwt))
            location.href = "/index.html"
        })
        .catch((err) => console.error(err.message))
}


function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
      testAPI();  
    } else {                                 // Not logged into your webpage or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this webpage.';
    }
  }


  function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) {   // See the onlogin handler
      statusChangeCallback(response);
    });
  }


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{app-id}',
      cookie     : true,                     // Enable cookies to allow the server to access the session.
      xfbml      : true,                     // Parse social plugins on this webpage.
      version    : '{api-version}'           // Use this Graph API version for this call.
    });


    FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
      statusChangeCallback(response);        // Returns the login status.
    });
  };
 
  function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

  