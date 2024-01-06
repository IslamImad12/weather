// var myHttp = new XMLHttpRequest();

// myHttp,open('GET','');

// myHttp.send();

// myHttp.addEventListener('readystatechange',function(){
//     if(myHttp.readyState == 4){
//         console.log(JSON.parse(myHttp.response));
//     }
// })

// http://api.weatherapi.com/v1
// API Key: 261c5d66e1064b18b97125038240501 

// https://api.weatherapi.com/v1/search.json?key=261c5d66e1064b18b97125038240501&q=lond

var searchInput = document.getElementById("search_input");
var confirmSearchBtn = document.querySelector(".confirm_search_btn");
var dayName = document.querySelector(".day_name");
var dayDate = document.querySelector(".day_name");
var cityName = document.querySelector(".city_name");
var weatherDsgree = document.querySelector(".weather_degree");
var conditionIcon = document.querySelector(".status_icon");
var conditionDescription = document.querySelector(".status_condition");
var cards_container = document.querySelector("#allData");

function getData(selectedLocation) {
    var myhttp = new XMLHttpRequest();
    myhttp.open(
      "GET",
      `https://api.weatherapi.com/v1/forecast.json?key=86c4d42b74724e1caa112926240101&q=${selectedLocation}&days=3`
    );
    myhttp.send();
    myhttp.addEventListener("readystatechange", function () {
      if (myhttp.readyState == 4 && myhttp.status == 200) {
        console.log(JSON.parse(myhttp.response));
        displayData(JSON.parse(myhttp.response));
      }
    });
  }
  
  getData("cairo");

  function displayData(x) {
    var date1 = new Date(x.forecast.forecastday[0].date);
  var date2 = new Date(x.forecast.forecastday[1].date);
  var date3 = new Date(x.forecast.forecastday[2].date);
  var times = [];

  for (var i = 0; i < x.forecast.forecastday[0].hour.length; i++) {
    var dateString = x.forecast.forecastday[0].hour[i].time;
    var dateObject = new Date(dateString);
    var hours = dateObject.getHours();
    var minutes = dateObject.getMinutes();

    var formattedTime =
      (hours < 10 ? "0" : "") +
      hours +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes;

    times.push(formattedTime);
  }

  // console.log(times);
    cartona = `
    <div class="card-group">
    <div class="card  bg-dark border-light text-light">
      <div class="card-header border-light">
        <span class="day_name text-uppercase">${date1.toLocaleString("en-us", { weekday: "long", })}</span>
        <span class="day_date text-capitalize">${x.forecast.forecastday[0].date}</span>
      </div>
      <div class="card-body">
        <p class="city_name">${x.location.name}</p>
        <h5 class="h1 weather_degree" style="font-size: 50px;">${x.current.temp_c}</h5>
        <span class = "text-info">&degC</span></h1>
        <p class="status_condition">${x.current.condition.text}</p>
        <span>
          <img src="css/images/icon-umberella.png" alt="">
          20%
        </span>
        <span>
          <img src="css/images/icon-wind.png" alt="">
          18km/h
        </span>
        <span>
          <img src="css/images/icon-compass.png" alt="">
          East
        </span>
      </div>
    </div>
    <div class="card  bg-dark border-light text-light text-center">
      <div class="card-header border-light">
        <span class="day_name text-uppercase">${date2.toLocaleString("en-us", {weekday: "long",})}</span>
        
      </div>
      <div class="card-body">
        
        <img src="css/images/113.png" alt="">
        <div class="weather_degree">${x.forecast.forecastday[1].day.mintemp_c}&deg</div>
        <small>12.8<sup>o</sup></small>
        <p class="status_condition">${x.forecast.forecastday[1].day.condition.text}
     </p>
      </div>
    </div>
    <div class="card  bg-dark border-light text-light text-center">
      <div class="card-header border-light">
        <span class="day_name text-uppercase">${date3.toLocaleString("en-us", {weekday: "long",})}</span>
      </div>
      <div class="card-body">
        
        <img src="css/images/113.png" alt="">
        <div class="weather_degree">${x.forecast.forecastday[2].day.mintemp_c}&deg</div>
        <small>14<sup>o</sup></small>
        <p class="status_condition">${x.forecast.forecastday[2].day.condition.text}</p>
      </div>
    </div>
  </div>
    `
    document.getElementById('allData').innerHTML = cartona;
    
  }


  confirmSearchBtn.addEventListener("click", function () {
    console.log(searchInput.value);
    if (searchInput.value == "") {
      getData("cairo");
    }
    getData(searchInput.value);
  });

  const autoDetectLocationButton = document.querySelector(".detect_location");

  autoDetectLocationButton.addEventListener("click", () =>
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.table(data);
          console.log(data.address.city);
         
          getData(data.address.city);
          searchInput.value = data.address.city;
          
        })
        .catch(() => {
          console.log("can not get your location 🥲  ");
          Swal.fire({
            title: "Sorry ",
            text: "Can not Detect Your Location 🥲  ",
            icon: "error",
          });
        });
    })
  );
//   displayData('cairo');
