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
  $('.container-logout').hide()
  $('#navbar').hide()
  $(el).show()
}

function checkLogin(){
  // jika berhasil login
  if(localStorage.token){

    pageView('#movies-view')
    toMoviesView()
  }
  // jika tidak berhasil login
  else{

    pageView('#login-view')
  }
}

function toRegisterView(){
  pageView("#register-view")
}

function register(event){
  event.preventDefault();
  let email = $("#register-email").val()
  let password = $("#register-password").val()
  $.ajax({
    url: baseUrl+"/users/register",
    method: "post",
    data:{
      email,
      password
    }
  })
  .done(data => {
    console.log(data, "<<<< data login")
    // localStorage.setItem("token", data.token)
    // console.log(localStorage.token, "<<<< token");
    checkLogin()
  })
  .fail(err => {
    console.log(err.responseJSON.errors, "<<<< error")
  })
}

function toLoginView(){
  pageView("#login-view")
}

function login(event){
  event.preventDefault();
  let email = $("#login-email").val()
  let password = $("#login-password").val()
  $.ajax({
    url: baseUrl+"/users/login",
    method: "post",
    data:{
      email,
      password
    }
  })
  .done(data => {
    console.log(data, "<<<< data login")
    localStorage.setItem("token", data.token)
    console.log(localStorage.token, "<<<< token");
    checkLogin()
  })
  .fail(err => {
    console.log(err.responseJSON.errors, "<<<< error")
  })
}
function toMoviesView(){
  pageView('#movies-view')
  $('#navbar').show()
  $('.container-logout').show()
  $.ajax({
    url: `${baseUrl}/movies`,
    method: 'get',
    headers: {
        token: localStorage.token
    }
  })
    .done(movies => {
        console.log(movies, '<<< data movies')
        $('#container-movies').empty()
        let i = 0
        movies.forEach(movie => {
            i++
            $('#container-movies').append(`
            <tr >
            <th scope="row">${i}</th>
            <td>${movie.title}</td>
            <td>${movie.popularity}</td>
            <td>${movie.overview}</td>
            <td>  <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="movie poster"> </td>
            </tr>
            `)
        });
    })
    .fail(err =>{
        console.log(err.responseJSON.errors)
    })
}



function toMusicsView(){
  // 
  pageView('#musics-view')
  $('#navbar').show()
  $('.container-logout').show()
  $.ajax({
    url: baseUrl + '/musics/chart',
    method: 'GET',
    headers: {
      token: localStorage.token
    }
  })
  .done(data => {
    data = data.tracks.data
    console.log(data);
    $('#container-musics').empty()
    data.map(el => {
      $('#container-musics').append(`
      <tr>
        <td><img src="${el.album.cover}" alt="movie poster"></td>
        <td>${el.title}</td>
        <td>${el.artist.name}</td>
        <td>
          <audio controls>
            <source src="${el.preview}"
          </audio>
        </td>
      </tr>
      `)
    })
  })
  .fail(err => console.log(err))
}

function toHolidayView(){
  pageView('#holiday-view')
  $('#navbar').show()
  $('.container-logout').show()
  $.ajax({
    url: baseUrl + '/calender',
    method: 'GET',
    headers: {
      token: localStorage.token
    }
  })
  .done(data => {
    $('#holiday-container').empty()
    data.holidays.forEach(el => {
      $('#holiday-container').append(`
      <tr>
        <td>${el.name}</td>
        <td>${el.date.iso.slice(0,10)}</td>
      </tr>
      `)
    })
  })
  .fail(err => console.log(err))
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
    console.log(localStorage.token);
    checkLogin()
  })
  .fail(err => {
    console.log(err.responseJSON.errors)
  })
}

function logout(){
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  checkLogin()
}