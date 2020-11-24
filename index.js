// import * as cityData from "./cities.json";

// const {cities} = cityData;
// console.log(cities);




const basicInfo = document.querySelector(".basic_info");
const cityInput = document.querySelector(".city");
const citySearch = document.querySelector(".city_search");

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const key = "01d8cc6b37382e46a3286ef77239e752"


window.addEventListener("load", () => {
    let lon;
    let lat;

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const cors = "https://cors-anywhere.herokuapp.com/"

            const url = `${cors}/http:/api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;

            async function fetchWeather() {
                const response = await fetch(url);
                const data = await response.json();
                return data;
            }
            fetchWeather().then(data => {

                console.log(data);

                // getting time and date
                let dateObj = new Date(data.dt * 1000);

                let year = dateObj.getFullYear();
                let month = dateObj.getMonth();
                let date = dateObj.getDate();
                let day = dateObj.getDay();
                let hours = (dateObj.getHours() < 10 ? '0' : '') + dateObj.getHours();
                let minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

                let icon = data.weather[0].icon;
                let description = data.weather[0].description;
                description = description.charAt(0).toUpperCase() + description.slice(1);


                basicInfo.innerHTML = `
                <div class="weather__card">
                    <div class="location">
                        <p><span class="fas fa-map-marker-alt"></span> ${data.name}, ${data.sys.country}</p>
                    </div>
                    
                    <div class="temp">
                        <h1>${data.main.temp}&#176C</h1>
                        <p>${description}</p>
                    </div>
                    <div class="time__date">
                    <h1>${hours} : ${minutes} </h1>
                    <p>${weekdays[day]}<p>
                    <h5>${date} ${months[month]} ${year}</h5>
                    </div>
                    <div class="icon">
                    <img src="http://openweathermap.org/img/w/${icon}.png" alt="icon" class="icon">
                    </div>
                    <div class="more__info">
                    <p>Humidity <span class="fas fa-percent"></span> : ${data.main.humidity} %</p>
                    <p>Wind Speed <span class="fas fa-wind"></span> :  ${data.wind.speed} m/s</p>
                    <p>Max Temp <span class="fas fa-temperature-high"></span> : ${data.main.temp_max} &#176C</p>
                    <p>Min Temp <span class="fas fa-temperature-low"></span> : ${data.main.temp_min} &#176C</p>
                    </div>

                </div>
                `;

            });
        });

        async function fetchCities() {
            const res = await fetch("./csvjson.json");
            const cities = await res.json();
            return cities;
        }
        fetchCities().then(cities => {
            console.log(cities);

        });

    }
    else {
        alert("Allow location access");
    }
});


