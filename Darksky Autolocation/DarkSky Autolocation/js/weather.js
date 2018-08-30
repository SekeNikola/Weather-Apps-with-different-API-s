window.onload = () => {

    if (navigator.geolocation.getCurrentPosition) {

        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude.toFixed(4);
            var lon = position.coords.longitude.toFixed(4);

            AppID = 'ddfee1b981bcaffbda663bbbc42b6d2b';
            
            // Fetch data from API
            fetch(`https://api.darksky.net/forecast/${AppID}/${lat},${lon}`)

                .then(res => res.jsonp())
                .then((data) => {

                    // Place data in HTML
                    let weather = data.currently.icon
                    document.getElementById('img').src = weather

                    document.getElementById('condition').innerHTML = data.current.condition.text

                    let temp = Math.round(data.current.temp_c);
                    document.getElementById('temp').innerHTML = temp + '&deg'

                    let city = data.location.name
                    document.getElementById('city').innerHTML = city

                    // 5 days forecast
                    fetch(`https://api.apixu.com/v1/forecast.json?key=${AppID}&q=$lat=${lat}$lon=${lon}&days=5`)
                        .then(res => res.json())
                        .then(data => {

                    // Place data in HTML

                            let output = ''
                            data.forecast.forecastday.forEach(day => {

                                output += `<div class="day">
                                        <div class="date">${day.date}</div>
                                        <div class="max">${Math.round(day.day.maxtemp_c)}&deg</div>
                                        <img class="icon" src="${day.day.condition.icon}">
                                        <div class="description">${day.day.condition.text}</div>
                                        <div class="min">${Math.round(day.day.mintemp_c)}&deg</div>
                                    </div>`
                            });
                            document.getElementById('days').innerHTML = output;
                        })


                })
        });
    }
}