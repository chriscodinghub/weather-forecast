// this url will be for the 5 day forecast
// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt=5&appid={API key}


var OneDayBtn = document.getElementById('oneDayBtn')
var keyID = '981956ed2a49c2865efe01126aa10ec2'
var lat;
var lon;




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
        console.log(lat, lon, city, state)
        dailyWeather(lat, lon, city, state)
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

        var formattedDate = `${month}/${dateNumeric}/${yearNumeric} (${dateAlphabetic})`;
        
        console.log(data); // Check the structure of the data object
        console.log(data.weather); // Check the value of data.weather
        console.log(data.weather[0].icon); // Check the value of data.weather[0].icon


        var iconUrl = `http://openweathermap.org/img/w/${data.weather[0].Icon}.png`
                console.log(iconUrl)
            var card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <div class="card-body bg-info bg-gradient">
                     <img src="${iconUrl}"/>
                    <h3 class="card-make">${city}, ${state}, Date: ${formattedDate}</h3>
                    <h4 class="card-subtitle mb-2 text-body-secondary">Temperature: ${data.main.temp}°F, Weather: ${data.weather[0].description}, Wind Speed: ${data.wind.speed} mph</h4>
                    <p class="card-text">Humidity: ${data.main.humidity}%</p>
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
        console.log(lat, lon, city, state)
        forecastWeather(lat, lon, city, state)
    })
}
function forecastWeather(lat, lon, city, state){
    var forecastURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&cnt=7&appid=${keyID}&units=imperial`
    // console.log(dailyURL)
    $(".results").empty();
    fetch(forecastURL)
        .then(function(resp){
            return resp.json()
        })
        .then(function(data){
            var forecastList = data.list
                forecastList.forEach(function(forecast){
       
        var sunriseTimestamp = forecast.sys.sunrise;
        var sunriseDate = new Date(sunriseTimestamp * 1000);
        var month = sunriseDate.toLocaleDateString("en-US", { month: "numeric" });
        var dateNumeric = sunriseDate.toLocaleDateString("en-US", { day: "numeric" });
        var yearNumeric = sunriseDate.toLocaleDateString("en-US", { year: "numeric" });
        var dateAlphabetic = sunriseDate.toLocaleDateString("en-US", { weekday: "long" });

        var formattedDate = `${month}/${dateNumeric}/${yearNumeric} (${dateAlphabetic})`;
        
        var iconCode = forecast.weather[0].icon;

            var card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <div class="card-body bg-info bg-gradient">
                    <i class="wi wi-owm-${iconCode}"></i>
                    <h3 class="card-make">${city}, ${state}, Date: ${formattedDate}</h3>
                    <h4 class="card-subtitle mb-2 text-body-secondary">Temperature: ${forecast.main.temp}°F, Weather: ${forecast.weather[0].description}, Wind Speed: ${forecast.wind.speed} mph</h4>
                    <p class="card-text">Humidity: ${forecast.main.humidity}%</p>
                    </div>
                    `;
      document.querySelector('.results').appendChild(card)
            
        })
    })
}


OneDayBtn.addEventListener('click', getGeoCode1)
fiveDayBtn.addEventListener('click', getGeoCode7)