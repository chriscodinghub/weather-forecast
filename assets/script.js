// this url will be for the 5 day forecast
// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt=5&appid={API key}


var OneDayBtn = document.getElementById('oneDayBtn')
var SevenDayBtn = document.getElementById('sevenDayBtn')
var keyID = '981956ed2a49c2865efe01126aa10ec2'
var lat;
var lon;


loadCityHistory()


function getGeoCode1(){
    
    var city = document.getElementById('city-code').value;
    var state = document.getElementById('state-code').value;
    var country = document.getElementById('country-code').value;
    var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${keyID}`
    
    fetch(geoURL)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        // console.log(data)
        lat = data[0].lat
        lon = data[0].lon
        // console.log(lat, lon, city, state)
        dailyWeather(lat, lon, city, state)
        dailyAddCityToLocalStorage()
    })
}
function dailyWeather(lat, lon, city, state){
    var dailyURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyID}&units=imperial`
    // console.log(dailyURL)
    $(".results").empty();
    fetch(dailyURL)
        .then(function(resp){
            return resp.json()
        })
        .then(function(data){
            console.log(data)

        // Get the sunrise timestamp from the response data
        var sunriseTimestamp = data.sys.sunrise;

        // Create a new Date object using the sunrise timestamp
        var sunriseDate = new Date(sunriseTimestamp * 1000);

        // Format the date in the desired format
        var month = sunriseDate.toLocaleDateString("en-US", { month: "numeric" });
        var dateNumeric = sunriseDate.toLocaleDateString("en-US", { day: "numeric" });
        var yearNumeric = sunriseDate.toLocaleDateString("en-US", { year: "numeric" });
        var dateAlphabetic = sunriseDate.toLocaleDateString("en-US", { weekday: "long" });
        var iconCode = data.weather[0].icon;
        var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`
        var capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
        var formattedDate = `${month}/${dateNumeric}/${yearNumeric} (${dateAlphabetic})`;
        
        // console.log(data); // Check the structure of the data object
        // console.log(data.weather); // Check the value of data.weather
        // console.log(data.dt); // Check the value of data.weather[0].icon


        var iconURL = `http://openweathermap.org/img/w/${iconCode}.png`
                
        var card = document.createElement('div');
        card.classList.add('row');
        card.classList.add('col-sm-12')
        card.innerHTML =
            `<div class="col-sm-12">
            <div class="card">
              <div class="card-body bg-info bg-gradient">
                <h5 class="card-title">${capitalizedCity}, Date: ${formattedDate}</h5>
                <img src="${iconURL}"/>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Temperature: ${data.main.temp}°F</li>
                  <li class="list-group-item">Weather: ${data.weather[0].description}</li>
                  <li class="list-group-item">Wind Speed: ${data.wind.speed} mph</li>
                  <li class="list-group-item">Humidity: ${data.main.humidity}%</li>
                </ul>
              </div>
            </div>
                `;
      document.querySelector('.results').appendChild(card)

        })
}
function getGeoCode7(){
    var city = document.getElementById('city-code').value;
    var state = document.getElementById('state-code').value;
    var country = document.getElementById('country-code').value;
    var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&cnt=7&appid=${keyID}`
    
    
    fetch(geoURL)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        // console.log(data)
        lat = data[0].lat
        lon = data[0].lon
        // console.log(lat, lon, city, state)
        forecastWeather(lat, lon, city, state)
        forecastAddCityToLocalStorage()
    })
}
function forecastWeather(lat, lon, city, state){
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${keyID}&units=imperial`
    // console.log(forecastURL)
    $(".results").empty();
    fetch(forecastURL)
        .then(function(resp){
            return resp.json()
        })
        .then(function(data){
            var forecastList = data.list

            var filteredForecastList = forecastList.filter(function(forecast) {
                // Specify the desired hour blocks (e.g., 12:00 PM, 3:00 PM, 6:00 PM)
                var desiredHours = ["15:00:00", "18:00:00"];
        
                // Get the time from the forecast object
                var time = forecast.dt_txt.split(" ")[1];
        
                // Check if the time matches any of the desired hours
                return desiredHours.includes(time);
              });



        filteredForecastList.forEach(function(forecast){
       
            var sunriseTimestamp = forecast.dt;
            // console.log(forecast)
            var sunriseDate = new Date(sunriseTimestamp * 1000);
            var month = sunriseDate.toLocaleDateString("en-US", { month: "numeric" });
            var dateNumeric = sunriseDate.toLocaleDateString("en-US", { day: "numeric" });
            var yearNumeric = sunriseDate.toLocaleDateString("en-US", { year: "numeric" });
            var dateAlphabetic = sunriseDate.toLocaleDateString("en-US", { weekday: "long" });
            var time = sunriseDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
            var formattedDate = `${month}/${dateNumeric}/${yearNumeric} (${dateAlphabetic})`;
            var capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
            var iconCode = forecast.weather[0].icon;
            var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`

            var card = document.createElement('div');
                card.classList.add('row');
                card.classList.add('col-sm-6')
                card.innerHTML =
                    `<div class="col-sm-12">
                    <div class="card">
                      <div class="card-body bg-info bg-gradient">
                        <h5 class="card-title">${capitalizedCity}, Date: ${formattedDate}</h5>
                        <img src="${iconURL}"/>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">Temperature: ${forecast.main.temp}°F</li>
                          <li class="list-group-item">Weather: ${forecast.weather[0].description}</li>
                          <li class="list-group-item">Wind Speed: ${forecast.wind.speed} mph</li>
                          <li class="list-group-item">Humidity: ${forecast.main.humidity}%</li>
                          <li class="list-group-item">Time: ${time}</li>
                        </ul>
                      </div>
                    </div>
                        `
                    // ` this was my original format, decided to change to a cleaner look
                    // <div class="card-body bg-info bg-gradient">
                    // <img src="${iconURL}"/>
                    // <h3 class="card-make">${city}, ${state}, Date: ${formattedDate}</h3>
                    // <h4 class="card-subtitle mb-2 text-body-secondary">Temperature: ${forecast.main.temp}°F, Weather: ${forecast.weather[0].description}, Wind Speed: ${forecast.wind.speed} mph, Humidity: ${forecast.main.humidity}%, Time: ${time}</h4>
                    // </div>
                    // `;
      document.querySelector('.results').appendChild(card)
            
        })
    })
}

