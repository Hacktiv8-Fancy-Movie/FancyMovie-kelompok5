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
  $('#upcoming-view').hide()
  $('#musics-search-view').hide()
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

let movie
function toUpcomingMoviesView(){
  
  pageView('#upcoming-view')
  $('#navbar').show()
  $('.container-logout').show()
  $.ajax({
    url: `${baseUrl}/movies/upcoming`,
    method: 'get',
    headers: {
        token: localStorage.token
    }
  })
    .done(movies => {
        movie = movies
        console.log(movie, '<<< data movies')
        return $.ajax({
          url: baseUrl + '/calender',
          method: 'GET',
          headers: {
            token: localStorage.token
        }
        })
        .done(data =>{
          let holiday = data.holidays
          $('#container-january').empty()
          $('#container-february').empty()
          $('#container-march').empty()
          $('#container-april').empty()
          $('#container-may').empty()
          $('#container-june').empty()
          $('#container-july').empty()
          $('#container-august').empty()
          $('#container-september').empty()
          $('#container-october').empty()
          $('#container-november').empty()
          $('#container-december').empty()

          movie.forEach(el => {
                let month = +el.release_date.split("-")[1]
                if(month == 1){
                  $('#container-january').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 2){
                  
                  $('#container-february').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 3){

                  $('#container-march').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 4){
                  $('#container-april').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 5){
                  $('#container-may').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 6){
                  $('#container-june').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 7){
                  $('#container-july').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 8){
                  $('#container-august').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 9){
                  $('#container-september').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 10){
                  $('#container-october').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 11){
                  $('#container-november').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 12){
                  $('#container-december').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                


          })

          $('#container-january1').empty()
          $('#container-february1').empty()
          $('#container-march1').empty()
          $('#container-april1').empty()
          $('#container-may1').empty()
          $('#container-june1').empty()
          $('#container-july1').empty()
          $('#container-august1').empty()
          $('#container-september1').empty()
          $('#container-october1').empty()
          $('#container-november1').empty()
          $('#container-december1').empty()

          holiday.forEach(el => {
            let month = el.date.datetime.month
            if(month == 1){
              
              $('#container-january1').append(`
          
                <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 2){
              $('#container-february1').append(`
          
              <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 3){
              $('#container-march1').append(`
          
                <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 4){
              $('#container-april1').append(`
          
              <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 5){
              $('#container-may1').append(`
          
                <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 6){
              $('#container-june1').append(`
          
              <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 7){
              $('#container-july1').append(`
          
                <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 8){
              $('#container-august1').append(`
          
              <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 9){
              $('#container-september1').append(`
          
                <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 10){
              $('#container-october1').append(`
          
              <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 11){
              $('#container-november1').append(`
          
                <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 12){
              $('#container-december1').append(`
          
              <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }

      })
        })

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

function toHolidayView() {
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
              <td>${el.date.iso.slice(0, 10)}</td>
            </tr>
          `)
      })
    })
    .fail(err => console.log(err))
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

function toMusicsSearchView(event){
  // 
  event.preventDefault()
  let keyword = $("#search-music").val()
  console.log(keyword, "<<keyword");
  pageView('#musics-search-view')
  $('#navbar').show()
  $('.container-logout').show()
  $.ajax({
    url: baseUrl + `/musics/search?query=${keyword}`,
    method: 'GET',
    headers: {
      token: localStorage.token
    }
  })
  .done(data => {
    data = data.data
    console.log(data);
    $('#container-musics-search').empty()
    data.map(el => {
      $('#container-musics-search').append(`
      <tr>
        <td><img src="${el.album.cover}" alt="music poster"></td>
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