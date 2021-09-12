const weatherModule = (() => {
    async function getWeather(location) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7b175c2aefe32be480ff27b12fc78e51`, { mode: "cors"});
        const data = await response.json();
        console.log(data.main.temp)
        return await {temp: data.main.temp}
    }

    let a = getWeather("london").then(res => { return res})
    
    
    
})();