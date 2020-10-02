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
          console.log(holiday, "ini holiday")
          $('#holiday-container').empty()
          $('#container-movies').empty()
          $('#container-january').empty()
          $('#container-january1').empty()
          $('#container-february').empty()
          $('#container-february1').empty()


          movie.forEach(el => {
                let month = +el.release_date.split("-")[1]
                if(month == 1){
                  $('#container-january').empty()
                  $('#container-january').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 2){
                  
                  $('#container-february').empty()
                  $('#container-february').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 3){

                  $('#container-march').empty()
                  $('#container-march').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 4){
                  $('#container-april').empty()
                  $('#container-april').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 5){
                  $('#container-may').empty()
                  $('#container-may').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 6){
                  $('#container-june').empty()
                  $('#container-june').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 7){
                  $('#container-july').empty()
                  $('#container-july').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 8){
                  $('#container-august').empty()
                  $('#container-august').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 9){
                  $('#container-september').empty()
                  $('#container-september').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 10){
                  $('#container-october').empty()
                  $('#container-october').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 11){
                  $('#container-november').empty()
                  $('#container-november').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                if(month == 12){
                  $('#container-december').empty()
                  $('#container-december').append(`
              
                    <li>${el.title}</li>
                  
                  `)

                }
                


          })

          holiday.forEach(el => {
            let month = el.date.datetime.month
            if(month == 1){
              $('#container-january1').empty()
              $('#container-january1').append(`
          
                <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 2){
              $('#container-february1').empty()
              $('#container-february1').append(`
          
              <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 3){
              $('#container-march1').empty()
              $('#container-march1').append(`
          
                <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 4){
              $('#container-april1').empty()
              $('#container-april1').append(`
          
              <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 5){
              $('#container-may1').empty()
              $('#container-may1').append(`
          
                <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 6){
              $('#container-june1').empty()
              $('#container-june1').append(`
          
              <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 7){
              $('#container-july1').empty()
              $('#container-july1').append(`
          
                <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 8){
              $('#container-august1').empty()
              $('#container-august1').append(`
          
              <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 9){
              $('#container-september1').empty()
              $('#container-september1').append(`
          
                <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 10){
              $('#container-october1').empty()
              $('#container-october1').append(`
          
              <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 11){
              $('#container-november1').empty()
              $('#container-november1').append(`
          
                <li>${el.date.iso.slice(0,10)} : ${el.name}</li>
              
              `)
            }
            if(month == 12){
              $('#container-december1').empty()
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
      // let januari = []
      $('#januari-container').empty()
      $('#februari-container').empty()
      $('#maret-container').empty()
      $('#april-container').empty()
      $('#mei-container').empty()
      $('#juni-container').empty()
      $('#juli-container').empty()
      $('#agustus-container').empty()
      $('#september-container').empty()
      $('#oktober-container').empty()
      $('#november-container').empty()
      $('#desember-container').empty()
      data.holidays.forEach(el => {
        if (el.date.datetime.month == 1) {
          $('#januari-container').append(`
            <tr>
              <td>${el.name}</td>
              <td>${el.date.iso.slice(0,10)}</td>
            </tr>
          `)
        }else if (el.date.datetime.month == 2) {
          $('#februari-container').append(`
            <tr>
              <td>${el.name}</td>
              <td>${el.date.iso.slice(0,10)}</td>
            </tr>
          `)
        }else if (el.date.datetime.month == 3) {
          $('#maret-container').append(`
            <tr>
              <td>${el.name}</td>
              <td>${el.date.iso.slice(0,10)}</td>
            </tr>
          `)
        }else if (el.date.datetime.month == 4) {
          $('#april-container').append(`
            <tr>
              <td>${el.name}</td>
              <td>${el.date.iso.slice(0,10)}</td>
            </tr>
          `)
        }else if (el.date.datetime.month == 5) {
          $('#mei-container').append(`
            <tr>
              <td>${el.name}</td>
              <td>${el.date.iso.slice(0,10)}</td>
            </tr>
          `)
        }else if (el.date.datetime.month == 6) {
          $('#juni-container').append(`
            <tr>
              <td>${el.name}</td>
              <td>${el.date.iso.slice(0,10)}</td>
            </tr>
          `)
        }else if (el.date.datetime.month == 7) {
          $('#juli-container').append(`
            <tr>
              <td>${el.name}</td>
              <td>${el.date.iso.slice(0,10)}</td>
            </tr>
          `)
        }else if (el.date.datetime.month == 8) {
          $('#agustus-container').append(`
            <tr>
              <td>${el.name}</td>
              <td>${el.date.iso.slice(0,10)}</td>
            </tr>
          `)
        }else if (el.date.datetime.month == 9) {
          $('#september-container').append(`
            <tr>
              <td>${el.name}</td>
              <td>${el.date.iso.slice(0,10)}</td>
            </tr>
          `)
        }else if (el.date.datetime.month == 10) {
          $('#oktober-container').append(`
            <tr>
              <td>${el.name}</td>
              <td>${el.date.iso.slice(0,10)}</td>
            </tr>
          `)
        }else if (el.date.datetime.month == 11) {
          $('#november-container').append(`
            <tr>
              <td>${el.name}</td>
              <td>${el.date.iso.slice(0,10)}</td>
            </tr>
          `)
        }else if (el.date.datetime.month == 12) {
          $('#desember-container').append(`
            <tr>
              <td>${el.name}</td>
              <td>${el.date.iso.slice(0,10)}</td>
            </tr>
          `)
        }
        
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