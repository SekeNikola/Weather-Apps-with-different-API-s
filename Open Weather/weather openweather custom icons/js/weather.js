function getWeather() {
    AppID = '2172797&appid=8fe3ad3bbb7be5102e0bde65ce9a7ac3';
    var city = '';

    document.getElementById('button').addEventListener('click', () => {
        city = document.getElementById('input').value;
        if (city === "") return false;

        // Hide form
        document.getElementById('form').style.display = 'none'

        // Fetch data from API
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&id=${AppID}&units=metric`)
            .then(res => res.json())
            .then((data) => {

                // Place data in HTML
                document.getElementById('city').innerHTML = city

                let temp = Math.round(data.main.temp);
                document.getElementById('temp').innerHTML = temp + '&deg'

                let weather = data.weather[0].main
                document.getElementById('weather').innerHTML = weather

                // Weather icons
                let clouds = './img/clouds.svg';
                let clear = './img/sunny.svg';
                let rain = './img/rain.svg';
                let storm = './img/storm.svg';
                let snow = './img/snow.svg';

                // Display image depend on weather conditions
                let img = document.getElementById('img')
                if (weather == 'Clouds' || '') {
                    img.src = clouds
                } else if (weather == 'Clear') {
                    img.src = clear
                } else if (weather === 'Thunderstorm') {
                    img.src = storm
                } else if (weather == 'Rain' || 'Drizzle') {
                    img.src = rain
                } else if (weather == 'Snow') {
                    img.src = snow
                }
            })
            .catch(error => console.log(error));

        // 5 days forecast (Open weather free does not give you true 5 days, you must pay for that feture)
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&id=${AppID}&units=metric&cnt=5`)
            .then(res => res.json())
            .then((data) => {
                let output = '';
                data.list.forEach(day => {
                    let weatherIcons = day.weather[0].main
                    output += `<div class="day">
                               <div class="max">${Math.round(day.main.temp_max)}&deg</div>
                               <div class="icon" src="">${weatherIcons}</div>
                               <div>${Math.round(day.main.temp_min)}&deg</div>
                               </div>`
                });
                document.getElementById('days').innerHTML = output;
            })
    });
}

getWeather()