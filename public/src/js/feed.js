var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
let geoLocation = document.querySelectorAll('.enable-geolocation');
let geoLocationTrack = document.querySelector('#track-location');
let stopGeoLocationTrack = document.querySelector('#stop-track-location');
let trackResults = document.querySelector('#track-results');
let trackInterval = document.querySelector('#track-interval');
let trackUserCoordinates;

function openCreatePostModal() {
  createPostArea.style.display = 'block';
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);




function initialTheLocation() {
  if (!('geolocation' in navigator)) {
    return;
  }

  /*navigator.geolocation.watchPosition(function (position) {
    console.log('Watch position', position);
  }, function (err) {
    console.log(err);
    alert('Couln\'t fetch location');
  }, {timeout: 7000});*/
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log('Current position', position);
  }, function (err) {
    console.log(err);
    alert('Couln\'t fetch location');
  }, {timeout: 7000});
}

for (let i = 0; i < geoLocation.length; i++) {
  if (!('geolocation' in navigator)) {
    geoLocation[i].style.display = 'none';
  } else {
    geoLocation[i].style.display = 'inline-block';
  }
  geoLocation[i].addEventListener('click', initialTheLocation);
}

function trackCurrentPosition() {
  if (!('geolocation' in navigator)) {
    trackResults.innerHTML = 'Geo location is not supported';
    return;
  }

  let interval = parseInt(trackInterval.value);
  if (!(interval > 0)) {
    trackResults.innerHTML = 'Please set correct interval value';
    return;
  }

  trackUserCoordinates = setInterval(trackUserPosition, interval*1000);

}

function trackUserPosition() {
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log('Your position is:', position);
    trackResults.innerHTML += '<div class="row">' +
        + '<div class="item">' + timeConverter(position.timestamp) + '</div>'
        + '<div class="item">Lat:' + position.coords.latitude + '</div>'
        + '<div class="item">Long:' + position.coords.longitude + '</div>'
        + '<div class="item">Map: <iframe\n' +
        '                        width="600"\n' +
        '                        height="450"\n' +
        '                        frameborder="0" style="border:0"\n' +
        '                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBDlSsymujMQ0qlTCMmE8e9YyV2goPrwX0\n' +
        '    &q=' + position.coords.latitude + ',' + position.coords.longitude + '" allowfullscreen>\n' +
        '                </iframe></div>'
        + '</div>';
    console.log('Current position', position);
  }, function (err) {
    console.log(err);
    alert('Couln\'t fetch location');
  }, {timeout: 7000});
}

function timeConverter(timestamp){
  var a = new Date(timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  let timeRes = '';
  timeRes = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return timeRes;
}

function stopTrackCurrentPosition() {
  console.log('Stop tracking');
  clearInterval(trackUserCoordinates);
}

geoLocationTrack.addEventListener('click', trackCurrentPosition);
stopGeoLocationTrack.addEventListener('click', stopTrackCurrentPosition);

