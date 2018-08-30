window.onload = () => {


    if (navigator.geolocation.getCurrentPosition) {

        navigator.geolocation.getCurrentPosition(function(position) {
            var lat= position.coords.latitude;
            var lon = position.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&id=2172797&appid=8fe3ad3bbb7be5102e0bde65ce9a7ac3&units=metric`)
        .then(res => res.json())
            .then((data) => {

                // Place data in HTML
                let id = data.weather[0].id
                document.getElementById('img').innerHTML = `<img><i class="wi wi-owm-${id}"></i>`

                let city = data.name
                document.getElementById('city').innerHTML = city

                let temp = Math.round(data.main.temp);
                document.getElementById('temp').innerHTML = temp + '&deg'

                let description = data.weather[0].main
                document.getElementById('weather').innerHTML = description

            })

            // 5 days forecast (Open weather free does not give you true 5 days, you must pay for that feture)
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&id=2172797&appid=8fe3ad3bbb7be5102e0bde65ce9a7ac3&units=metric&cnt=5`)
            .then(res => res.json())
            .then((data) => {

                // Place data in HTML
                let output = '';

                data.list.forEach(day => {
                    output += `<div class="day">
                               <div class="max">${Math.round(day.main.temp)}&deg</div>
                               <i class="wi wi-owm-${day.weather[0].id}"></i>
                               <div>${day.weather[0].description}&deg</div>
                               </div>`
                });
                document.getElementById('days').innerHTML = output;

            })


    })}}
