const weatherModule = (() => {

    // cache DOM
    const locationInput = document.querySelector("#locationInput")
    const temp = document.querySelector("#temp")
    const disp = document.querySelector("#disp")
    const loc = document.querySelector("#loc")
    const searchBtn = document.querySelector("#searchBtn")
    const toggleBtn = document.querySelector("#toggleBtn")
    const loading = document.querySelector(".lds-ring")

    // event Listners
    searchBtn.addEventListener("click", () => { displayWeather(locationInput.value) });
    toggleBtn.addEventListener("click", toggle)

    let temperature = 0;

    // functions
    async function getWeatherData(location) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=7b175c2aefe32be480ff27b12fc78e51`, { mode: "cors"});
        const data = await response.json();
        return {temp: data.main.temp, disp: data.weather[0].description }
    }

    function displayWeather(location) {
        const weather = getWeatherData(location);
        weather.then(res => {
            temperature = ftoc(res.temp)
            temp.textContent = temperature + " °C"
            disp.textContent = res.disp;
            loading.style.display = "none"
        }).catch(err => {
            loc.textContent = ""
            temp.textContent = "";
            disp.textContent = `${location} not found`;
        })
        changeTitle(location)
        loading.style.display = "inline-block"
    }

    function toggle() {
        if(toggleBtn.value == "°F"){
            toggleBtn.value = "°C";
            temperature = ctof(temperature);
            temp.textContent = temperature + " °F";
        } else {
            toggleBtn.value = "°F";
            temperature = ftoc(temperature);
            temp.textContent = temperature + " °C";
        }
    }

    const ftoc = function(fahrenheit) {
        return Math.round(((fahrenheit - 32) * (5/9)) * 10) / 10;
      };
      
      const ctof = function(celsius) {
        return Math.round(((celsius * (9/5) + 32)) * 10) / 10;
      };
      
    function changeTitle(location) {
        let temp = location.split("");
        temp[0] = temp[0].toUpperCase();
        location = temp.join("")
        loc.textContent = location;
    }
    
    //init
    displayWeather("Potsdam")
    
})();