function dailyAddCityToLocalStorage() {
    //Gets the use input which should be a city name
    var userInput = document.getElementById('city-code').value
    //Gets the list of previously searched cities from local storage or an empty array if it doesn't exist
    var dailycities = JSON.parse(localStorage.getItem('cities') || '[]')
    //checks if a searched city is already in the list
    if (!dailycities.includes(userInput)) {
        //Will push the new city to the list
        dailycities.push(userInput)
        //Updates local storage with the new list of cities
        localStorage.setItem('cities', JSON.stringify(dailycities))
        //Calls display city which will add the new city in the form of buttons to the form element
        dailyDisplayCity(userInput)
    }
}
//Displays the city as buttons with the passed in userInput
function dailyDisplayCity(cityName) {
    //Gets the container that will hold the list of searched cities
    var cityHistory = document.getElementById('city-history')
    //Creates a button 
    var cityHistBtn = document.createElement("button")
    //Button gets a Bootstrap class of btn and btn-secondary to style it 
    cityHistBtn.className = "btn btn-outline-dark bg-warning p-1 m-1"
    //Sets the text of the button to the user city input
    cityHistBtn.innerText = cityName.charAt(0).toUpperCase() + cityName.slice(1)
    //Add an event listener to the button container 
    cityHistBtn.addEventListener('click', function() {
        //Sets our input value to the value of the button clicked inner text
        document.getElementById('city-code').value = cityName
        document.getElementById('state-code').value = ''
        document.getElementById('country-code').value = ''
        //Used so the user doesnt have to manually click search button after they click a city button
        OneDayBtn.click()
    })
    //Adds created button to the container
    cityHistory.appendChild(cityHistBtn)
}
function forecastAddCityToLocalStorage() {
    //Gets the use input which should be a city name
    var userInput = document.getElementById('city-code').value
    //Gets the list of previously searched cities from local storage or an empty array if it doesn't exist
    var forecastcities = JSON.parse(localStorage.getItem('forecast') || '[]')
    //checks if a searched city is already in the list
    if (!forecastcities.includes(userInput)) {
        //Will push the new city to the list
        forecastcities.push(userInput)
        //Updates local storage with the new list of cities
        localStorage.setItem('forecast', JSON.stringify(forecastcities))
        //Calls display city which will add the new city in the form of buttons to the form element
        forecastDisplayCity(userInput)
    }
}
function forecastDisplayCity(cityName) {
    //Gets the container that will hold the list of searched cities
    var cityHistory = document.getElementById('forecast-history')
    //Creates a button 
    var cityHistBtn = document.createElement("button")
    //Button gets a Bootstrap class of btn and btn-secondary to style it 
    cityHistBtn.className = "btn btn-outline-dark bg-warning p-1 m-1"
    //Sets the text of the button to the user city input
    cityHistBtn.innerText = cityName.charAt(0).toUpperCase() + cityName.slice(1)
    //Add an event listener to the button container 
    cityHistBtn.addEventListener('click', function() {
        //Sets our input value to the value of the button clicked inner text
        document.getElementById('city-code').value = cityName
        document.getElementById('state-code').value = ''
        document.getElementById('country-code').value = ''
        //Used so the user doesnt have to manually click search button after they click a city button
        SevenDayBtn.click()
    })
    //Adds created button to the container
    cityHistory.appendChild(cityHistBtn)
}

//Load and display the list of cities previously searched by the user from local storage
function loadCityHistory() {
    //Gets the list of cities form local storage  or an empty array
    var dailycities = JSON.parse(localStorage.getItem('cities') || '[]')
    var forecastcities = JSON.parse(localStorage.getItem('forecast') || '[]')
    //Iterates over each city in the list
    dailycities.forEach(function(cityName) {
        //Display the name of each city as a button in the city history section
        dailyDisplayCity(cityName)
    })
    forecastcities.forEach(function(cityName) {
        //Display the name of each city as a button in the city history section
        forecastDisplayCity(cityName)
    })
}


OneDayBtn.addEventListener('click', getGeoCode1)
SevenDayBtn.addEventListener('click', getGeoCode7)