let baseUrl = "http://localhost:3000"
let tempId = null

$(document).ready(function() {
    // checkLogin()
    toMoviesView()
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
}

function toHolidayView(){
  // 
}