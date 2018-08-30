function getWeather() {
    AppID = '2172797&appid=8fe3ad3bbb7be5102e0bde65ce9a7ac3';
    let city = '';

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

                let icon = data.weather[0].icon
                document.getElementById('img').src = `https://openweathermap.org/img/w/${icon}.png`

                document.getElementById('city').innerHTML = city

                let temp = Math.round(data.main.temp);
                document.getElementById('temp').innerHTML = temp + '&deg'

                let weather = data.weather[0].main
                document.getElementById('weather').innerHTML = weather
            })
            .catch(error => console.log(error));

        // 5 days forecast (Open weather free does not give you true 5 days, you must pay for that feture)
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&id=${AppID}&units=metric&cnt=5`)
            .then(res => res.json())
            .then((data) => {
                let output = '';
                data.list.forEach(day => {
                    
                    output += `<div class="day">
                               <div class="max">${Math.round(day.main.temp_max)}&deg</div>
                               <img class="icon" src="https://openweathermap.org/img/w/${day.weather[0].icon}.png">
                               <div>${Math.round(day.main.temp_min)}&deg</div>
                               </div>`
                });
                document.getElementById('days').innerHTML = output;
            })
    });
}

getWeather()