window.onload = () => {

    if (navigator.geolocation.getCurrentPosition) {

        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            AppID = '2aecabece53e4e30848222050180507';

            // Fetch data from API
            fetch(`https://api.apixu.com/v1/current.json?key=${AppID}&q=${lat},${lon}`)

                .then(res => res.json())
                .then((data) => {

                    // Place data in HTML
                    let weather = data.current.condition.icon
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