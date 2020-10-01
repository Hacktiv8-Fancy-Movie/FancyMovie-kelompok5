let baseUrl = "http://localhost:3000"
let tempId = null

$(document).ready(function() {
    checkLogin()
});

// kalau ada tambahan list view ditambah disini, fungsi untuk menentukan mana yang mau di view
// gak usah nentuin mana yang di hide, masukin di parameter mana yang mau di view
function pageView(el){
  $('#register-view').hide()
  $('#login-view').hide()
  $('#movies-view').hide()
  $('#musics-view').hide()
  $('#holiday-view').hide()
  $(el).show()
}

function checkLogin(){
  // jika berhasil login
  if(localStorage.token){
    pageView('#movies-view')
  }
  // jika tidak berhasil login
  else{
    pageView('#login-view')
  }
}

function toRegisterView(event){
  // 
}

function toLoginView(event){
  // 
}

function toMoviesView(){
  // 
}

function toMusicsView(){
  // 
}

function toHolidayView(){
  // 
}
  
function onSignIn(googleUser) {
  var tokenGoogle = googleUser.getAuthResponse().id_token;
  // console.log(tokenGoogle); // This is null if the 'email' scope is not present.
  $.ajax({
    url: baseUrl+"/users/googleSign",
    method: "POST",
    data:{
      tokenGoogle
    }
  })
  .done(data => {
    localStorage.setItem("token", data.token)
    console.log(localStorage.token, "<<<< token");
    checkLogin()
  })
  .fail(err => {
    console.log(err.responseJSON.errors, "<<<< error")
  })
}