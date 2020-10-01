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
    pageView('#holiday-view')
    toHolidayView()
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
  $.ajax({
    url: baseUrl + '/calender',
    method: 'GET'
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
}